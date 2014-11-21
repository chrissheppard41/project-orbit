var Moon = (function() {
	var mn = null,
		angle = 0,
		distance = { x:0, y:0, z:0 };

	function Moon(radius, segments, position, texture, autoupdate) {
		var geometry = Facade_engine.SphereGeo( { radius: radius, segments: segments } );
		var mat = {  };
		if(texture !== null) {
			mat = { map: Facade_engine.MeshTexture(texture) };
		} else {
			mat = { color:0xffffff, shading: Facade_engine.FlatShading() };
		}
		var material = Facade_engine.MeshMaterial( { mat: mat } );

		this.mn = Facade_engine.Mesh( { geometry:geometry, material:material, x:position.x, y:position.y, z:position.z, update:autoupdate } );

		this.distance = position;

		this.angle = 0;
	}

	Moon.prototype = {
		draw: function(_px, _py, _pz) {
			if(this.angle === 360) { this.angle = 0; }
			var x1 = _px + this.distance.x * Math.sin(this.angle * Math.PI / 180);
			var y1 = _py + this.distance.y * Math.cos(this.angle * Math.PI / 180);
			var z1 = _pz + this.distance.z * Math.sin(this.angle * Math.PI / 180);

			Facade_engine.MeshPosition( this.mn, x1, y1, z1 );

			this.angle += (10/this.distance.x);
		},
		getMoon: function() {
			return this.mn;
		}
	};

	return Moon;
}());