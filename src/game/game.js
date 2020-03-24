import Particle from '../models/particle'

class Game {
    constructor({ n, size, heat, spread, distance, gravity }) {
        this.gravity = gravity;
        this.particles = [];
        for (let i = 0; i < n; i++) {
            let particle = new Particle({ size: size, heat: heat });
            particle.position.x = 2*spread*(Math.random() - Math.random());
            particle.position.y = spread*(Math.random() - Math.random());
            particle.position.z = spread*(Math.random() - Math.random());
            this.particles.push(particle);
        }

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            10000
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

                let dx = p2.position.x - p1.position.x;
                let dy = p2.position.y - p1.position.y;
                let dz = p2.position.z - p1.position.z;

                let distance = Math.sqrt(dx**2 + dy**2 + dz**2);

                let force;
                if ( distance < p1.radius + p2.radius ) {
                    let bigger = p1.mass >= p2.mass ? p1 : p2;
                    let smaller = p1.mass < p2.mass ? p1 : p2;
                    bigger.mass += smaller.mass;
                    
                    let scale = smaller.mass/bigger.mass
                    bigger.scale.x += scale;
                    bigger.scale.y += scale;
                    bigger.scale.z += scale;
                    
                    let e = smaller.mass / (p1.mass + p2.mass)
                    
                    let velocity  = {
                        x: smaller.velocity.x * e,
                        y: smaller.velocity.y * e,
                        z: smaller.velocity.z * e,
                    }
                    
                    bigger.velocity.y = velocity.y;
                    bigger.velocity.x = velocity.x;
                    bigger.velocity.z = velocity.z;

                    this.scene.remove(smaller)
                } else {
                    force = { 
                        x: (g * p1.mass * p2.mass) / dx **2,
                        y: (g * p1.mass * p2.mass) / dy **2,
                        z: (g * p1.mass * p2.mass) / dz **2,
                    };
                }
                p2.animate(force, 1);
                p1.animate(force, -1);
                
            }
        }

        this.renderer.render(this.scene, this.camera);
    }
}

export default Game;