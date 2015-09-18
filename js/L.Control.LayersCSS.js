L.Control.LayersCSS = L.Control.Layers.extend({
	options : {
		collapsed : true,
		position : 'topright',
		autoZIndex : true,
		classname : ''
	},
	_initLayout : function() {
		var className = 'leaflet-control-layers';
		var customclass = this.options.classname;
		var container = this._container = L.DomUtil.create('div', className + " " + customclass);

		// makes this work on IE touch devices by stopping it from firing a mouseout event when the touch is released
		container.setAttribute('aria-haspopup', true);

		if (!L.Browser.touch) {
			L.DomEvent.disableClickPropagation(container).disableScrollPropagation(container);
		} else {
			L.DomEvent.on(container, 'click', L.DomEvent.stopPropagation);
		}

		var form = this._form = L.DomUtil.create('form', className + '-list');

		if (this.options.collapsed) {
			if (!L.Browser.android) {
				L.DomEvent.on(container, {
					/*click : new function() {

					 if (container.classList.contains("leaflet-control-layers-expanded")) {
					 this._expand;
					 }else{
					 this._collapse;}
					 }*/

					mouseenter : this._expand,
					mouseleave : this._collapse
				}, this);
			}

			var link = this._layersLink = L.DomUtil.create('a', className + '-toggle', container);
			link.href = '#';
			link.title = 'Layers';

			if (L.Browser.touch) {
				L.DomEvent.on(link, 'click', L.DomEvent.stop).on(link, 'click', this._expand, this);
			} else {
				L.DomEvent.on(link, 'focus', this._expand, this);
			}

			// work around for Firefox Android issue https://github.com/Leaflet/Leaflet/issues/2033
			L.DomEvent.on(form, 'click', function() {
				setTimeout(L.bind(this._onInputClick, this), 0);
			}, this);

			this._map.on('click', this._collapse, this);
			// TODO keyboard accessibility
		} else {
			this._expand();
		}

		this._baseLayersList = L.DomUtil.create('div', className + '-base', form);
		this._separator = L.DomUtil.create('div', className + '-separator', form);
		this._overlaysList = L.DomUtil.create('div', className + '-overlays', form);

		container.appendChild(form);
	},
});

L.control.layersCSS = function(baseLayers, overlays, options) {
	return new L.Control.LayersCSS(baseLayers, overlays, options);
};
