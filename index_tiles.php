<html>
<head>
	<meta charset="utf-8">
    <link rel="stylesheet" href="css/leaflet.css" />
	<link rel="stylesheet" href="css/map.css" /> 
	<!--<script src="map_json\al_basrah\gpm_cq_64.json" type="text/javascript"></script>-->
	<link rel="points" type="application/json" href="map_json/albasrah/gpm_insurgency_64.json">
	<script src="js/loadxmldoc.js"></script>
    <script src="js/leaflet-src.js"></script>
	<script src="js/jquery-2.1.0.js"></script>
	
	<!-- 
	Uncomment for production
    <script src="js/leaflet.js"></script>
	<script src="js/jquery-2.1.0.min.js"></script>
	-->
	
		<style>
		#output {
			position: absolute;
			background: none;
			z-index: 10000;
			font-size: 1em;
			font-family: Arial;
			color: #FFFFFF;
			text-shadow:  1px  1px 1px black,
                  1px -1px 1px black,
                 -1px  1px 1px black,
                 -1px -1px 1px black;
		}
	</style>
</head>

<body>
    <!--<script src="http://cdn.leafletjs.com/leaflet-0.6.4/leaflet.js"></script>-->
    <div id="map"></div>
	<div id='output'>
	</div>
	<ul class="mappreviews" style="position:absolute; top:0px; left:0px; width:100%">
	  <li onclick="loadMap('albasrah');"><img src="map_source\albasrah_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Al Basrah</div></li>
	  <li onclick="loadMap('asad_khal');"><img src="map_source\asad_khal_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Asad Khal</div></li>
	  <li onclick="loadMap('assault_on_mestia');"><img src="map_source\assault_on_mestia_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Assault on Mestia</div></li>
	  <li onclick="loadMap('battle_of_ia_drang');"><img src="map_source\battle_of_ia_drang_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Battle of Ia Drang</div></li>
	  <li onclick="loadMap('beirut');"><img src="map_source\beirut_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Beirut</div></li>
	  <li onclick="loadMap('bijar_canyons');"><img src="map_source\bijar_canyons_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Bijar Canyons</div></li>
	  <li onclick="loadMap(map, 'black_gold');"><img src="map_source\black_gold_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Black Gold</div></li>
	  <li onclick="loadMap(map, 'burning_sands');"><img src="map_source\burning_sands_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Burning Sands</div></li>
	  <li onclick="loadMap(map, 'charlies_point');"><img src="map_source\charlies_point_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Charlie's Point</div></li>
	  
	  <li onclick="loadMap(map, 'dovre');"><img src="map_source\dovre_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Dovre</div></li>
	  <li onclick="loadMap(map, 'dovre_winter');"><img src="map_source\dovre_winter_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Dovre (Winter)</div></li>
	  <li onclick="loadMap(map, 'dragon_fly');"><img src="map_source\dragon_fly_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Dragon Fly</div></li>
	  <li onclick="loadMap(map, 'fallujah_west');"><img src="map_source\fallujah_west_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Fallujah West</div></li>
	  <li onclick="loadMap(map, 'fools_road');"><img src="map_source\fools_road_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Fool's Road</div></li>
	  <li onclick="loadMap(map, 'gaza');"><img src="map_source\gaza_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Gaza</div></li>
	  <li onclick="loadMap(map, 'hades_peak');"><img src="map_source\hades_peak_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Hades Peak</div></li>
	  <li onclick="loadMap(map, 'hill_488');"><img src="map_source\hill_488_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Hill 488</div></li>
	  <li onclick="loadMap(map, 'iron_ridge');"><img src="map_source\iron_ridge_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Iron Ridge</div></li>
	  	  
	  <li onclick="loadMap(map, 'jabal');"><img src="map_source\jabal_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Jabal al Burj</div></li>
	  <li onclick="loadMap(map, 'karbala');"><img src="map_source\karbala_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Karbala</div></li>
	  <li onclick="loadMap(map, 'kashan_desert');"><img src="map_source\kashan_desert_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Kashan Desert</div></li>
	  <li onclick="loadMap(map, 'khamisiyah');"><img src="map_source\khamisiyah_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Khamisiyah</div></li>
	  <li onclick="loadMap(map, 'kokan');"><img src="map_source\kokan_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Kokan</div></li>
	  <li onclick="loadMap(map, 'korengal');"><img src="map_source\korengal_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Korengal</div></li>
	  <li onclick="loadMap(map, 'kozelsk');"><img src="map_source\kozelsk_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Kozelsk</div></li>
	  <li onclick="loadMap(map, 'lashkar_valley');"><img src="map_source\lashkar_valley_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Lashkar Valley</div></li>
	  <li onclick="loadMap(map, 'muttrah_city_2');"><img src="map_source\muttrah_city_2_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Muttrah City</div></li>
	  	  <li onclick="loadMap(map, 'nuijamaa');"><img src="map_source\nuijamaa_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Nuijamaa</div></li>
	  
	  <li onclick="loadMap(map, 'op_barracuda');"><img src="map_source\op_barracuda_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Operation Barracuda</div></li>
	  <li onclick="loadMap(map, 'operation_archer');"><img src="map_source\operation_archer_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Operation Archer</div></li>
	  <li onclick="loadMap(map, 'operation_ghost_train');"><img src="map_source\operation_ghost_train_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Operation Ghost Train</div></li>
	  <li onclick="loadMap(map, 'operation_marlin');"><img src="map_source\operation_marlin_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Operation Marlin</div></li>
	  <li onclick="loadMap(map, 'pavlovsk_bay');"><img src="map_source\pavlovsk_bay_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Pavlosk Bay</div></li>
	  <li onclick="loadMap(map, 'qwai1');"><img src="map_source\qwai1_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Qwai River</div></li>
	  <li onclick="loadMap(map, 'ramiel');"><img src="map_source\ramiel_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Ramiel</div></li>
	  <li onclick="loadMap(map, 'saaremaa');"><img src="map_source\saaremaa_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Saaremaa</div></li>
	  
	  <li onclick="loadMap(map, 'sbeneh_outskirts');"><img src="map_source\sbeneh_outskirts_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Sbeneh Outskirts</div></li>
	  <li onclick="loadMap(map, 'shijiavalley');"><img src="map_source\shijiavalley_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Shijia Valley</div></li>
	  <li onclick="loadMap(map, 'silent_eagle');"><img src="map_source\silent_eagle_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Silent Eagle</div></li>
	  <li onclick="loadMap(map, 'tad_sae');"><img src="map_source\tad_sae_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Tad Sae</div></li>
	  <li onclick="loadMap(map, 'vadso_city');"><img src="map_source\vadso_city_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Vadso City</div></li>
	  <li onclick="loadMap(map, 'wanda_shan');"><img src="map_source\wanda_shan_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Wanda Shan</div></li>
	  
	  <li onclick="loadMap(map, 'xiangshan');"><img src="map_source\xiangshan_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Xiangshan</div></li>
	  <li onclick="loadMap(map, 'yamalia');"><img src="map_source\yamalia_minimap.jpg" width="150" height="150"/>
      <div class="mappreview_header">Yamalia</div></li>
	</ul>

	<script>
	
	
	var click = document.getElementById('click')
    var mousemove = document.getElementById('output');
	var mapwidth = 4096;
	var mapheight = 4096;

	var map = L.map('map', {
		crs: L.CRS.Simple
		}).setView([0, 0], 2);
	
	var layercontrol = L.control.layers({}, {}).addTo(map);
	var GMcontrol = L.control.layers({}, {}).addTo(map);
	var mapLayerGroup = new L.LayerGroup().addTo(map);
	var GMLayerGroup = new L.LayerGroup().addTo(map);
	var gmlayers = [];
	var gmnames = [];
	
	//map.on('click', function(e) { alert("Lat, Lon : " + map.project(e.latlng, 7) )});
	//map.on('dblclick', addMarker);
	
	
	var ArmaIcon = L.divIcon({
						iconSize: new L.Point(16,16),
						className: 'icon-heli',
						html: '<div id="icon-heli" style="color:red; font-size:16px"><img src="icons/vehicles_map/mini_harrier.png"/></div>'
	});
	
	function addMarker(e){
		// Add marker to map at click location; add popup window
		var marker = new L.marker(e.latlng, {draggable:true});
		marker.setIcon(ArmaIcon);
		marker.on('click', function(event){
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
		var s = num+"";
			while (s.length < size) s = "0" + s;
			return s;
	}
	map.on('mousemove', function(e) {
		var ew = window.event;
		var x = ew.clientX;
		var y = ew.clientY;
		//alert(x + " " + y);
		var point = map.project(e.latlng,2);
		if (point.x < 0 || point.y < 0 || point.x > mapwidth/4 || point.y > mapheight/4){
			window[e.type].innerHTML = "";
		}else {
			var colno = Math.ceil(point.x/ (mapwidth/4 / 41));  //41 because 41 columns in PR grid
			var rowno = Math.ceil(point.y/ (mapheight/4 / 41));
				var str_coord = "";
				switch (colno) {
					case 1:
						str_coord = "Z"
						break;
					case 2:
					case 3:
					case 4:
						str_coord = "A"
						break;
					case 5:
					case 6:
					case 7:
						str_coord = "B"
						break;
					case 8:
					case 9:
					case 10:
						str_coord = "C"
						break;
					case 11:
					case 12:
					case 13:
						str_coord = "D"
						break;
					case 14:
					case 15:
					case 16:
						str_coord = "E"
						break;
					case 17:
					case 18:
					case 19:
						str_coord = "F"
						break;
					case 20:
					case 21:
					case 22:
						str_coord = "G"
						break;
					case 23:
					case 24:
					case 25:
						str_coord = "H"
						break;
					case 26:
					case 27:
					case 28:
						str_coord = "I"
						break;
					case 29:
					case 30:
					case 31:
						str_coord = "J"
						break;
					case 32:
					case 33:
					case 34:
						str_coord = "K"
						break;
					case 35:
					case 36:
					case 37:
						str_coord = "L"
						break;
					case 38:
					case 39:
					case 40:
						str_coord = "M"
						break;
					case 41:
						str_coord = "N"
						break;
					default:
						str_coord = ""
				};
				str_coord += intpad(Math.floor((rowno + 1) / 3),2);
				
				if ((colno+1 ) % 3 == 0 && (rowno+1 )  % 3 == 2) {
					str_coord += "kp1";
				} else if ((colno+1 ) % 3 == 1 && (rowno+1 )  % 3 == 2) {
					str_coord += "kp2";
				} else if ((colno+1 ) % 3 == 2 && (rowno+1 )  % 3 == 2) {
					str_coord += "kp3";
				} else if ((colno+1 ) % 3 == 0 && (rowno+1 )  % 3 == 1) {
					str_coord += "kp4";
				} else if ((colno+1 ) % 3 == 1 && (rowno+1 )  % 3 == 1) {
					str_coord += "kp5";
				} else if ((colno+1 ) % 3 == 2 && (rowno+1 )  % 3 == 1) {
					str_coord += "kp6";
				}  else if ((colno+1 ) % 3 == 0  && (rowno+1 )  % 3 == 0) {
					str_coord += "kp7";
				} else if ((colno+1 ) % 3 == 1 && (rowno+1 )  % 3 == 0) {
					str_coord += "kp8";
				} else if ((colno+1 ) % 3 == 2 && (rowno+1 )  % 3 == 0) {
					str_coord += "kp9";
				}
				
				window[e.type].innerHTML = str_coord;
			}
		document.getElementById('output').style.top = (y - 20) + 'px' ;
		document.getElementById('output').style.left = ( x + 20 ) + 'px';
	});
	

	function resetRotation(){
		
		$('.rotated').each(function () {
			var deg = $(this).data('rotate') || 0;
			var rotate = 'rotate(' + $(this).data('rotate') + 'deg)';
			$(this).css({
				'-webkit-transform': rotate,
				'-moz-transform': rotate,
				'-o-transform': rotate,
				'-ms-transform': rotate,
				'transform': rotate
			});
		});
	}
	
	map.on("zoomend", function (e) {
		/*
		var pixelbounds = map.getBounds();
		var sw = map.project(pixelbounds.getSouthWest(), 4);
		var ne = map.project(pixelbounds.getNorthEast(), 4);
		var mindata = [sw.x, ne.y]
		var maxdata = [sw.y, ne.x]
		//console.log(mindata);
		//console.log(maxdata);
		if (mindata[0] < - (mapwidth /2) && mindata[1] < - mapheight / 2) {
			if (maxdata[0] > (mapwidth + mapwidth / 2) && maxdata[1] > (mapheight + mapheight / 2) ) {
				map.zoomIn(1);
			}
		}*/
	});
	map.on("dragend", function (e) {
	});
	
	map.on('drag', function() {
	});
	
	function loadMap(mapname) {
			xmlDoc=loadXMLDoc('tiles/' + mapname + '/tilemapresource.xml');

			x=xmlDoc.getElementsByTagName('BoundingBox');
			
			
			var factorx = Math.abs(parseInt(x[0].getAttribute('minx'))) / 4096;
			var factory = Math.abs(parseInt(x[0].getAttribute('maxy'))) / 4096;
			mapwidth =Math.abs(parseInt(x[0].getAttribute('minx'))) / factorx ;
			mapheight =Math.abs(parseInt(x[0].getAttribute('maxy'))) / factory;
		
			var sw = map.unproject([0, mapheight], 4);
			var ne = map.unproject([mapwidth, 0], 4);
			var bounds = new L.LatLngBounds(sw, ne);
			//var mapimage = L.imageOverlay('map_source/' + mapname + "_minimap.jpg", bounds, {
			//	attribution: 'Project Reality / WGP'
			//});
			var mapimage = 	L.tileLayer('tiles/' + mapname + '/{z}/{x}/{y}.jpg', {
				minZoom: 0,
				maxZoom: 5,
				bounds: bounds,
				noWrap:true,
				attribution: 'Project Reality / WGP'
			});

			for (i=0;i< gmlayers.length; i++) {
				map.removeLayer(gmlayers[i]);
				GMcontrol.removeLayer(gmlayers[i]);
			}
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
				console.log(list_gm);
				
				
				for (i = 0; i < list_gm.length; i++) {
					var modename = "";
					if (list_gm[i].search("gpm_insurgency") != -1){
						modename = "Insurgency";
					}
					if (list_gm[i].search("gpm_coop") != -1){
						modename = "Coop";
					}
					if (list_gm[i].search("gpm_skirmish") != -1){
						modename = "Skirmish";
					}
					if (list_gm[i].search("16") != -1){
						modename += " Infantry";
					}
					if (list_gm[i].search("32") != -1){
						modename += " Alternative";
					}
					if (list_gm[i].search("64") != -1){
						modename += " Standard";
					}
					if (list_gm[i].search("128") != -1){
						modename += " Large";
					}
					
					
					
					
					gmnames.push(modename);
			//$.getJSON($('link[rel="points"]').attr("href"), function(data) {
					$.getJSON(list_gm[i], doSomething(i));
			}
			map.addLayer(GMLayerGroup);
	
		  }).fail( function(d, textStatus, error) {
				console.error("getJSON failed, status: " + textStatus + ", error: "+error)
			});
			resetRotation();
		};
		
		var doSomething = function(extraStuff) {
			return function(data, textStatus, jqXHR) {
					var gamemode = L.geoJson(data, {
						style: function (feature) {
							return feature.properties && feature.properties.style;
						},

						pointToLayer: function (feature, latlng) {
							var iconurl =  feature.properties.iconurl.toLowerCase();
							if (iconurl == '') {
								iconurl = "icons/flags_map/minimap_uncappable.png";
							}
							var newmarker = L.marker(latlng, {
								icon: L.divIcon({
									iconSize: new L.Point(20,20),
									className: 'icon',
									html: '<img style="width:100%" class="rotated" src=' + iconurl + ' data-rotate="' + feature.properties.iconrotate + '">'
								})
							});
							
							var popupContent = "<p>I started out as a GeoJSON " +
									feature.geometry.type + ", but now I'm a Leaflet vector!</p>";

							if (feature.properties && feature.properties.popupContent) {
								popupContent += feature.properties.popupContent;
							}

							newmarker.bindPopup(popupContent);
							
							return newmarker;
						}
					});
					gmlayers.push(gamemode);
					GMcontrol.addBaseLayer(gamemode, gmnames[extraStuff]);
				}
			};

		map.on('baselayerchange', resetRotation);
    </script>
</body>
</html>