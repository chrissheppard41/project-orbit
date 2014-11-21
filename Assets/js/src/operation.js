var Operation = (function() {

	var container,
		stats;

	var camera,
		controls,
		scene,
		renderer;

	var sun,
		planets = [];

	return {
		init: function() {

			//camera base
			Facade_engine.Camera( { fov: 60, aspect: (window.innerWidth / window.innerHeight), near: 1, far: 1000, x:0, y:0, z:500 });

			//camera controls
			Facade_engine.Controls( { damping: 0.2, callback: this.render } );

			//scene
			Facade_engine.Scene();

			// Render all space objects
			this.setPlanets();

			// lights
			this.setLights();

			// renderer
			Facade_engine.Renderer( { antialias: false } );

			//container
			container = Facade_dom.Element( 'container' );
			Facade_dom.Append( container, Facade_engine.getRender().domElement );

			//frames per second/ms stats
			Facade_engine.Stats( { position: 'absolute', top: '0px', zIndex: 100 } );
			Facade_dom.Append( container, Facade_engine.getStats().domElement );

			//on screen resize
			window.addEventListener( 'resize', this.onWindowResize, false );

			//start animations
			this.animate();

		},
		setPlanets: function() {
			sun = new Planet(30, 32, 0, 0, 0, null/*"Assets/img/texture_sun.jpg"*/, false, false);
			Facade_engine.SceneAdd( sun.getPlanet() );

			var p1 = new Planet(1, 10, 50, 50, 0, null, true, true);
			p1.addMoon(0.2, 5, 5, 5, 0, null);
			p1.addMoon(0.3, 5, 7, 7, 0, null);
			planets.push(p1);

			var p2 = new Planet(1, 10, 150, 150, 0, null, true, true);
			planets.push(p2);

			var p3 = new Planet(2, 10, 200, 200, 0, null, true, true);
			planets.push(p3);

			var p4 = new Planet(5, 10, 230, 260, 30, null, true, true);
			p4.addMoon(0.2, 5, 12, 12, 0, null);
			p4.addMoon(0.3, 5, 7, 7, 0, null);
			p4.addMoon(0.5, 5, 10, 10, 5, null);
			planets.push(p4);

			if(planets.length) {
				for(var i = 0; i < planets.length; i++) {
					//scene.add( planets[i].getPlanet() );
					//scene.add( planets[i].getStroke() );

					Facade_engine.SceneAdd( planets[i].getPlanet() );
					Facade_engine.SceneAdd( planets[i].getStroke() );

					var moons = planets[i].getMoons();
					if(moons.length) {
						for(var j = 0; j < moons.length; j++) {
							//scene.add( moons[j].getMoon() );
							Facade_engine.SceneAdd( moons[j].getMoon() );
						}
					}

				}
			}
		},
		setLights: function() {
			/*light = new Facade_engine.DirectionalLight( { 0xffffff, x: 0, y: 0, z: 0 } );
			scene.add( light );*/

			light = new Facade_engine.PointLight( { hex: 0xffffff, intensity: 1, distance: 1000, x: 0, y: 0, z: 0 } );
			//scene.add( light );
			Facade_engine.SceneAdd( light );
			/*light = new Facade_engine.DirectionalLight( { 0x002288, x: 0, y: 0, z: 0 } );
			//scene.add( light );
			Facade_engine.SceneAdd( light );*/

			light = new Facade_engine.AmbientLight( 0xaaaaaa );
			//scene.add( light );
			Facade_engine.SceneAdd( light );
		},
		animate: function() {
			var self = this;
			requestAnimationFrame(function() {
				self.animate();
			});
			//controls.update();
			Facade_engine.ControlsUpdate();

			if(planets.length) {
				for(var i = 0; i < planets.length; i++) {
					planets[i].draw();
				}
			}

			this.render();

		},
		onWindowResize: function() {
			Facade_engine.CameraAspect();
			Facade_engine.RendererSetsize();

		},
		render: function() {
			Facade_engine.RendererRender();
			Facade_engine.StatsUpdate();
		}
	};
}());