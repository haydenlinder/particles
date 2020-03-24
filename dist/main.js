/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game/game.js":
/*!**************************!*\
  !*** ./src/game/game.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models_particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/particle */ \"./src/models/particle.js\");\n\n\nclass Game {\n    constructor() {\n        this.particles = []\n        for (let i = 0; i < 100; i++) {\n            let particle = new _models_particle__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n            particle.position.x = 5 * (Math.random() - Math.random());\n            particle.position.y = 5 * (Math.random() - Math.random());\n            particle.position.z = 5 * (Math.random() - Math.random());\n            this.particles.push(particle);\n        }\n\n        this.scene = new THREE.Scene();\n        this.camera = new THREE.PerspectiveCamera(\n            75,\n            window.innerWidth / window.innerHeight,\n            0.1,\n            1000\n        );\n        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });\n\n        this.camera.position.z = 5\n        this.renderer.setSize(window.innerWidth, window.innerHeight);\n\n        document.body.appendChild(this.renderer.domElement);\n\n        this.scene.add(...this.particles);\n    }\n\n    animate() {\n        requestAnimationFrame(this.animate.bind(this));\n        this.particles.forEach(p1 => {\n            let f = { x: 0, y: 0, z: 0 };\n            this.particles.forEach(p2 => {\n                f.x += 1/((p2.x - p1.x)^2)\n                f.y += 1/((p2.y - p1.y)^2)\n                f.z += 1/((p2.z - p1.z)^2)\n            })\n            p1.animate(f)\n        })\n\n        this.renderer.render(this.scene, this.camera);\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack:///./src/game/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game/game */ \"./src/game/game.js\");\n\n\nconst game = new _game_game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\nconst onWindowResize = () => {\n    game.camera.aspect = window.innerWidth / window.innerHeight;\n    game.camera.updateProjectionMatrix();\n    game.renderer.setSize(window.innerWidth, window.innerHeight)\n}\n\nwindow.addEventListener('resize', onWindowResize, false)\ngame.animate();\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/models/particle.js":
/*!********************************!*\
  !*** ./src/models/particle.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Particle extends THREE.Mesh {\n    constructor(){\n        const geometry = new THREE.SphereGeometry(0.1, 7, 3);\n        const material = new THREE.MeshBasicMaterial();\n        super(geometry, material)\n        const vertices = \n            new THREE.LineSegments(geometry, \n                new THREE.LineBasicMaterial({color: 'black', linewidth: 1})\n            )\n        this.add(vertices)\n    }\n\n    animate() {\n        this.rotateY(0.05)\n        this.rotateX(0.05)\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Particle);\n\n//# sourceURL=webpack:///./src/models/particle.js?");

/***/ })

/******/ });