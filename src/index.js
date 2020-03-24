import Game from './game/game'

const game = new Game({
    n: 1000 , 
    size: 10,
    spread: 500,
    distance: 1000,
    heat: 0,
    gravity: -0.0000000000667408
});

game.animate();
const onWindowResize = () => {
    game.camera.aspect = window.innerWidth / window.innerHeight;
    game.camera.updateProjectionMatrix();
    game.renderer.setSize(window.innerWidth, window.innerHeight)
}

window.addEventListener('resize', onWindowResize, false)

