var Facade_dom = (function() {
	return {
		Element: function( _element ) {
			return document.getElementById( _element );
		},
		Append: function( _container, _content ) {
			_container.appendChild( _content );
		}
	};
}());