import View from './view';

const view = new View({
    distance: 200, 
    gameOptions: {
        n: 100,
        size: 1,
        spread: 100,
        heat: 0,
        gravity: -0.00000667408,
        density: 5520,
    }
});

view.animate();


