import Particle from '../models/particle'

class Game {
    constructor({ n, size, heat, spread, distance, gravity }) {
        this.gravity = gravity;
        this.particles = [];
        for (let i = 0; i < n; i++) {
            let particle = new Particle({ size: size, heat: heat });
            particle.position.x = spread*(Math.random() - Math.random());
            particle.position.y = spread*(Math.random() - Math.random());
            particle.position.z = spread*(Math.random() - Math.random());
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

        this.camera.position.z = distance;
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this.renderer.domElement);
        this.scene.add(...this.particles);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        let g = this.gravity;

        // sorted = 

        for (let i = 0; i < this.particles.length; i++) {
            let p1 = this.particles[i]
            for (let j = i + 1; j < this.particles.length; j++) {
                let p2 = this.particles[j];
                let force = { x: 0, y: 0, z: 0 };

                force.x = g * p1.m * p2.m / ((p2.position.x - p1.position.x) ** 2);
                force.y = g * p1.m * p2.m / ((p2.position.y - p1.position.y) ** 2);
                force.z = g * p1.m * p2.m / ((p2.position.z - p1.position.z) ** 2);

                p2.animate(force, 1);
                p1.animate(force, -1);
            }
        }


        // this.particles.forEach((p2, j) => {
        //     if (j !== 0) {
        //         force.x += g*p1.m*p2.m/((p2.position.x - p1.position.x)**2);
        //         force.y += g*p1.m*p2.m/((p2.position.y - p1.position.y)**2);
        //         force.z += g*p1.m*p2.m/((p2.position.z - p1.position.z)**2);
        //         p1.animate(force, -1);
        //         p2.animate(force, 1);
        //     }
        // })

        this.renderer.render(this.scene, this.camera);
    }
}

export default Game;