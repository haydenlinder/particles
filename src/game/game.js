import Particle from '../models/particle'

class Game {
    constructor({ n, size, heat, spread, distance, gravity }) {
        this.gravity = gravity;
        this.scene = new THREE.Scene();
        for (let i = 0; i < n; i++) {
            // setTimeout(() => {
                let particle = new Particle({ size: size, heat: heat, game: this });
                particle.position.x = 2*spread*(Math.random() - Math.random());
                particle.position.y = spread*(Math.random() - Math.random());
                particle.position.z = spread*(Math.random() - Math.random());
                this.scene.add(particle);
            // },
            // i**100000)
        }

        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            300000
        );
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        this.camera.position.z = distance;
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this.renderer.domElement);
    }

    animate() {
        debugger
        requestAnimationFrame(this.animate.bind(this));
        // this.scene.children.forEach(child => child.animate());
        this.renderer.render(this.scene, this.camera);
    }
}

export default Game;