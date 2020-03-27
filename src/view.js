import Universe from './universe/universe';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"


class View {
    constructor({ distance, universeOptions }) {
        this.distance = distance;

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

        this.universe = new Universe({...universeOptions, scene: this.scene});
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        
        document.body.appendChild(this.renderer.domElement);


        ///////////////////////
        this.$real_framerate = $("#real_framerate");
        this.$framerate = $("#framerate");
        this.$framerate.bind("change keyup mouseup", function () {
            var v = parseInt(this.value);
            if (v > 0) {
                //options.framerate = v;
                renderInterval = 1000 / 100;
            }
        }).change();
        this.lastRendered = new Date();
        this.countFramesPerSecond = 0;
        /////////////////////////
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        window.addEventListener('resize', this.onWindowResize(), false);
        //////////////////////
        this.render();
        ///////////////////////
        this.renderer.render(this.scene, this.camera);
    }

    render() {
        ///////////////////////////
        let now = new Date();
        if (this.lastRendered && now.getMilliseconds() < this.lastRendered.getMilliseconds()) {
            this.$real_framerate.html(this.countFramesPerSecond);
            this.countFramesPerSecond = 1;
        } else {
            this.countFramesPerSecond += 1;
        }  

        this.universe.scene.children.forEach(child => {
            child.animate();
        })

        this.lastRendered = new Date();
    }
}

export default View;

