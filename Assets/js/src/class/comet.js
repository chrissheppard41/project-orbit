var Comet = (function() {
	var co = null,
		angle = 0,
		speed = 0,
		distance = { x:0, y:0, z:0},
		location = { x:0, y:0, z:0},
		stroke = 0;

	function Comet(radius, segments, loc, position, texture, autoupdate) {
		var geometry = Facade_engine.SphereGeo( { radius: radius, segments: segments } );
		var mat = {  };
		if(texture !== null) {
			mat = { map: Facade_engine.MeshTexture(texture) };
		} else {
			mat = { color:0xffffff, shading: Facade_engine.FlatShading() };
		}
		var material = Facade_engine.MeshMaterial( { mat: mat } );

		this.co = Facade_engine.Mesh( { geometry:geometry, material:material, x:position.x, y:position.y, z:position.z, update:autoupdate } );

		this.distance = position;
		this.location = loc;

		if(true) {
			this.stroke = Facade_engine.DrawStroke( { twodX: loc.x, twodY: loc.y, threedX:position.x, threedY:position.y, hex: 0x222222 } );
		}

		this.angle = 0;
	}

	Comet.prototype = {
		draw: function() {
			if(this.angle === 360) { this.angle = 0; }
			var x1 = this.location.x + this.distance.x * Math.sin(this.angle * Math.PI / 180);
			var y1 = this.location.y + this.distance.y * Math.cos(this.angle * Math.PI / 180);
			var z1 = this.location.z + this.distance.z * Math.sin(this.angle * Math.PI / 180);

			Facade_engine.MeshPosition( this.co, x1, y1, z1 );
			this.setSpeed(x1);
			this.angle += this.speed;
		},
		getComet: function() {
			return this.co;
		},
		getStroke: function() {
			return this.stroke;
		},
		setSpeed: function(average_angel) {
			var s = (10/average_angel);
			if(s > 0) {
				this.speed = s;
			}
		}
	};

	return Comet;
}());