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
			$('#SubTitle.gmselector .gmselection').off('click');

		} else {
			$('#SubTitle.gmselector').addClass('expanded');
			$('#SubTitle.gmselector .gmselection').removeClass('hide');

			$('#SubTitle.gmselector .gmselection').click(function(event) {
				if ($(event.target).hasClass('open')) {
				} else {
					$('#SubTitle.gmselector .gmselection.open').removeClass('open');
					$(event.target).addClass('open');
					loadGM(GMLIST[$(event.target).attr('data-index')]);
				}

			});
		}
	});

	$('#AAS-button').hover(function() {
		if ($('#AAS-button').hasClass('expanded')) {
			$('#AAS-button').removeClass('expanded');
			$('#AAS-button-list').addClass('hide');
			$('#AAS-button-list .AASselection').off('click');

		} else {
			$('#AAS-button').addClass('expanded');
			$('#AAS-button-list').removeClass('hide');

			$('#AAS-button-list .AASselection').click(function(event) {
				if ($(event.target).hasClass('open')) {
					$(event.target).removeClass('open');
				} else {
					$(event.target).addClass('open');
				}

				var selectedroutes = $('#AAS-button-list .AASselection.open');
				var routeindexes = [];
				for ( i = 0; i < selectedroutes.length; i++) {
					routeindexes.push($(selectedroutes[i]).data('index'));
				}
				LAYER_ROUTES.clearLayers();
				LAYER_FLAGS.clearLayers();
				for ( i = 0; i < GMROUTES.length; i++) {
					if (routeindexes.indexOf(i) > -1 || routeindexes.length == 0) {
						LAYER_ROUTES.addLayer(GMROUTES[i]);
					}
				}

				var flagindexes = [];
				for ( i = 0; i < CURRENTGM.flags.length; i++) {
					for ( j = 0; j < CURRENTGM.routes.length; j++) {
						if (routeindexes.indexOf(j) > -1 || routeindexes.length == 0) {

							for ( k = 0; k < CURRENTGM.routes[j].length; k++) {
								for ( l = 0; l < CURRENTGM.routes[j][k].length; l++) {
									if (CURRENTGM.flags[i].data.code == CURRENTGM.routes[j][k][l] || routeindexes.length == 0) {
										if (flagindexes.indexOf(i) == -1) {
											flagindexes.push(i);
										}
									}
								}
							}
						}
					}
				}
				for ( i = 0; i < flagindexes.length; i++) {
					LAYER_FLAGS.addLayer(CURRENTGM.flags[flagindexes[i]]);
				}
			});
		}
	});
	/* ======================================================================================
	 * =========================           On Map Click      ================================
	 * ======================================================================================
	 */
	$('#Container').on('click', '.tile-container', function(event) {

		var layouts = [];
		var element = $(event.target).parent();
		var mapcode = element.data('code');

		var mapname = element.data('name');
		$('#Title').html(mapname);
		$('#SubTitle').addClass('gmselector');

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
		$('#GM-button').removeClass('hide');
		$('#Assets-button').addClass('open');
		$('.leaflet-control-layers.GM-button.hide').removeClass('hide');
		loadMap(mapcode);
		MAP._onResize();
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
		$('#Fab-Anchor').html('');
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
