import Game from './game/game';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"


class View {
    constructor({ distance, gameOptions }) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            300000
        );
        this.camera.position.z = distance;
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true,
            physicallyCorrectLights: true,
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.game = new Game({...gameOptions, scene: this.scene});
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        
        document.body.appendChild(this.renderer.domElement);

    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        window.addEventListener('resize', this.onWindowResize(), false);
        this.renderer.render(this.scene, this.camera);
    }
}

export default View;

