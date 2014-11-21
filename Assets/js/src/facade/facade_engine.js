var Facade_engine = (function(THREE) {
	var container,
		stats;

	var camera,
		controls,
		scene,
		renderer;

	return {
		Camera: function( _options ) {
			this.camera = new THREE.PerspectiveCamera( _options.fov, _options.aspect, _options.near, _options.far );
			this.camera.position.x = _options.x;
			this.camera.position.y = _options.y;
			this.camera.position.z = _options.z;

			return this.camera;
		},
		CameraAspect: function() {
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();
		},

		Controls: function( _options ) {
			this.controls = new THREE.OrbitControls( this.camera );
			this.controls.damping = _options.damping;
			this.controls.addEventListener( 'change', _options.callback );

			return this.controls;
		},
		ControlsUpdate: function( _controls ) {
			this.controls.update();
		},
		Scene: function() {
			this.scene = new THREE.Scene();
			return this.scene;
		},
		SceneAdd: function( _obj ) {
			this.scene.add( _obj );
		},
		Fog: function( _hex, _density  ) {
			return new THREE.FogExp2( _hex, _density );
		},
		Renderer: function( _options ) {
			this.renderer = new THREE.WebGLRenderer( _options );
			//this.renderer.setClearColor( this.scene.fog.color, 1 );
			this.RendererSetsize();

			return this.renderer;
		},
		RendererSetsize: function() {
			this.renderer.setSize( window.innerWidth, window.innerHeight );
		},
		RendererRender: function() {
			this.renderer.render( this.scene, this.camera );
		},
		PointLight: function( _options ) {
			var light = new THREE.PointLight( _options.hex, _options.intensity, _options.distance );
			light.position.set( _options.x, _options.y, _options.z );
			return light;
		},
		AmbientLight: function( _hex ) {
			return new THREE.AmbientLight( _hex );
		},
		DirectionalLight: function( _options ) {
			var light = new THREE.DirectionalLight( _options.hex );
			light.position.set( _options.x, _options.y, _options.z );
			return light;
		},
		Stats: function( _options ) {
			this.stats = new Stats();
			this.stats.domElement.style.position = _options.position;
			this.stats.domElement.style.top = _options.top;
			this.stats.domElement.style.zIndex = _options.zIndex;

			return this.stats;
		},
		StatsUpdate: function() {
			this.stats.update();
		},
		getRender: function() {
			return this.renderer;
		},
		getStats: function() {
			return this.stats;
		},
		SphereGeo: function( _options ) {
			return new THREE.SphereGeometry( _options.radius, _options.segments, _options.segments );
		},
		MeshMaterial: function( _options ) {
			return new THREE.MeshLambertMaterial( _options.mat );
		},
		Mesh: function( _options ) {
			var mesh = new THREE.Mesh( _options.geometry, _options.material );
			this.MeshPosition( mesh, _options.x, _options.y, _options.z );
			mesh.updateMatrix();
			mesh.matrixAutoUpdate = _options.update;

			return mesh;
		},
		MeshPosition: function( _mesh, _positionX, _positionY, _positionZ ) {
			_mesh.position.x = _positionX;
			_mesh.position.y = _positionY;
			_mesh.position.z = _positionZ;
		},
		MeshTexture: function( _texture ) {
			return THREE.ImageUtils.loadTexture(_texture);
		},
		FlatShading: function() {
			return THREE.FlatShading;
		},
		DrawStroke: function( _options ) {
			var ellipsePath = new THREE.CurvePath();
			ellipsePath.add(new THREE.EllipseCurve(0, 0, _options.positionX, _options.positionY, 0, 2.0 * Math.PI, false));
			var ellipseGeometry = ellipsePath.createPointsGeometry(100);
			ellipseGeometry.computeTangents();
			return new THREE.Line(ellipseGeometry, new THREE.LineBasicMaterial({color:0x444444, opacity:1}));
		}
	};
}(THREE));