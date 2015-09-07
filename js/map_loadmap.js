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
			
			
			for (i = 0; i < list_gm.length; i++) {
				var modename = "";
				if (list_gm[i].search("gpm_insurgency") != -1){
					modename = "Insurgency";
				}
				if (list_gm[i].search("gpm_coop") != -1){
					modename = "Coop";
				}
				if (list_gm[i].search("gpm_cq") != -1){
					modename = "Assault and Secure";
				}
				if (list_gm[i].search("gpm_vehicles") != -1){
					modename = "Vehicle Warfare";
				}
				if (list_gm[i].search("gpm_cnc") != -1){
					modename = "Command and Control";
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
				$.getJSON(list_gm[i], doSomething(i));
		}
		map.addLayer(GMLayerGroup);

	  }).fail( function(d, textStatus, error) {
			console.error("getJSON failed, status: " + textStatus + ", error: "+error);
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
	};
};