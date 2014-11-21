var Planet = (function() {
	var pl = null,
		moons = [],
		angle = 0,
		distance = { x:0, y:0, z:0 },
		stroke = 0;

	function Planet(radius, segments, position, texture, autoupdate, drawStroke) {
		var geometry = Facade_engine.SphereGeo( { radius: radius, segments: segments } );
		var mat = {  };
		if(texture !== null) {
			mat = { map: Facade_engine.MeshTexture(texture) };
		} else {
			mat = { color:0xffffff, shading: Facade_engine.FlatShading() };
		}
		var material = Facade_engine.MeshMaterial( { mat: mat } );

		this.pl = Facade_engine.Mesh( { geometry:geometry, material:material, x:position.x, y:position.y, z:position.z, update:autoupdate } );

		this.distance = position;

		this.angle = 0;

		if(drawStroke) {
			this.stroke = Facade_engine.DrawStroke( { twodX: 0, twodY: 0, threedX:position.x, threedY:position.y, hex: 0x444444 } );
		}
		this.moons = [];
	}

	Planet.prototype = {
		draw: function() {
			if(this.angle === 360) { this.angle = 0; }
			var x1 = this.distance.x * Math.sin(this.angle * Math.PI / 180);
			var y1 = this.distance.y * Math.cos(this.angle * Math.PI / 180);
			var z1 = this.distance.z * Math.sin(this.angle * Math.PI / 180);

			Facade_engine.MeshPosition( this.pl, x1, y1, z1 );

			this.angle += (10/this.distance.x);

			if(this.moons.length) {
				for(var i = 0; i < this.moons.length; i++) {
					this.moons[i].draw(x1, y1, z1);
				}
			}

		},
		getPlanet: function() {
			return this.pl;
		},
		addMoon: function(_radius, _segments, _position, texture) {
			var moon = new Moon(_radius, _segments, _position, null, true);
			this.moons.push(moon);
		},
		getMoons: function() {
			return this.moons;
		},
		getStroke: function() {
			return this.stroke;
		}
	};

	return Planet;
}());