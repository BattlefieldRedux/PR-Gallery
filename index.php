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
        <script src="js/jquery-2.1.4.js"></script>
        <script src="js/common.js"></script>
        <script src="js/gallery.js"></script>
        <script src="js/map_events.js"></script>
        <script src="js/map_loadmap.js"></script>
        <script src="js/L.SimpleGraticule.js"></script>
        <script src="js/L.Control.LayersCSS.js"></script>

        <!--
        Uncomment for production
        <script src="js/leaflet.js"></script>
        <script src="js/jquery-2.1.0.min.js"></script>
        -->

        <title>Project Reality Map Gallery</title>
    </head>

    <body>
        <div id="bwrap">
            <div id="Header">
                <div class="buttons">
                    <div id="Menu-button">
                        <div id="Menu-button-layer-wrapper">
                            <span class="menu-button-layer"></span>
                            <span class="menu-button-layer"></span>
                            <span class="menu-button-layer"></span>
                        </div>
                    </div>
                    <div id="Map-button" class="hide"><img src="js/images/layers.png">
                    </div>
                </div>
                <div id="Title-Wrapper">
                    <div id="Title">
                        Project Reality
                    </div>
                    <div id="SubTitle">
                        <div id="SubTitle-title"></div>
                        <div id="SubTitle-list"></div>
                    </div>
                </div>
                <div id="MiddleHeader" class = "hide">
                    <div class="team1"></div>
                    vs<div class="team2"></div>
                </div>
                <div id="RightMenu">
                    <div id="Assets-button" class="hide button"></div>
                    <div id="AAS-button" class="hide button">
                        <div id="AAS-button-list" class="hide"></div>
                    </div>
                    <div id="Search">
                        <img src="img/resources/ic_search.png">
                        <input type="text" placeholder="Search">
                    </div>
                </div>
            </div>

            <div id="Body-Wrapper">
                <div id="Nav">
                    <ul>
                        <a href="http://www.realitymod.com/forum/">
                        <li>
                            Forum
                        </li></a>
                        <a href="http://tournament.realitymod.com/">
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

                <div id="RightPane">
                    <div id="RPane-team-buttons">
                        <div id="RPane-team1-button">
                            Team 1
                        </div>
                        <div id="RPane-team2-button">
                            Team 2
                        </div>
                    </div>
                    <div id="RPane-content"></div>
                </div>
            </div>
        </div>
        <div id='output'></div>

        <script>
			/* Global variables are defined here. They will be capitalized.
			 *
			 */
			var click = document.getElementById('click');
			var mousemove = document.getElementById('output');
			var mapwidth = 4096;
			var mapheight = 4096;
			var GMLIST = [];
			// List of gamemodes of the currently active map. Contains fancy name, codename and link to geojson
			var CURRENTGM = {
				"objects" : [],
				"routes" : [],
				"flags" : [],
				"combatareas" : []
			};
			// List of assets of the currently active gamemode.
			var GMROUTES = [];
			var GMLAYERS = [];
			var GMNAMES = [];
			var MAPLOADED = false;

			var MAP = L.map('map', {
				crs : L.CRS.Simple
			}).setView([0, 0], 2);
			MAP.on('baselayerchange', resetRotation);
			var layercontrol = L.control.layersCSS({}, {}, {
				classname : 'Mapstyle-button'
			}).addTo(MAP);

			var LAYER_ASSETS = new L.LayerGroup().addTo(MAP);
			//Overlay with asset markers
			var LAYER_GRID = new L.LayerGroup().addTo(MAP);
			// Overlay with grid
			var LAYER_ROUTES = new L.LayerGroup().addTo(MAP);
			var LAYER_FLAGS = new L.LayerGroup().addTo(MAP);
			var LAYER_FLAGRADIUS = new L.LayerGroup().addTo(MAP);
			var LAYER_COMBATAREAS = new L.LayerGroup().addTo(MAP);

			var LAYER_MAPTILES = new L.LayerGroup().addTo(MAP);
        </script>
    </body>
</html>