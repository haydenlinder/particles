import View from './view';
import * as dat from 'dat.gui'

let options = {
    distance: 200,
    universeOptions: {
        n: 250,
        size: 1,
        heat: 0.005,
        spread: 20,
        density: 5520,
        gravity: 3000,
    }
}

const view = new View({
    distance: options.distance, 
    universeOptions: options.universeOptions
});

const gui = new dat.GUI();
gui.domElement.id = 'gui';

// open gui controls on page load

// document.addEventListener('DOMContentLoaded', () => {
//     let folders = document.getElementsByTagName('ul')
//     for (let i = 0; i < folders.length; i++) {
//         folders[i].classList.remove('closed')
//     }
// })

gui.close();

let f1 = gui.addFolder('View (you can also zoom by scrolling)')
f1.add(view.camera.position, 'z', 0, 1000)

let f2 = gui.addFolder('Universe');
f2.add(view.universe, 'n', 0, 400)
f2.add(view.universe, 'size', 1, 5)
f2.add(view.universe, 'heat', 0, 0.1)
f2.add(view.universe, 'spread', 1, 1000)
f2.add(view.universe, 'density', 1, 9000)
f2.add(view.universe, 'gravity', 0, 10000).step(1)

let f3 = gui.addFolder('Play')
f3.add(view, 'restart')
f3.add(view, 'pause')


view.animate();







