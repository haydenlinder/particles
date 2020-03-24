import Game from './game/game'

const game = new Game({
    n: 1000, 
    size: 1,
    spread: 50,
    distance: 50,
    heat: 0.0001,
    gravity: -0.0000000000667408
});

game.animate();
const onWindowResize = () => {
    game.camera.aspect = window.innerWidth / window.innerHeight;
    game.camera.updateProjectionMatrix();
    game.renderer.setSize(window.innerWidth, window.innerHeight)
}

window.addEventListener('resize', onWindowResize, false)

