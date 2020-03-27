import * as THREE from 'three';

class Particle extends THREE.Mesh {
    constructor({ radius, density, heat, universe }){
        const mass = density * 4/3 * Math.PI * radius ** 3;

        const geometry = new THREE.SphereGeometry(radius, 30, 30);
        const material = new THREE.MeshLambertMaterial({color: 'blue', emissiveIntensity: 10});
        super(geometry, material);
            
        this.siblings = universe.scene.children
        this.universe = universe;
        this.universe.totalMass += this.mass

        this.radius = radius
        this.mass = mass;
        this.density = density;
        this.acceleration = new THREE.Vector3();
        this.velocity = new THREE.Vector3(
            heat*(Math.random() - Math.random()),
            heat*(Math.random() - Math.random()),
            heat*(Math.random() - Math.random()),
        )
    }

    animate() {
        this.siblings.forEach(p2 => {
            if (this.uuid !== p2.uuid) {
                let d = this.position.distanceTo(p2.position)
                if (d <= this.radius + p2.radius) {
                    this.mass > p2.mass ? this.absorb(p2) : p2.absorb(this)
                } else {
                    this.gravitate(p2)
                }
            }
        });
    }

    absorb(p2) {
        let newMass = this.mass + p2.mass;
        if (newMass > this.universe.n/5 * this.universe.size * this.universe.density && !this.sun) {
            let light = new THREE.PointLight({
                color: 'yellow',
                intensity: 0.001,
                // distance: 2,
                decay: 2
            });
            this.add(light);
            this.material.emissive.set('yellow')
            this.density *= 1/4;
            this.sun = true
            let canvas = document.getElementsByTagName('canvas')
            canvas[0].classList.add('light')
        }
        
        let newVelocity = new THREE.Vector3(
            (this.velocity.x * this.mass + p2.velocity.x * p2.mass) / newMass,
            (this.velocity.y * this.mass + p2.velocity.y * p2.mass) / newMass,
            (this.velocity.z * this.mass + p2.velocity.z * p2.mass) / newMass
        );

        let newPos = new THREE.Vector3(
            (this.position.x * this.mass + p2.position.x * p2.mass) / newMass,
            (this.position.y * this.mass + p2.position.y * p2.mass) / newMass,
            (this.position.z * this.mass + p2.position.z * p2.mass) / newMass
        );
            
        this.position.multiplyScalar(0)
        this.position.add(newPos);
        this.velocity = newVelocity
        
        let newRadius = (3 * newMass/4/this.density/Math.PI) ** (1/3)
        this.scale.x *= newRadius/this.radius
        this.scale.y *= newRadius/this.radius
        this.scale.z *= newRadius/this.radius
        
        this.radius = newRadius;
        this.mass = newMass;
        this.universe.scene.remove(p2)
        this.move();
    }

    gravitate(p2) {
        let force = new THREE.Vector3().subVectors(this.position, p2.position);
        let d = force.length();
        if (d === 0) return;
        let g = this.universe.gravity
        let dir = force.normalize();
        let strength = - (g * this.mass * p2.mass) / (d * d);   

        force = dir.multiplyScalar(strength);
        this.applyForce(force, -1);
        this.accelerate();
        this.move();
    }

    applyForce(force, dir) {
        this.acceleration = (force.multiplyScalar(dir/this.mass))
    }

    accelerate() {
        this.velocity.add(this.acceleration);
        this.acceleration.multiplyScalar(0);
    }
    
    move() {
        this.position.add(this.velocity);
    }

}

export default Particle;