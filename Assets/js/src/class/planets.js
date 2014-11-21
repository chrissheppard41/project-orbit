var Planet = (function() {
	var pl = null,
		moons = [],
		angle = 0,
		distanceX = 0,
		distanceY = 0,
		distanceZ = 0,
		stroke = 0;

	function Planet(radius, segments, positionX, positionY, positionZ, texture, autoupdate, drawStroke) {
		var geometry = Facade_engine.SphereGeo( { radius: radius, segments: segments } );
		var mat = {  };
		if(texture !== null) {
			mat = { map: Facade_engine.MeshTexture(texture) };
		} else {
			mat = { color:0xffffff, shading: Facade_engine.FlatShading() };
		}
		var material = Facade_engine.MeshMaterial( { mat: mat } );

		this.pl = Facade_engine.Mesh( { geometry:geometry, material:material, x:positionX, y:positionY, z:positionZ, update:autoupdate } );

		this.distanceX = positionX;
		this.distanceY = positionY;
		this.distanceZ = positionZ;

		this.angle = 0;

		if(drawStroke) {
			this.stroke = Facade_engine.DrawStroke( { positionX:positionX, positionY:positionY } );
		}
		this.moons = [];

	}

	Planet.prototype = {
		draw: function() {
			if(this.angle === 360) { this.angle = 0; }
			var x1 = this.distanceX * Math.sin(this.angle * Math.PI / 180);
			var y1 = this.distanceY * Math.cos(this.angle * Math.PI / 180);
			var z1 = this.distanceZ * Math.sin(this.angle * Math.PI / 180);

			Facade_engine.MeshPosition( this.pl, x1, y1, z1 );

			this.angle += (10/this.distanceX);

			if(this.moons.length) {
				for(var i = 0; i < this.moons.length; i++) {
					this.moons[i].draw(x1, y1, z1);
				}
			}

		},
		getPlanet: function() {
			return this.pl;
		},
		addMoon: function(_radius, _segments, _x, _y, _z, texture, drawStroke) {
			var moon = new Moon(_radius, _segments, _x, _y, _z, null, true, false);

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