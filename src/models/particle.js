class Particle extends THREE.Mesh {
    constructor(){
        const geometry = new THREE.SphereGeometry(0.1, 7, 3);
        const material = new THREE.MeshBasicMaterial();
        super(geometry, material)
        const vertices = 
            new THREE.LineSegments(geometry, 
                new THREE.LineBasicMaterial({color: 'black', linewidth: 1})
            )
        this.add(vertices)
    }

    animate() {
        this.rotateY(0.05)
        this.rotateX(0.05)
    }
}

export default Particle;