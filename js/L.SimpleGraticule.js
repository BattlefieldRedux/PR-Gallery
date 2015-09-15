/**
 *  File: L.SimpleGraticule.js
 *  Desc: A graticule for Leaflet maps in the L.CRS.Simple coordinate system.
 *  Auth: Andrew Blakey (ablakey@gmail.com)
 *  Customized by [WGP]Senshi (tassilo.m@gmail.com)
 */
L.SimpleGraticule = L.LayerGroup.extend({
	options : {
		interval : 20,
		offset : 0,
		showOriginLabel : true,
		showLabels : true,
		redraw : 'move',
		hidden : false,
		lineStyle : {
			stroke : true,
			color : '#fff',
			opacity : 0.6,
			weight : 1,
			clickable : false,
			pointerEvents : null,
			className : "simple-grid-line"
		}
	},

	initialize : function(options) {
		L.LayerGroup.prototype.initialize.call(this);
		L.Util.setOptions(this, options);
	},

	onAdd : function(map) {
		this._map = map;

		var graticule = this.redraw();
		this._map.on('viewreset ' + this.options.redraw, graticule.redraw, graticule);

		this.eachLayer(map.addLayer, map);
	},

	onRemove : function(map) {
		map.off('viewreset ' + this.options.redraw, this.map);
		this.eachLayer(this.removeLayer, this);
	},

	hide : function() {
		this.options.hidden = true;
		this.redraw();
	},

	show : function() {
		this.options.hidden = false;
		this.redraw();
	},

	redraw : function() {

		this._bounds = this._map.getBounds().pad(0.5);

		this.clearLayers();

		if (this.options.lineStyle.weight * (map.getZoom() + 2 ) < 1) {
			return this;
		}
		if (!this.options.hidden) {
			this.constructLines(this.getMins(), this.getLineCounts());

			if (this.options.showOriginLabel) {
				this.addLayer(this.addOriginLabel());
			}
		}

		return this;
	},

	getLineCounts : function() {
		var west = this._bounds.getWest();
		var east = this._bounds.getEast();
		var north = this._bounds.getNorth();
		var south = this._bounds.getSouth();
		if (north > 0) {
			north = 0;
		};
		if (map.project(this._bounds.getSouthEast(), map.getMaxZoom()).y > 8192) {
			south = map.unproject([8192, 8192], map.getMaxZoom()).lat;
		};
		if (west < 0) {
			west = 0;
		};
		if (map.project(this._bounds.getSouthEast(), map.getMaxZoom()).x > 8192) {
			east = map.unproject([8192, 8192], map.getMaxZoom()).lng;
		};

		var x = Math.ceil((east - west) / this.options.interval);
		var y = Math.ceil((north - south) / this.options.interval);
		return {
			x : x,
			y : y
		};
	},

	getMins : function() {
		//rounds up to nearest multiple of x
		var s = this.options.interval;
		var x = Math.floor((this._bounds.getWest() + this.options.offset) / s) * s + this.options.offset;
		var y = Math.ceil((this._bounds.getNorth() - this.options.offset) / s) * s - this.options.offset;
		if (x < 0) {
			x = this.options.offset;
		};
		if (y > 0) {
			y = -this.options.offset;
		};
		return {
			x : x,
			y : y
		};
	},

	constructLines : function(mins, counts) {
		var lines = new Array(counts.x + counts.y);
		var labels = new Array(counts.x + counts.y);

		//for horizontal lines
		for (var i = 0; i < counts.x; i++) {
			var x = mins.x + i * this.options.interval;
			lines[i] = this.buildXLine(x);
			if (this.options.showLabels) {
				labels[i] = this.buildLabel('gridlabel-horiz', x);
			}
		}

		//for vertical lines
		for (var j = 0; j < counts.y; j++) {
			var y = mins.y - j * this.options.interval;
			lines[j + i] = this.buildYLine(y);
			if (this.options.showLabels) {
				labels[j + i] = this.buildLabel('gridlabel-vert', y);
			}
		}

		lines.forEach(this.addLayer, this);
		labels.forEach(this.addLayer, this);
	},

	buildXLine : function(x) {
		var bottom = this._bounds.getSouth();
		var top = this._bounds.getNorth();
		if (top > 0) {
			top = 0;
		};
		if (map.project(this._bounds.getSouthEast(), map.getMaxZoom()).y > 8192) {
			bottom = map.unproject([8192, 8192], map.getMaxZoom()).lat;
		};
		var bottomLL = new L.LatLng(bottom, x);
		var topLL = new L.LatLng(top, x);

		var style = $.extend({}, this.options.lineStyle);
		style.weight = style.weight * (map.getZoom() + 1);
		return new L.Polyline([bottomLL, topLL], style);
	},

	buildYLine : function(y) {
		var left = this._bounds.getWest();
		var right = this._bounds.getEast();
		if (left < 0) {
			left = 0;
		};
		if (map.project(this._bounds.getSouthEast(), map.getMaxZoom()).x > 8192) {
			right = map.unproject([8192, 8192], map.getMaxZoom()).lng;
		};
		var leftLL = new L.LatLng(y, left);
		var rightLL = new L.LatLng(y, right);

		var style = $.extend({}, this.options.lineStyle);
		style.weight = style.weight * (map.getZoom() + 1);
		return new L.Polyline([leftLL, rightLL], style);
	},

	buildLabel : function(axis, val) {
		var bounds = this._map.getBounds().pad(-0.003);
		var west = bounds.getWest();
		var east = bounds.getEast();
		var north = bounds.getNorth();
		var south = bounds.getSouth();
		if (north > 0) {
			north = 0;
		};
		if (map.project(bounds.getSouthEast(), map.getMaxZoom()).y > 8192) {
			south = map.unproject([8192, 8192], map.getMaxZoom()).lat;
		};
		if (west < 0) {
			west = 0;
		};
		if (map.project(bounds.getSouthEast(), map.getMaxZoom()).x > 8192) {
			east = map.unproject([8192, 8192], map.getMaxZoom()).lng;
		};
		var latLng;
		if (axis == 'gridlabel-horiz') {
			var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"];
			var pick = alphabet[Math.ceil(val / 256 * 13)];
		} else {
			var pick = Math.abs(Math.floor(val / 256 * 13));
		};
		if (axis == 'gridlabel-horiz') {
			var textwidth = getTextWidth(pick, "bold 15px arial");
			latLng = new L.LatLng(north, val + 1 / 2 * this.options.interval - textwidth / this.options.interval * map.getZoom());
		} else {
			var textwidth = getTextWidth(pick, "bold 15px arial");
			latLng = new L.LatLng(val - 1 / 2 * this.options.interval + 15 / (map.getZoom() + 1), west);
		}

		return L.marker(latLng, {
			clickable : false,
			icon : L.divIcon({
				iconSize : [0, 0],
				className : 'simple-grid-label',
				html : '<div style="width:' + ((this.options.interval * 1)) + 'px" class="' + axis + '">' + pick + '</div>'
			})
		});
	},

	addOriginLabel : function() {
		return L.marker([0, 0], {
			clickable : false,
			icon : L.divIcon({
				iconSize : [0, 0],
				className : 'simple-grid-label',
				html : '<div class="gridlabel-horiz">(0,0)</div>'
			})
		});
	}
});

L.simpleGraticule = function(options) {
	return new L.SimpleGraticule(options);
};
