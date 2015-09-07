<!DOCTYPE html>
<html>
	<head lang="en">
		<meta charset="utf-8">
		<link rel="stylesheet" href="css/leaflet.css" />
		<link rel="stylesheet" href="css/animations.css">
		<link rel="stylesheet" href="css/main_style.css">
		<link rel="stylesheet" href="css/gallery_style.css">
		<link rel="stylesheet" href="css/map.css" />
		<link rel="stylesheet" href="css/L.SimpleGraticule.css" />

		<script src="js/loadxmldoc.js"></script>
		<script src="js/leaflet-src.js"></script>
		<script src="js/jquery-2.1.0.js"></script>
		<script src="js/common.js"></script>
		<script src="js/gallery.js"></script>
		<script src="js/map_events.js"></script>
		<script src="js/map_loadmap.js"></script>
		<script src="js/L.SimpleGraticule.js"></script>

		<!--
		Uncomment for production
		<script src="js/leaflet.js"></script>
		<script src="js/jquery-2.1.0.min.js"></script>
		-->

		<title>Project Reality Map Gallery</title>
	</head>

	<body>
		<div id="Header">
			<div class="buttons">
				<div id="Menu-button">
					<div id="Menu-button-layer-wrapper">
						<span class="menu-button-layer"></span>
						<span class="menu-button-layer"></span>
						<span class="menu-button-layer"></span>
					</div>
				</div>
				<div id="Map-button"><img src="js\images\layers.png">
				</div>
			</div>
			<div id="Title-Wrapper">
				<div id="Title">
					Project Reality
				</div>
				<div id="SubTitle"></div>
			</div>
			<div id="Search">
				<img src="img\resources\ic_search.png">
				<input type="text" placeholder="Search">
			</div>
		</div>

		<div id="Body-Wrapper">
			<div id="Nav">
				<ul>
					<a href="http://www.realitymod.com/forum/">
					<li>
						Forum
					</li></a>
					<a href="http://tournament.realitymod.com/forum/">
					<li>
						Tournament
					</li></a>
					<a href="http://www.realitymod.com/prspy/">
					<li>
						PRSPY
					</li></a>
				</ul>
			</div>

			<div id="Container-Wrapper">
				<div id="map" class="hide"></div>
				<div id="Container"></div>
			</div>
		</div>

		<div id='output'></div>

		<script>
			var click = document.getElementById('click')
			var mousemove = document.getElementById('output');
			var mapwidth = 4096;
			var mapheight = 4096;

			var map = L.map('map', {
				crs : L.CRS.Simple
			}).setView([0, 0], 2);

			var layercontrol = L.control.layers({}, {}).addTo(map);
			var GMcontrol = L.control.layers({}, {}).addTo(map);
			var mapLayerGroup = new L.LayerGroup().addTo(map);
			var GMLayerGroup = new L.LayerGroup().addTo(map);
			var gmlayers = [];
			var gmnames = [];

			var options = {
				interval : 6.2439024390243902439024390243902,
				showOriginLabel : false,
				showLabels : false,
				redraw : 'move'
			};

			layercontrol.addOverlay(L.simpleGraticule(options), "Grid Overlay");

			//map.on('click', function(e) { alert("Lat, Lon : " + map.project(e.latlng, 7) )});
			//map.on('dblclick', addMarker);

			var ArmaIcon = L.divIcon({
				iconSize : new L.Point(16, 16),
				className : 'icon-heli',
				html : '<div id="icon-heli" style="color:red; font-size:16px"><img src="icons/vehicles_map/mini_harrier.png"/></div>'
			});

			map.on("zoomend", function(e) {
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
			map.on("dragend", function(e) {
			});

			map.on('drag', function() {
			});

			map.on('baselayerchange', resetRotation);
		</script>
	</body>
</html>