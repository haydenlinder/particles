import Game from './game/game'

const game = new Game({
    n: 100, 
    size: 1,
    spread: 500,
    distance: 10000,
    heat: 0,
    gravity: -0.00667408
});

game.animate();
const onWindowResize = () => {
    game.camera.aspect = window.innerWidth / window.innerHeight;
    game.camera.updateProjectionMatrix();
    game.renderer.setSize(window.innerWidth, window.innerHeight)
}

window.addEventListener('resize', onWindowResize, false)

