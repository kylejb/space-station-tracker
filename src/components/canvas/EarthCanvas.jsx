import React, { Component } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './style.scss';


class EarthCanvas extends Component {
    constructor(selector) {
        super(selector)
        
		this.selector = selector;
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.frameEvent = new Event('frame');

		this.textureLoader = new THREE.TextureLoader();
	}

	setScene() {
		this.scene = new THREE.Scene();
		this.scenary = new THREE.Object3D();

		this.scene.add(this.scenary);
	}

	setCamera() {
		this.camera = new THREE.PerspectiveCamera(50, this.width/this.height, 1, 20000);
		this.camera.position.y = 25;
		this.camera.position.z = 300;
	}

	set_Renderer() {
		this._renderer = new THREE.WebGL_Renderer({
			antialias: true
		});
		this._renderer.setSize(this.width, this.height);
		this.canvas = document.querySelector(this.selector).appendChild(this._renderer.domElement);
	}

	setControls() {
		this.controls = new OrbitControls(this.camera, this.canvas);
		this.controls.maxDistance = 500;
		this.controls.minDistance = 200;
	}

	addHelpers() {
		this.axes = new THREE.AxesHelper(500);
		this.scenary.add(this.axes);
	}

	addLights() {
		this.ambientLight = new THREE.AmbientLight(0x555555);
		this.directionalLight = new THREE.DirectionalLight(0xffffff);
		this.directionalLight.position.set(10, 0, 10).normalize();

		this.scenary.add(this.ambientLight);
		this.scenary.add(this.directionalLight);
	}

	_render() {
		this.renderer._render(this.scene, this.camera);
		this.canvas.dispatchEvent(this.frameEvent);
		this.frameRequest = window.requestAnimationFrame(this._render.bind(this));
	}

	destroy() {
		window.cancelAnimationFrame(this.frameRequest);
		this.scene.children = [];
		this.canvas.remove();
	}

	addSky() {
		let radius = 400,
			segments = 50;

		this.skyGeometry = new THREE.SphereGeometry(radius, segments, segments);
		this.skyMaterial = new THREE.MeshPhongMaterial({
			color: 0x666666,
			side: THREE.BackSide,
			shininess: 0
		});
		this.sky = new THREE.Mesh(this.skyGeometry, this.skyMaterial);

		this.scenary.add(this.sky);

		this.loadSkyTextures();
	}

	loadSkyTextures() {
		this.textureLoader.load('https://acaua.gitlab.io/webgl-with-threejs/img/textures/earth/sky-texture.jpg', texture => {
			this.skyMaterial.map = texture;
			this.skyMaterial.needsUpdate = true;
		});
	}

	addEarth() {
		let radius = 100,
			segments = 50;

		this.earthGeometry = new THREE.SphereGeometry(radius, segments, segments);
		this.earthMaterial = new THREE.ShaderMaterial({
			bumpScale: 5,
			specular: new THREE.Color(0x333333),
			shininess: 50,
			uniforms: {
				sunDirection: {
					value: new THREE.Vector3(1, 1, .5)
				},
				dayTexture: {
					value: this.textureLoader.load('https://acaua.gitlab.io/webgl-with-threejs/img/textures/earth/earth-texture.jpg')
				},
				nightTexture: {
					value: this.textureLoader.load('https://acaua.gitlab.io/webgl-with-threejs/img/textures/earth/earth-night.jpg')
				}
			},
			vertexShader: this.dayNightShader.vertex,
			fragmentShader: this.dayNightShader.fragment
		});
		this.earth = new THREE.Mesh(this.earthGeometry, this.earthMaterial);

		this.scenary.add(this.earth);

		this.loadEarthTextures();
		// this.addAtmosphere();
	}

	loadEarthTextures() {
		this.textureLoader.load('https://acaua.gitlab.io/webgl-with-threejs/img/textures/earth/earth-texture.jpg', texture => {
			this.earthMaterial.map = texture;
			this.earthMaterial.needsUpdate = true;
		});
		this.textureLoader.load('https://acaua.gitlab.io/webgl-with-threejs/img/textures/earth/earth-bump.jpg', texture => {
			this.earthMaterial.bumpMap = texture;
			this.earthMaterial.needsUpdate = true;
		});
		this.textureLoader.load('https://acaua.gitlab.io/webgl-with-threejs/img/textures/earth/earth-specular.jpg', texture => {
			this.earthMaterial.specularMap = texture;
			this.earthMaterial.needsUpdate = true;
		});
	}

	// addAtmosphere() {
	// 	this.innerAtmosphereGeometry = this.earthGeometry.clone();
	// 	this.innerAtmosphereMaterial = THREEx.createAtmosphereMaterial();
	// 	this.innerAtmosphereMaterial.uniforms.glowColor.value.set(0x88ffff);
	// 	this.innerAtmosphereMaterial.uniforms.coeficient.value = 1;
	// 	this.innerAtmosphereMaterial.uniforms.power.value = 5;
	// 	this.innerAtmosphere = new THREE.Mesh(this.innerAtmosphereGeometry, this.innerAtmosphereMaterial);
	// 	this.innerAtmosphere.scale.multiplyScalar(1.008);

	// 	this.outerAtmosphereGeometry = this.earthGeometry.clone();
	// 	this.outerAtmosphereMaterial = THREEx.createAtmosphereMaterial();
	// 	this.outerAtmosphereMaterial.side = THREE.BackSide;
	// 	this.outerAtmosphereMaterial.uniforms.glowColor.value.set(0x0088ff);
	// 	this.outerAtmosphereMaterial.uniforms.coeficient.value = .68;
	// 	this.outerAtmosphereMaterial.uniforms.power.value = 10;
	// 	this.outerAtmosphere = new THREE.Mesh(this.outerAtmosphereGeometry, this.outerAtmosphereMaterial);
	// 	this.outerAtmosphere.scale.multiplyScalar(1.06);

	// 	this.earth.add(this.innerAtmosphere);
	// 	this.earth.add(this.outerAtmosphere);
	// }

	get dayNightShader() {
		return {
			vertex: `
				varying vec2 vUv;
				varying vec3 vNormal;

				void main() {
					vUv = uv;
					vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
					vNormal = normalMatrix * normal;
					gl_Position = projectionMatrix * mvPosition;
				}
			`,
			fragment: `
				uniform sampler2D dayTexture;
				uniform sampler2D nightTexture;

				uniform vec3 sunDirection;

				varying vec2 vUv;
				varying vec3 vNormal;

				void main(void) {
					vec3 dayColor = texture2D(dayTexture, vUv).rgb;
					vec3 nightColor = texture2D(nightTexture, vUv).rgb;

					float cosineAngleSunToNormal = dot(normalize(vNormal), sunDirection);

					cosineAngleSunToNormal = clamp(cosineAngleSunToNormal * 5.0, -1.0, 1.0);

					float mixAmount = cosineAngleSunToNormal * 0.5 + 0.5;

					vec3 color = mix(nightColor, dayColor, mixAmount);

					gl_FragColor = vec4(color, 1.0);
				}
			`
		}
	}

	animate() {
		this.canvas.addEventListener('frame', () => {
			this.scenary.rotation.x += 0.0001;
			this.scenary.rotation.y -= 0.0005;
		});
	}

	init() {
		this.setScene();
		this.setCamera();
		this.set_Renderer();
		// this.setControls();
		this.addLights();
		this._render();
		this.addSky();
		this.addEarth();
		this.animate();
	}
}

export const earthCanvas = new EarthCanvas('#canvas');
earthCanvas.init();
