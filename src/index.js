import View from './view';

const view = new View({
    distance: 500, 
    universeOptions: {
        n: 500,
        size: 1,
        spread: 50,
        heat: 0.005,
        gravity: -0.000000667408,
        density: 5520,
    }
});

view.animate();


