import Particle from '../models/particle'
import * as THREE from 'three';

class Game {
    constructor({ n, size, heat, density, spread, gravity, scene }) {
        this.gravity = gravity;
        this.scene = scene;
        this.density = density;
        this.size = size;
        this.totalMass = 0
        this.n = n;
        for (let i = 0; i < n; i++) {
            let particle = new Particle({ 
                radius: size* (Math.random()),
                density: density,
                heat: heat,
                game: this 
            });
            particle.position.x = 5*spread *(Math.random() - Math.random()) //(Math.random() + Math.random()*10) * (-1) ** (Math.floor(Math.random() + 1.5)%2);
            particle.position.y = 3*spread *(Math.random() - Math.random()) //(Math.random() + Math.random()*10) * (-1) ** (Math.floor(Math.random() + 1.5)%2);
            particle.position.z = 4*spread *(Math.random() - Math.random()) //(Math.random() + Math.random()*10) * (-1) ** (Math.floor(Math.random() + 1.5)%2);

            this.scene.add(particle);
        }
    }
}

export default Game;