class Particle extends THREE.Mesh {
    constructor({ size, heat }){
        const mass = size * Math.random()**2;
        const radius = 20*mass
        const geometry = new THREE.SphereGeometry(radius, 7, 3);
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

    animate(force = { x:0, y:0, z:0 }, s) {
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