function addMarker(e) {
	// Add marker to map at click location; add popup window
	var marker = new L.marker(e.latlng, {
		draggable : true
	});
	marker.setIcon(ArmaIcon);
	marker.on('click', function(event) {
		var marker = event.target;
		var position = marker.getLatLng();
		$(this).hide();
		//alert("Test");
		//<div class="form"><input class="form" type="text" value="" name="myinput" id="myinput"/></div>;
		$('.aicon .form').show();

	});
	marker.addTo(markerlayer);
}

function intpad(num, size) {
	var s = num + "";
	while (s.length < size)
	s = "0" + s;
	return s;
}

function resetRotation() {

	$('.rotated').each(function() {
		var deg = $(this).data('rotate') || 0;
		var rotate = 'rotate(' + $(this).data('rotate') + 'deg)';
		$(this).css({
			'-webkit-transform' : rotate,
			'-moz-transform' : rotate,
			'-o-transform' : rotate,
			'-ms-transform' : rotate,
			'transform' : rotate
		});
	});
}


$(window).ready(function(exx) {

	map.on('overlayadd', function(e) {
		var curlayers = e.layer.getLayers();
		for ( i = 0; i < curlayers.length; i++) {

		}
	});

	map.on('mouseout', function(e) {
		var ew = window.event;
		document.getElementById('output').innerHTML = "";
	});

	map.on('baselayerchange', function(e) {
		var modename = "";
		if (e.name.search("Insurgency") != -1) {
			modename = "gpm_insurgency_";
		}
		if (e.name.search("Coop") != -1) {
			modename = "gpm_coop_";
		}
		if (e.name.search("Assault and Secure") != -1) {
			modename = "gpm_cq_";
		}
		if (e.name.search("Vehicle Warfare") != -1) {
			modename = "gpm_vehicles_";
		}
		if (e.name.search("Command and Control") != -1) {
			modename = "gpm_cnc_";
		}
		if (e.name.search("Skirmish") != -1) {
			modename = "gpm_skirmish_";
		}
		if (e.name.search("Infantry") != -1) {
			modename += "16";
		}
		if (e.name.search("Alternative") != -1) {
			modename += "32";
		}
		if (e.name.search("Standard") != -1) {
			modename += "64";
		}
		if (e.name.search("Large") != -1) {
			modename += "128";
		}
		$('#SubTitle').html(e.name);
		var sorted_assets = [];
		flag_layer.clearLayers();
		flag_radius_layer.clearLayers();
		for ( i = 0; i < routelayers.length; i++) {
			map.removeLayer(routelayers[i]);
			routecontrol.removeLayer(routelayers[i]);
		}
		routes_layer.clearLayers();
		$(".leaflet-control-layers.routes-button").removeClass("hide");

		for ( i = 0; i < GMASSETS.length; i++) {
			if (GMASSETS[i].gm.search(modename) != -1) {
				var gmarray = GMASSETS[i];
				$('#MiddleHeader').find(".team1").html('');
				$('#MiddleHeader').find(".team2").html('');
				var team1flag = getFlagURL(gmarray.team1name);
				var team2flag = getFlagURL(gmarray.team2name);
				$('#MiddleHeader').find(".team1").append("<img src='" + team1flag + "' />");
				if (gmarray.team1tickets)
					$('#MiddleHeader').find(".team1").append(" " + gmarray.team1tickets);
				$('#MiddleHeader').find(".team2").append("<img src='" + team2flag + "' />");
				if (gmarray.team2tickets)
					$('#MiddleHeader').find(".team2").append(" " + gmarray.team2tickets);
				$('#MiddleHeader').removeClass('hide');

				for ( j = 0; j < gmarray.objects.length; j++) {// Get and count same objects
					var object = gmarray.objects[j];
					var objexists = false;
					for ( k = 0; k < sorted_assets.length; k++) {
						if (sorted_assets[k].bf2props.name_object == object.bf2props.name_object && sorted_assets[k].bf2props.team == object.bf2props.team) {
							sorted_assets[k].count += 1;
							objexists = true;
							break;
						}
					}
					if (!objexists) {
						object.count = 1;
						sorted_assets.push(object);
					}
				}
				for ( j = 0; j < gmarray.flags.length; j++) {// Handle flags
					var flag = gmarray.flags[j];
					flag.addTo(flag_layer);
				}
				for ( j = 0; j < gmarray.flagradius.length; j++) {// Handle flag radius
					var flag = gmarray.flagradius[j];
					flag.addTo(flag_radius_layer);
				}

				for ( i = 0; i < gmarray.routes.length; i++) {
					var curroute = gmarray.routes[i];
					var curroutelayer = L.featureGroup();
					for ( j = 0; j < curroute.length; j++) {
						var curstep = curroute[j];
						var curflags = [];
						for ( k = 0; k < curstep.length; k++) {
							var curflagname = curstep[k];
							for ( l = 0; l < gmarray.flags.length; l++) {
								if (curflagname == gmarray.flags[l].data.code) {
									curflags.push(gmarray.flags[l]);
									break;
								}
							}
						}
						var curlatlng_avg = L.latLng(0, 0);
						for ( k = 0; k < curflags.length; k++) {
							curlatlng_avg.lat += curflags[k].getLatLng().lat;
							curlatlng_avg.lng += curflags[k].getLatLng().lng;
						}
						curlatlng_avg.lat = curlatlng_avg.lat / curflags.length;
						curlatlng_avg.lng = curlatlng_avg.lng / curflags.length;

						// Average all flags in the same step (random flags). Marked by dashed lines. Connecting to next/previous steps by a virtual average LatLng
						if (curflags.length > 1) {
							var curconnector = L.polyline([curflags[0].getLatLng(), curlatlng_avg], {
								clickable : false,
								pointerEvents : 'none',
								color : '#ffffff',
								dashArray : "20,10",
								opacity : 0.6
							});
							for ( k = 1; k < curflags.length; k++) {
								var curlatlng = curconnector.getLatLngs();
								var newlatlng = [];
								newlatlng.push([curlatlng]);
								newlatlng.push([curflags[k].getLatLng(), curlatlng_avg]);
								curconnector.setLatLngs(newlatlng);
							}
							curconnector.data = {
								type : 'curconnector',
								route : i,
								link : curstep
							};
							curconnector.addTo(curroutelayer);

						}

						if (j < curroute.length - 1) {
							var nextstep = curroute[j + 1];
							var nextflags = [];
							for ( k = 0; k < nextstep.length; k++) {
								var nextflagname = nextstep[k];
								for ( l = 0; l < gmarray.flags.length; l++) {
									if (nextflagname == gmarray.flags[l].data.code) {
										nextflags.push(gmarray.flags[l]);
										break;
									}
								}
							}

							var nextlatlng_avg = L.latLng(0, 0);
							for ( k = 0; k < nextflags.length; k++) {
								nextlatlng_avg.lat += nextflags[k].getLatLng().lat;
								nextlatlng_avg.lng += nextflags[k].getLatLng().lng;
							}
							nextlatlng_avg.lat = nextlatlng_avg.lat / nextflags.length;
							nextlatlng_avg.lng = nextlatlng_avg.lng / nextflags.length;

							// Connection between current and next step. Always a solid line.
							var curnextconnector = L.polyline([curlatlng_avg, nextlatlng_avg], {
								clickable : false,
								pointerEvents : 'none',
								color : '#ffffff',
								opacity : 0.8
							});
							curnextconnector.data = {
								type : 'curnextconnector',
								route : i,
								link : [curstep, nextstep]

							};
							curnextconnector.addTo(curroutelayer);
						}
					}

					routelayers.push(curroutelayer);
					curroutelayer.addTo(map);
					routecontrol.addOverlay(curroutelayer, "Route " + (i + 1));

				}
				break;
			}
		}

		function compare(a, b) {
			if (a.bf2props.team < b.bf2props.team)
				return -1;
			if (a.bf2props.team > b.bf2props.team)
				return 1;
			return 0;
		}


		sorted_assets.sort(compare);
		document.getElementById('RPane-content').innerHTML = "";

		for ( i = 0; i < sorted_assets.length; i++) {
			var stringadd = "";
			var feature = sorted_assets[i];
			var minspawn = parseInt(feature.bf2props.minspawn);
			var maxspawn = parseInt(feature.bf2props.maxspawn);
			var spawntime = 0;
			stringadd += "<div class='asset-row team" + feature.bf2props.team + "'>";
			stringadd += '<img src=' + feature.properties.iconurl + '>';
			stringadd += "<div class='asset-qt'>" + feature.count + "x</div>";
			stringadd += "<div class='asset-name'>" + feature.bf2props.name_object + "</div>";
			stringadd += "<div class='asset-delay'>Respawn Time: ";

			if (minspawn < 0 || maxspawn < 0 || minspawn > 9999 || maxspawn > 9999) {
				stringadd += "Never</div>";
			} else {
				if (minspawn == minspawn) {
					stringadd += minspawn + " s</div>";
				} else {
					stringadd += minspawn + " to " + maxspawn + " s</div>";
				}
			}
			stringadd += "</div>";
			document.getElementById('RPane-content').innerHTML += stringadd;
		};
	});

	map.on('mousemove', function(e) {
		var ew = window.event;
		var x = ew.clientX;
		var y = ew.clientY;
		//alert(x + " " + y);
		var point = map.project(e.latlng, 2);
		if (point.x < 0 || point.y < 0 || point.x > mapwidth / 4 || point.y > mapheight / 4) {
			document.getElementById('output').innerHTML = "";
		} else {
			var colno = Math.floor(point.x / (mapwidth / 4 / 41)) + 1;
			//41 because 41 columns in PR grid
			var rowno = Math.ceil(point.y / (mapheight / 4 / 41));
			var str_coord = "";
			switch (colno) {
			case 1:
				str_coord = "Z";
				break;
			case 2:
			case 3:
			case 4:
				str_coord = "A";
				break;
			case 5:
			case 6:
			case 7:
				str_coord = "B";
				break;
			case 8:
			case 9:
			case 10:
				str_coord = "C";
				break;
			case 11:
			case 12:
			case 13:
				str_coord = "D";
				break;
			case 14:
			case 15:
			case 16:
				str_coord = "E";
				break;
			case 17:
			case 18:
			case 19:
				str_coord = "F";
				break;
			case 20:
			case 21:
			case 22:
				str_coord = "G";
				break;
			case 23:
			case 24:
			case 25:
				str_coord = "H";
				break;
			case 26:
			case 27:
			case 28:
				str_coord = "I";
				break;
			case 29:
			case 30:
			case 31:
				str_coord = "J";
				break;
			case 32:
			case 33:
			case 34:
				str_coord = "K";
				break;
			case 35:
			case 36:
			case 37:
				str_coord = "L";
				break;
			case 38:
			case 39:
			case 40:
				str_coord = "M";
				break;
			case 41:
				str_coord = "N";
				break;
			default:
				str_coord = "";
			};
			str_coord += intpad(Math.floor((rowno + 1) / 3), 2);

			if ((colno + 1 ) % 3 == 0 && (rowno + 1 ) % 3 == 2) {
				str_coord += "kp1";
			} else if ((colno + 1 ) % 3 == 1 && (rowno + 1 ) % 3 == 2) {
				str_coord += "kp2";
			} else if ((colno + 1 ) % 3 == 2 && (rowno + 1 ) % 3 == 2) {
				str_coord += "kp3";
			} else if ((colno + 1 ) % 3 == 0 && (rowno + 1 ) % 3 == 1) {
				str_coord += "kp4";
			} else if ((colno + 1 ) % 3 == 1 && (rowno + 1 ) % 3 == 1) {
				str_coord += "kp5";
			} else if ((colno + 1 ) % 3 == 2 && (rowno + 1 ) % 3 == 1) {
				str_coord += "kp6";
			} else if ((colno + 1 ) % 3 == 0 && (rowno + 1 ) % 3 == 0) {
				str_coord += "kp7";
			} else if ((colno + 1 ) % 3 == 1 && (rowno + 1 ) % 3 == 0) {
				str_coord += "kp8";
			} else if ((colno + 1 ) % 3 == 2 && (rowno + 1 ) % 3 == 0) {
				str_coord += "kp9";
			}
			//console.log(e.latlng);
			//console.log(map.project(e.latlng, map.getMaxZoom()));
			//str_coord += map.project(e.latlng, map.getMaxZoom());
			//str_coord += e.latlng;
			document.getElementById('output').innerHTML = str_coord;
		}
		document.getElementById('output').style.top = (y - 20) + 'px';
		document.getElementById('output').style.left = (x + 20 ) + 'px';
	});
});
