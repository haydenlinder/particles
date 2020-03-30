import * as THREE from 'three';
import * as POSTPROCESSING from 'postprocessing';

class Particle extends THREE.Mesh {
    constructor({ radius, density, heat, universe }){
        const mass = density * 4/3 * Math.PI * radius ** 3;
        const geometry = new THREE.SphereGeometry(radius, 30, 30);
        const material = new THREE.MeshPhongMaterial({ color: 0x33F9FF, shininess: 0})//, emissiveIntensity: 10});
        super(geometry, material);
        
        this.siblings = universe.scene.children
        this.universe = universe;
        this.universe.totalMass += mass

        this.mass = mass;
        this.radius = radius
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
                this.updateMass()
                p2.updateMass()
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
        if (p2.sun) {
            p2.godraysEffect.dispose();
            // this.universe.view.composer.passes = [];
            this.godraysEffect = new POSTPROCESSING.GodRaysEffect(this.universe.view.camera, this, {
                resolutionScale: 1,
                density: 1.5,
                decay: 0.95,
                weight: 0.1,
                samples: 100
            })
            let effectPass = new POSTPROCESSING.EffectPass(this.universe.view.camera, this.godraysEffect);
            effectPass.renderToScreen = true

            effectPass.uniforms = this.universe.suns
            this.universe.view.composer.addPass(effectPass);
        }
        let newMass = this.mass + p2.mass;
        
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
        this.updateMass();
        p2.updateMass();
        let force = new THREE.Vector3().subVectors(this.position, p2.position);
        let d = force.length();
        if (d === 0) return;
        let g = this.universe.gravity * -0.0000000000667408
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
    
    updateMass() {
        if (this.sun) {
            this.density = this.universe.density/4
        } else {
            this.density = this.universe.density
        } if (this.mass > 1000000) {//this.universe.totalMass/3){
            if (!this.sun) {
                this.density *= 1 / 4;
                this.material = new THREE.MeshBasicMaterial({ color: 'yellow' })

                let light = new THREE.PointLight({
                    color: 'yellow',
                    distance: 2,
                    decay: 2
                });
                this.add(light);

                let canvas = document.getElementById('canvas')
                canvas.classList.add('light')

                this.godraysEffect = new POSTPROCESSING.GodRaysEffect(this.universe.view.camera, this, {
                    resolutionScale: 1,
                    density: 1.5,
                    decay: 0.95,
                    weight: 0.1,
                    samples: 100
                })
                this.godraysEffect.bur = true;
                let effectPass = new POSTPROCESSING.EffectPass(this.universe.view.camera, this.godraysEffect);
                effectPass.renderToScreen = true

                effectPass.uniforms = this.universe.suns
                this.universe.view.composer.addPass(effectPass);

                this.sun = true
                this.universe.suns += 1;
            }
            this.children[0].intensity = 0.0000005 * this.mass;
        }
    }
}

export default Particle;