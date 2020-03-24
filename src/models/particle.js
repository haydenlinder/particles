class Particle extends THREE.Mesh {
    constructor({ size, heat }){
        const m = size * Math.random()**2;
        const geometry = new THREE.SphereGeometry(m, 7, 3);
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

        this.m = m;
        this.velocity = { 
            x: heat*(Math.random() - Math.random()),
            y: heat*(Math.random() - Math.random()),
            z: heat*(Math.random() - Math.random()),
        }
    }

    animate(force, s) {
        this.velocity.x += s*force.x/this.m;
        this.velocity.y += s*force.y/this.m;
        this.velocity.z += s*force.z/this.m;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.position.z += this.velocity.z;
        // this.rotateX(this.velocity.x);
        // this.rotateY(this.velocity.y);
        // this.rotateZ(this.velocity.z);
    }
}

export default Particle;