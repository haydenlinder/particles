import Particle from '../models/particle'

class Game {
    constructor() {
        this.particles = []
        for (let i = 0; i < 100; i++) {
            let particle = new Particle();
            particle.position.x = 5 * (Math.random() - Math.random());
            particle.position.y = 5 * (Math.random() - Math.random());
            particle.position.z = 5 * (Math.random() - Math.random());
            this.particles.push(particle);
        }

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        this.camera.position.z = 5
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this.renderer.domElement);

        this.scene.add(...this.particles);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.particles.forEach(p1 => {
            let f = { x: 0, y: 0, z: 0 };
            this.particles.forEach(p2 => {
                f.x += 1/((p2.x - p1.x)^2)
                f.y += 1/((p2.y - p1.y)^2)
                f.z += 1/((p2.z - p1.z)^2)
            })
            p1.animate(f)
        })

        this.renderer.render(this.scene, this.camera);
    }
}

export default Game;