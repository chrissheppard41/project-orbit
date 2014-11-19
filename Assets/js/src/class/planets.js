var Planet = (function() {
	var pl = null,
		moons = [],
		angle = 0,
		distanceX = 0,
		distanceY = 0,
		distanceZ = 0,
		stroke = 0;

	function Planet(radius, segments, positionX, positionY, positionZ, texture, autoupdate, drawStroke) {
		var geometry = new THREE.SphereGeometry( radius, segments, segments );
		var mat = {  };
		if(texture !== null) {
			mat = { map: THREE.ImageUtils.loadTexture(texture) };
		} else {
			mat ={ color:0xffffff, shading: THREE.FlatShading };
		}
		var material = new THREE.MeshLambertMaterial( mat );

		this.pl = new THREE.Mesh( geometry, material );
		this.pl.position.x = positionX;
		this.pl.position.y = positionY;
		this.pl.position.z = positionZ;
		this.pl.updateMatrix();
		this.pl.matrixAutoUpdate = autoupdate;

		this.distanceX = positionX;
		this.distanceY = positionY;
		this.distanceZ = positionZ;

		this.angle = 0;

		if(drawStroke) {
			/*var str_material = new THREE.LineBasicMaterial( { color: 0x444444 } ),
				str_geometry = new THREE.CircleGeometry( positionX, 64 );
			// Remove center vertex
			str_geometry.vertices.shift();

			this.stroke = new THREE.Line( str_geometry, str_material );*/

			//THREE.EllipseCurve(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise)
			var ellipsePath = new THREE.CurvePath();
			ellipsePath.add(new THREE.EllipseCurve(0, 0, positionX, positionY, 0, 2.0 * Math.PI, false));
			var ellipseGeometry = ellipsePath.createPointsGeometry(100);
			ellipseGeometry.computeTangents();
			this.stroke = new THREE.Line(ellipseGeometry, new THREE.LineBasicMaterial({color:0x444444, opacity:1}));
		}
		this.moons = [];

	}

	Planet.prototype = {
		draw: function() {
			if(this.angle === 360) { this.angle = 0; }
			var x1 = this.distanceX * Math.sin(this.angle * Math.PI / 180);
			var y1 = this.distanceY * Math.cos(this.angle * Math.PI / 180);
			var z1 = this.distanceZ * Math.sin(this.angle * Math.PI / 180);

			this.pl.position.x = x1;
			this.pl.position.y = y1;
			this.pl.position.z = z1;

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
			//radius, segments, positionX, positionY, positionZ, texture, autoupdate, drawStroke
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