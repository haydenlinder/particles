import Universe from './universe/universe';
import * as THREE from 'three';
import * as POSTPROCESSING from 'postprocessing';

import * as OrbitControls from "three-orbitcontrols";
// import FlyControls from './util/fly_controls'
// const FlyControls = import('./util/fly_controls')(THREE)
require('./util/fly_controls')
import * as dat from 'dat.gui';

class View {
    constructor({ distance, universeOptions }) {
        this.distance = distance;
        this.universeOptions = universeOptions;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            300000
        );
        this.camera.position.z = distance;
        this.paused = false;

        this.canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('webgl');
        ctx.clearColor(0, 0, 0.1, 0);
        this.canvas.width = canvas.clientWidth;
        this.canvas.height = canvas.clientHeight;
        
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: canvas,
            canvas: canvas,
            antialias: true,
            alpha: true,
            physicallyCorrectLights: true,
        });
        this.renderer.setViewport(0, 0, canvas.clientWidth, canvas.clientHeight);
        this.renderer.autoClear = false;

        this.composer = new POSTPROCESSING.EffectComposer(this.renderer);
        let renderPass = new POSTPROCESSING.RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        // this.flyControls = new THREE.FlyControls(
        //     this.camera, 
        //     this.renderer.domElement
        // );
        // this.flyControls.dragToLook = true;
        
        
        this.universe = new Universe({
            ...universeOptions, 
            scene: this.scene, 
            view: this
        });

        this.$real_framerate = $("#real_framerate");

        this.lastRendered = new Date();
        this.countFramesPerSecond = 0;
    }

    onWindowResize() {
        this.canvas.width = canvas.clientWidth;
        this.canvas.height = canvas.clientHeight;
        this.renderer.setViewport(0, 0, canvas.clientWidth, canvas.clientHeight);
        this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
        this.camera.updateMatrix();
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        window.addEventListener('resize', this.onWindowResize(), false);
        this.renderer.clear();
        this.renderer.clearDepth();
        this.render();
        if (this.composer) this.composer.render(0.1)//.forEach(composer => composer.render(0.1));
        if (this.flyControls) this.flyControls.update(1);
        this.renderer.render(this.scene, this.camera);
    }

    pause () {
        this.paused = this.paused ? false : true
    }

    restart() {
        this.scene.children = [];
        this.universe.populate();
        this.camera.position.multiplyScalar(0)
        this.camera.position.z = 200
        if (this.flyControls) this.flyControls.dispose();
        
        if (this.composer) this.composer.dispose();
        this.composer = new POSTPROCESSING.EffectComposer(this.renderer);
        let renderPass = new POSTPROCESSING.RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);

        // this.flyControls.dragToLook = true;
        document.getElementById('canvas').classList.remove('light')
    }

    render() {
        if (!this.paused) {

            let now = new Date();
            if (this.lastRendered && now.getMilliseconds() < this.lastRendered.getMilliseconds()) {
                this.$real_framerate.html(this.countFramesPerSecond);
                this.countFramesPerSecond = 1;
            } else {
                this.countFramesPerSecond += 1;
            }  
    
            this.universe.scene.children.forEach(child => {
                child.animate();
                child.updateMass();
            })
    
            this.lastRendered = new Date();
        }
    }
}

export default View;

