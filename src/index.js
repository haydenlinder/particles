import View from './view';

const view = new View({
    distance: 10000, 
    gameOptions: {
        n: 500,
        size: 1,
        spread: 5000,
        heat: 1,
        gravity: -0.0000000000667408,
    }
});

view.animate();


