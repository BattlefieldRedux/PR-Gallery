/**
 * Created by Vasco on 02/05/2015.
 */
/* ======================================================================================
 * ==================           BUILDING TILES-CONTAINERS      ==========================
 * ======================================================================================
 */

$(window).ready(function() {
	$('#SubTitle-title').html('MapGallery');

	$.getJSON("map_json/maplist.json", function(metaMap) {
		$("#Container").append('<div id="Map-Tiles"></div>');

		for (var key in metaMap) {
			var element = metaMap[key];
			var mapName = element.name;
			var mapCode = element.code;

			//If map is already in gallery
			if ($("#Map-" + mapCode).length) {
			} else {//If map is not yet in gallery
				var tileMarkup = '<div id="Map-' + mapCode + '" class="tile-container" data-name="' + mapName + '" data-code="' + mapCode + '" data-listgm="' + element.listgm + '">';
				tileMarkup += "<div class='tile-card'>";
				tileMarkup += metaMap[key].name;
				tileMarkup += "</div>";
				tileMarkup += "<img class='mix tile' src='map_source/" + mapCode + "_minimap.jpg'>";
				tileMarkup += "<div class='meta-information'>";
				tileMarkup += "";
				tileMarkup += "</div></div>";
				$("#Map-Tiles").append(tileMarkup);
				DICTIONARY_LARGE.push([mapCode, mapName]);
			}
		}
	}).fail(function(metaMap, textStatus, error) {
		console.error("getJSON failed, status: " + textStatus + ", error: " + error);
	}).complete(function() {
		parseArgs();
	});

	/* ======================================================================================
	 * ======================           GameMode Selection      =============================
	 * ======================================================================================
	 */
	$('#SubTitle').hover(function() {
		if (!$('#SubTitle').hasClass('gmselector'))
			return;
		if ($('#SubTitle.gmselector').hasClass('expanded')) {
			$('#SubTitle.gmselector').removeClass('expanded');
			$('#SubTitle.gmselector .gmselection').addClass('hide');

		} else {
			$('#SubTitle.gmselector').addClass('expanded');
			$('#SubTitle.gmselector .gmselection').removeClass('hide');
		}
	});
	
	$('#AAS-button').hover(function() {
		if ($('#AAS-button').hasClass('expanded')) {
			$('#AAS-button').removeClass('expanded');
			$('#AAS-button-list').addClass('hide');

		} else {
			$('#AAS-button').addClass('expanded');
			$('#AAS-button-list').removeClass('hide');

		}
	});
	/* ======================================================================================
	 * =========================           On Map Click      ================================
	 * ======================================================================================
	 */
	$('#Container').on('click', '.tile-container', function(event) {
		loadMap($(event.target).parent().data("code"));
	});

	/* ======================================================================================
	 * ======================           Back Button      =======================
	 * ======================================================================================
	 */

	$('#Map-button').on('click', function() {
		$('#Title').html("Project Reality");
		$('#SubTitle-title').html('MapGallery');
		$('#SubTitle').removeClass('gmselector');
		$('#map').addClass('hide');
		$('#Map-button').addClass('hide');
		$('#MiddleHeader').addClass('hide');
		$('#RightPane-button').addClass('hide');
		$('#RightPane-button').removeClass('open');
		$('#RightPane').removeClass('open');
		$('#Container').removeClass('hide');
		$('#PRContainer').addClass('hide');
		$('#Search').removeClass('hide');
		$("#Search>input").focus();
		$('#Assets-button').addClass('hide');
		$('#GM-button').addClass('hide');
		$('#AAS-button').addClass('hide');
		$('.leaflet-control-layers.GM-button').addClass('hide');
		document.getElementById('output').innerHTML = "";
		document.getElementById('RPane-content').innerHTML = "";
	});

	/* ======================================================================================
	 * =========================             Search          ================================
	 * ======================================================================================
	 */

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

function updateAASroutes() {

}
