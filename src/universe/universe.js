import Particle from '../models/particle'
import * as THREE from 'three';
import * as dat from 'dat.gui'

class Universe {
    constructor({ n, size, heat, density, spread, gravity, scene, view }) {
        this.n = n;
        this.size = size;
        this.scene = scene;
        this.heat = heat;
        this.spread = spread;
        this.density = density;
        this.gravity = gravity;
        this.view = view;

        this.totalMass = 0;

        this.populate();
  
    }

    defaults() {
        this.view.camera.position.z = 200
        this.n = 200
        this.size = 1
        this.heat = 0.005
        this.spread = 20
        this.density = 5520
        this.gravity = 3000
    }
    
    populate() {
        for (let i = 0; i < this.n; i++) {
            let particle = new Particle({ 
                radius: this.size * (Math.random() + 0.1)**10,
                density: this.density,
                heat: this.heat,
                universe: this 
            });
            particle.position.x = 8*this.spread *(Math.random() - Math.random())
            particle.position.y = 3*this.spread *(Math.random() - Math.random())
            particle.position.z = 4*this.spread *(Math.random() - Math.random())
    
            this.scene.add(particle);
        }
    }

    restart() {
        this.scene.children = [];
        this.populate();
        document.getElementById('canvas').classList.remove('light')
    }

}

export default Universe;