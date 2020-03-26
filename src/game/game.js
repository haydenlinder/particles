import Particle from '../models/particle'

class Game {
    constructor({ n, size, heat, spread, distance, gravity, scene }) {
        this.gravity = gravity;
        this.scene = scene
        for (let i = 0; i < n; i++) {
            let particle = new Particle({ size: size, heat: heat, game: this });
            particle.position.x = 2*spread*(Math.random() - Math.random());
            particle.position.y = spread*(Math.random() - Math.random());
            particle.position.z = spread*(Math.random() - Math.random());
            this.scene.add(particle);
        }

    }
}

export default Game;