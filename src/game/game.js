import Particle from '../models/particle'

class Game {
    constructor({ n, size, heat, spread, distance, gravity }) {
        this.gravity = gravity;
        this.scene = new THREE.Scene();
        for (let i = 0; i < n; i++) {
            let particle = new Particle({ size: size, heat: heat });
            particle.position.x = 2*spread*(Math.random() - Math.random());
            particle.position.y = spread*(Math.random() - Math.random());
            particle.position.z = spread*(Math.random() - Math.random());
            this.scene.add(particle);
        }

        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            50000
        );
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        this.camera.position.z = distance;
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this.renderer.domElement);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        let g = this.gravity;

        for (let i = 0; i < this.scene.children.length; i++) {
            let p1 = this.scene.children[i];
            p1.rotateX(p1.velocity.x)
            p1.rotateY(p1.velocity.y)
            p1.rotateZ(p1.velocity.z)
            let sorted = this.scene.children.slice(i + 1).sort((p2, p3) => {
                let dx2 = p2.position.x - p1.position.x;
                let dy2 = p2.position.y - p1.position.y;
                let dz2 = p2.position.z - p1.position.z;
                let d2 = Math.sqrt(dx2 ** 2 + dy2 ** 2 + dz2 ** 2);
                let f2 = (g * p2.mass * p1.mass) / d2 ** 2
                
                let dx3 = p3.position.x - p1.position.x;
                let dy3 = p3.position.y - p1.position.y;
                let dz3 = p3.position.z - p1.position.z;
                let d3 = Math.sqrt(dx3 ** 2 + dy3 ** 2 + dz3 ** 2);
                let f3 = (g * p2.mass * p1.mass) / d3 ** 2

                return f2 - f3;
            })

            sorted.forEach(p2 => {
                let dx = p2.position.x - p1.position.x;
                let dy = p2.position.y - p1.position.y;
                let dz = p2.position.z - p1.position.z;

                let distance = Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2);

                let force;
                if (distance < 2*p1.radius + 2*p2.radius) {
                    let bigger = p1.mass >= p2.mass ? p1 : p2;
                    let smaller = p1.mass < p2.mass ? p1 : p2;
                    bigger.absorb(smaller);
                    this.scene.remove(smaller)
                } else {
                    force = {
                        x: (g * p1.mass * p2.mass) / dx ** 2,
                        y: (g * p1.mass * p2.mass) / dy ** 2,
                        z: (g * p1.mass * p2.mass) / dz ** 2,
                    };
                }
                p2.move(force, 1);
                p1.move(force, -1);
            });
        }

        this.renderer.render(this.scene, this.camera);
    }
}

export default Game;