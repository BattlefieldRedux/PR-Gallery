/**
 * Created by Vasco on 02/05/2015.
 */
/* ======================================================================================
 * ==================           BUILDING TILES-CONTAINERS      ==========================
 * ======================================================================================
 */

$(window).ready(function() {
	$('#SubTitle').html('MapGallery');

	$.getJSON("map_json/maplist.json", function(metaMap) {
		$("#Container").append('<div id="Map-Tiles"></div>');

		for (var key in metaMap) {
			var element = metaMap[key];
			var mapName = element.name;
			var mapCode = element.code;

			//If map is already in gallery
			if ($("#Map-" + mapCode).length) {
			} else {//If map is not yet in gallery
				var tileMarkup = '<div id="Map-' + mapCode + '" class="tile-container" data-name="' + element.name + '" data-code="' + element.code + '" data-listgm="' + element.listgm + '">';
				tileMarkup += "<div class='tile-card'>";
				tileMarkup += metaMap[key].name;
				tileMarkup += "</div>";
				tileMarkup += "<img class='mix tile' src='map_source/" + mapCode + "_minimap.jpg'>";
				tileMarkup += "<div class='meta-information'>";
				tileMarkup += "";
				tileMarkup += "</div></div>";
				$("#Map-Tiles").append(tileMarkup);
			}
		}
	}).fail(function(metaMap, textStatus, error) {
		console.error("getJSON failed, status: " + textStatus + ", error: " + error);
	});
});

/* ======================================================================================
 * ============================           TILES      =================================
 * ======================================================================================
 */

/* ======================================================================================
 * =========================           On Map Click      ================================
 * ======================================================================================
 */

$(window).ready(function() {

	$('#Container').on('click', '.tile-container', function(event) {

		var layouts = [];
		var element = $(event.target).parent();
		var mapcode = element.data('code');
		loadMap(mapcode);

		var mapname = element.data('name');
		$('#Title').html(mapname);
		$('#SubTitle').html("Choose a gamemode");

		$('#Search').addClass('hide');
		$('html,body').scrollTop(0);
		// $('body').addClass('noscroll');
		// $('#SubTiles').addClass('open');
		//$('#Background').css('background-image', 'url("img/maps/' + mapName+ '/background.jpg")');
		//$('#Background').css('background-image', 'url("map_source/albasrah_minimap.jpg")');
		// $('#map').addClass('ready');
		$('#Header').removeClass("opaque");
		$('#Container').addClass('hide');
		$('#map').removeClass('hide');
		$('#Map-button').removeClass('hide');
		$('#RightPane-button').removeClass('hide');
		$('#RightPane-button').addClass('open');
		$('#RightPane').addClass('open');
		$('#PRContainer').removeClass('hide');
		$('#Assets-button').removeClass('hide');
		$('.leaflet-control-layers.GM-button.hide').removeClass('hide');
		map._onResize();
	});
});

/* ======================================================================================
 * ======================           Back Button      =======================
 * ======================================================================================
 */

$(window).ready(function() {

	$('#Map-button').on('click', function() {
		closeFABs();
		$('#Title').html("Project Reality");
		$('#SubTitle').html('MapGallery');
		$('#map').addClass('hide');
		$('#Map-button').addClass('hide');
		$('#RightPane-button').addClass('hide');
		$('#RightPane-button').removeClass('open');
		$('#RightPane').removeClass('open');
		$('#Container').removeClass('hide');
		$('#PRContainer').addClass('hide');
		$('#Fab-Anchor').html('');
		$('#Search').removeClass('hide');
		$("#Search>input").focus();
		$('#Assets-button').addClass('hide');
		$('.leaflet-control-layers.GM-button').addClass('hide');
		document.getElementById('output').innerHTML = "";
		document.getElementById('RightPane').innerHTML = "";
	});
});

/* ======================================================================================
 * ============================           LAYOUTS      =================================
 * ======================================================================================
 */

$(window).ready(function() {

	$('#Fab-Anchor').on('click', 'li', function() {
		closeFABs();
		$(this).siblings('li').removeClass('selected');
		$(this).addClass('selected');

		buildLayout(parseInt($(this).attr('data')), parseInt($(this).prevAll('li').length));

	});
});

/* ======================================================================================
 * =========================           buildLayout      ================================
 * ======================================================================================
 */

function buildLayout(layout) {
	var map = ASSETS_JSON[layout];

	$('#Title').html(map.FriendlyMapName + " (" + map.MapSize + " Km)");
	$('#SubTitle').html(dictionary(map.GameMode) + ' ' + dictionary(map.Layer));

	// $('#MapOverview').css('background-image', "url(img/maps/"+map.MapName+"/mapOverview_"+map.GameMode+"_"+map.Layer+".png)");

	$('.assets.teamA').html('');
	//RESET
	$('.assets.teamB').html('');
	//RESET

	var teamB = "";
	var teamA = "";
	var posA = 0;
	var posB = 0;
	for (var key in map.Spawners) {
		var asset = map.Spawners[key];

		if (asset.Team == 2) {
			teamA += rowAsset(posB++, asset.FriendlyName, asset.Quantity, asset.MaxSpawnDelay, asset.SpawnDelayAtStart, '');
		} else {
			teamB += rowAsset(posA++, asset.FriendlyName, asset.Quantity, asset.MaxSpawnDelay, asset.SpawnDelayAtStart, '');
		}
	}

	if (teamA == "")
		teamA += rowEmpty();
	if (teamB == "")
		teamB += rowEmpty();

	$('.assets.teamB').append(teamB);
	$('.assets.teamA').append(teamA);

}

function rowEmpty() {
	var html = '';

	html += '<div class="empty">No vehicles on this layout.</div>'

	return html;
}

function rowAsset(index, name, qt, delay, start, img) {

	if (parseInt(delay) > 9999)
		delay = 'Never';
	else
		delay = Math.round((delay / 60)) + 'm';

	var html = '';
	html += '<div class="asset-row slide-up" style="-webkit-animation-delay: ' + (index * 50) + 'ms; animation-delay:' + (index * 50) + 'ms"> ';
	//html += '<div class="asset-img" style="background-image: url(img/assets/mini_heavyhelo.png)"></div>'
	html += '<div class="info">';
	html += '<div>';
	html += '<div class="asset-qt">' + qt + 'x</div>';
	html += '<div class="asset-name">' + name + '</div>';
	html += '</div><div>';
	html += '<div class="asset-delay">Spawn Time: ' + delay + '</div>';
	if (toTitleCase(start + '') == 'True')
		html += '<div class="asset-start">Delayed</div>';
	html += '</div></div></div>';
	return html;

}

/* ======================================================================================
 * =========================             Search          ================================
 * ======================================================================================
 */

$(window).ready(function() {
	$('#Search input').on('input', function() {
		filterMapsByName($(this).val());
	});
});

function filterMapsByName(nameToFilter) {
	// TODO: Give feedback to user if no results have been found (found == 0)
	// E.g. show message in map-tiles 'Your query gives no results.'
	var no = 0;
	var found = 0;
	$(".tile-container").each(function() {
		no += 1;
		var mapName = $(this).find(".tile-card").text();
		if (nameToFilter == "" || mapName.toLowerCase().indexOf(nameToFilter.toLowerCase()) >= 0) {

			$(this).removeClass("hide");
			found += 1;
		} else {
			$(this).addClass("hide");
		}

	});
}

