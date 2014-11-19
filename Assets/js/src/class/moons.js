var Moon = (function() {
	var mn = null,
		angle = 0,
		distanceX = 0,
		distanceY = 0,
		distanceZ = 0;

	function Moon(radius, segments, positionX, positionY, positionZ, texture, autoupdate) {
		var geometry = new THREE.SphereGeometry( radius, segments, segments );
		var mat = {  };
		if(texture !== null) {
			mat = { map: THREE.ImageUtils.loadTexture(texture) };
		} else {
			mat ={ color:0xffffff, shading: THREE.FlatShading };
		}
		var material = new THREE.MeshLambertMaterial( mat );

		this.mn = new THREE.Mesh( geometry, material );
		this.mn.position.x = positionX;
		this.mn.position.y = positionY;
		this.mn.position.z = positionZ;
		this.mn.updateMatrix();
		this.mn.matrixAutoUpdate = autoupdate;

		this.distanceX = positionX;
		this.distanceY = positionY;
		this.distanceZ = positionZ;

		this.angle = 0;
	}

	Moon.prototype = {
		draw: function(_px, _py, _pz) {
			if(this.angle === 360) { this.angle = 0; }
			var x1 = _px + this.distanceX * Math.sin(this.angle * Math.PI / 180);
			var y1 = _py + this.distanceY * Math.cos(this.angle * Math.PI / 180);
			var z1 = _pz + this.distanceZ * Math.sin(this.angle * Math.PI / 180);

			this.mn.position.x = x1;
			this.mn.position.y = y1;
			this.mn.position.z = z1;

			this.angle += (10/this.distanceX);
		},
		getMoon: function() {
			return this.mn;
		}
	};

	return Moon;
}());