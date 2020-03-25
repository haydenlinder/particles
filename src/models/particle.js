class Particle extends THREE.Mesh {
    constructor({ size, heat, game }){
        const mass = size* Math.random()**20;
        const radius = 100*mass**(1/3);
        const geometry = new THREE.SphereGeometry(radius, 10, 10);
        const material = new THREE.MeshBasicMaterial();
        super(geometry, material);
        const vertices =
        new THREE.LineSegments(
            geometry, 
            new THREE.LineBasicMaterial({
                color: 'black', linewidth: 1
            })
            );
        this.add(vertices);
            
        this.siblings = game.scene.children
        this.game = game;
        this.radius = radius
        this.mass = mass;
        this.velocity = { 
            x: heat*(Math.random() - Math.random()),
            y: heat*(Math.random() - Math.random()),
            z: heat*(Math.random() - Math.random()),
        }
        setInterval(() => this.animate(), 1)
    }

    absorb(particle) {
        this.mass += particle.mass;

        let scale = particle.mass / this.mass;
        this.scale.x += scale;
        this.scale.y += scale;
        this.scale.z += scale;

        let e = particle.mass / (this.mass + particle.mass);
        let velocity = {
            x: e*(particle.mass * particle.velocity.x + this.mass * this.velocity.x),
            y: e*(particle.mass * particle.velocity.y + this.mass * this.velocity.y),
            z: e*(particle.mass * particle.velocity.z + this.mass * this.velocity.z),

        }
        this.velocity.y = velocity.y;
        this.velocity.x = velocity.x;
        this.velocity.z = velocity.z;

        this.game.scene.remove(particle)
    }

    nearest() {
        let g = this.game.gravity;
        return this.siblings.sort((p2, p3) => {

            let dx2 = p2.position.x - this.position.x;
            let dy2 = p2.position.y - this.position.y;
            let dz2 = p2.position.z - this.position.z;
            let d2 = Math.sqrt(dx2 ** 2 + dy2 ** 2 + dz2 ** 2);
            let f2 = (g * p2.mass * this.mass) / d2 ** 2

            let dx3 = p3.position.x - this.position.x;
            let dy3 = p3.position.y - this.position.y;
            let dz3 = p3.position.z - this.position.z;
            let d3 = Math.sqrt(dx3 ** 2 + dy3 ** 2 + dz3 ** 2);
            let f3 = (g * p2.mass * this.mass) / d3 ** 2

            return f2 - f3;
        }).slice(1, 5);
    }

    animate() {
        // this.rotate();
        this.nearest().forEach(p2 => {
            let dx = p2.position.x - this.position.x;
            let dy = p2.position.y - this.position.y;
            let dz = p2.position.z - this.position.z;
            
            let distance = Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2);
            debugger
            let force;

            if (distance <  this.radius + p2.radius) {
                let bigger = this.mass >= p2.mass ? this : p2;
                let smaller = this.mass < p2.mass ? this : p2;
                bigger.absorb(smaller);
                debugger
            } else {
                let g = this.game.gravity
                force = {
                    x: (g * this.mass * p2.mass) / dx, //** 2,
                    y: (g * this.mass * p2.mass) / dy, //** 2,
                    z: (g * this.mass * p2.mass) / dz, //** 2,
                };
            }
            debugger
            this.move(force, -1)
            p2.move(force, 1)
        });

    }
    
    move(force = { x: 0, y: 0, z: 0 }, dir) {
        debugger
        this.velocity.x += dir*force.x/this.mass;
        this.velocity.y += dir*force.y/this.mass;
        this.velocity.z += dir*force.z/this.mass;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.position.z += this.velocity.z;
        debugger
    }

    rotate() {
        this.rotateX(this.velocity.x);
        this.rotateY(this.velocity.y);
        this.rotateZ(this.velocity.z);
    }
}

export default Particle;