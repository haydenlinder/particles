import View from './view';

const view = new View({
    distance: 100, 
    gameOptions: {
        n: 100,
        size: 1,
        spread: 30,
        heat: 0.005,
        gravity: -0.000000667408,
        density: 5520,
    }
});

view.animate();


