class Particle extends THREE.Mesh {
    constructor({ size, heat }){
        const mass = size * Math.random()**4;
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
        
        this.radius = radius
        this.mass = mass;
        this.velocity = { 
            x: heat*(Math.random() - Math.random()),
            y: heat*(Math.random() - Math.random()),
            z: heat*(Math.random() - Math.random()),
        }
    }

    absorb(particle) {
        this.mass += particle.mass;

        let scale = particle.mass / this.mass;
        this.scale.x += scale;
        this.scale.y += scale;
        this.scale.z += scale;

        let e = particle.mass / (this.mass + particle.mass);
        let velocity = {
            x: particle.velocity.x * e,
            y: particle.velocity.y * e,
            z: particle.velocity.z * e,
        }

        this.velocity.y = velocity.y;
        this.velocity.x = velocity.x;
        this.velocity.z = velocity.z;
    }

    move(force = { x:0, y:0, z:0 }, s) {
        // if (this.position.x > 10*window.innerWidth){
        //     this.position.x = -10*window.innerWidth;
        // }
        // if (this.position.x < -10*window.innerWidth){
        //     this.position.x = 10*window.innerWidth;
        // }
        // if (this.position.y > 10*window.innerHeight){
        //     this.position.y = -10*window.innerHeight;
        // }
        // if (this.position.y < -10*window.innerHeight){
        //     this.position.y = 10*window.innderHeight;
        // }
        // if (this.position.z > 10000){
        //     // this.position.z = 0;
        // }
        // if (this.position.z < 0){
        //     // this.position.z = 10000;
        // }

        this.velocity.x += s*force.x/this.mass;
        this.velocity.y += s*force.y/this.mass;
        this.velocity.z += s*force.z/this.mass;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.position.z += this.velocity.z;
        // this.rotateX(this.velocity.x);
        // this.rotateY(this.velocity.y);
        // this.rotateZ(this.velocity.z);
    }
}

export default Particle;