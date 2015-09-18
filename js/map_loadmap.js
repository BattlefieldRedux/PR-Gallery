function loadMap(mapname) {
	xmlDoc = loadXMLDoc('tiles/' + mapname + '/tilemapresource.xml');

	x = xmlDoc.getElementsByTagName('BoundingBox');

	var factorx = Math.abs(parseInt(x[0].getAttribute('minx'))) / 4096;
	var factory = Math.abs(parseInt(x[0].getAttribute('maxy'))) / 4096;
	mapwidth = Math.abs(parseInt(x[0].getAttribute('minx'))) / factorx;
	mapheight = Math.abs(parseInt(x[0].getAttribute('maxy'))) / factory;

	var sw = map.unproject([0, mapheight], 4);
	var ne = map.unproject([mapwidth, 0], 4);
	var bounds = new L.LatLngBounds(sw, ne);
	var mapimage = L.tileLayer('tiles/' + mapname + '/{z}/{x}/{y}.jpg', {
		minZoom : 0,
		maxZoom : 5,
		bounds : bounds,
		noWrap : true,
		attribution : 'Project Reality / WGP'
	});

	for ( i = 0; i < gmlayers.length; i++) {
		map.removeLayer(gmlayers[i]);
		GMcontrol.removeLayer(gmlayers[i]);
	}

	layer_grid_group.addLayer(L.simpleGraticule({
		interval : 6.2439024390243902439024390243902,
		offset : 6.2439024390243902439024390243902,
		showOriginLabel : false,
		showLabels : false,
		redraw : 'move',
		clickable : false,
		className : "simple-grid-line",
		lineStyle : {
			stroke : true,
			color : '#000',
			opacity : 1,
			weight : 0.2,
			clickable : false,
			className : "simple-grid-line"
		}
	}));
	layer_grid_group.addLayer(L.simpleGraticule({
		interval : 6.2439024390243902439024390243902 * 3,
		offset : 6.2439024390243902439024390243902,
		showOriginLabel : false,
		showLabels : false,
		redraw : 'move',
		lineStyle : {
			stroke : true,
			color : '#000',
			opacity : 1,
			weight : 1,
			clickable : false,
			className : "simple-grid-line",
			fillColor : '#fff',
			fill : true
		}
	}));
	layercontrol.addOverlay(layer_grid_group, "Grid Overlay");
	gmlayers = [];
	gmnames = [];
	GMLayerGroup.clearLayers();
	mapLayerGroup.clearLayers();
	mapLayerGroup.addLayer(mapimage);
	layercontrol.addBaseLayer(mapLayerGroup, "Satellite");
	map.setMaxBounds(bounds);
	map.addLayer(mapLayerGroup);

	$.getJSON("map_json/" + mapname + "/listgm.json", function(d) {
		var list_gm = d;

		for ( i = 0; i < list_gm.length; i++) {
			var modename = "";
			if (list_gm[i].search("gpm_insurgency") != -1) {
				modename = "Insurgency";
			}
			if (list_gm[i].search("gpm_coop") != -1) {
				modename = "Coop";
			}
			if (list_gm[i].search("gpm_cq") != -1) {
				modename = "Assault and Secure";
			}
			if (list_gm[i].search("gpm_vehicles") != -1) {
				modename = "Vehicle Warfare";
			}
			if (list_gm[i].search("gpm_cnc") != -1) {
				modename = "Command and Control";
			}
			if (list_gm[i].search("gpm_skirmish") != -1) {
				modename = "Skirmish";
			}
			if (list_gm[i].search("16") != -1) {
				modename += " Infantry";
			}
			if (list_gm[i].search("32") != -1) {
				modename += " Alternative";
			}
			if (list_gm[i].search("64") != -1) {
				modename += " Standard";
			}
			if (list_gm[i].search("128") != -1) {
				modename += " Large";
			}
			gmnames.push(modename);
			$.getJSON(list_gm[i], doSomething(i, [mapname, list_gm[i]])).fail(function(d, textStatus, error) {
				console.error("getJSON failed, status: " + textStatus + ", error: " + error);
			});
			;
		}
		map.addLayer(GMLayerGroup);

	}).fail(function(d, textStatus, error) {
		console.error(d);
		console.error("getJSON failed, status: " + textStatus + ", error: " + error);
	});
	resetRotation();
};

var doSomething = function(extraStuff, extradata) {
	return function(data, textStatus, jqXHR) {
		var gmarray = [];
		gmarray.mapname = extradata[0];
		gmarray.gm = extradata[1];
		//GMASSETS.push("{ map: " + extradata[0] + ", gm: " + extradata[1] + ", ") ;
		var gamemode = L.geoJson(data, {
			style : function(feature) {
				return feature.properties && feature.properties.style;
			},
			pointToLayer : function(feature, latlng) {
				var iconurl = feature.properties.iconurl;
				if (iconurl == '' || iconurl == 'null') {
					console.error("WARNING: BF2Object has no icon: " + feature.bf2props.name_object + ". Consider adding an exception.");
					iconurl = "icons/flags_map/minimap_uncappable.png";
				}
				var newmarker = L.marker(latlng, {
					icon : L.divIcon({
						iconSize : new L.Point(20, 20),
						className : 'icon',
						html : '<img style="width:100%" class="rotated" src=' + iconurl + ' data-rotate="' + feature.properties.iconrotate + '">'
					})
				});
				var popupContent = "";
				gmarray.push(feature);
				if (feature.properties) {
					var minspawn = parseInt(feature.bf2props.minspawn);
					var maxspawn = parseInt(feature.bf2props.maxspawn);

					popupContent += "<table><tr><td colspan='2'>" + feature.bf2props.name_object + "</td></tr>";
					if (minspawn < 0 || maxspawn < 0 || minspawn > 9999 || maxspawn > 9999 || (minspawn == 0 && maxspawn == 0)) {
						popupContent += "<tr><td>Respawn Time:</td><td> Never</td></tr>";
					} else {
						if (minspawn == minspawn) {
							popupContent += "<tr><td>Respawn Time:</td><td> " + minspawn + " s" + "</td></tr>";
						} else {
							popupContent += "<tr><td>Respawn Time:</td><td> " + minspawn + " to " + maxspawn + " s" + "</td></tr>";
						}
					}
					if (feature.bf2props.spawndelay == "true") {
						popupContent += "<tr><td>SpawnDelay:</td><td> Yes" + "</td></tr>";
					} else {
						popupContent += "<tr><td>SpawnDelay:</td><td> No" + "</td></tr>";
					}
					popupContent += "<tr><td>Team:</td><td>" + feature.bf2props.team + "</td></tr>";

					popupContent += "</table>";
				}

				newmarker.bindPopup(popupContent);
				newmarker.on('mouseover', function(e) {
					// document.getElementById('RightPane').innerHTML = this.getPopup().getContent();
				});

				return newmarker;
			},
			onEachFeature : function(feature, layer) {
			}
		});
		GMASSETS.push(gmarray);
		gmlayers.push(gamemode);
		GMcontrol.addBaseLayer(gamemode, gmnames[extraStuff]);

	};
};
