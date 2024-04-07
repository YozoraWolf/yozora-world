import './style.css';

import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import CannonDebugger from 'cannon-es-debugger';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { SceneManager } from './src/classes/SceneManager';

import { Controller } from './src/classes/Controller';

import { Object } from './src/classes/Object';
import { Skybox } from './src/classes/Skybox';


export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(30);
camera.position.setX(-3);

SceneManager.init(scene, camera);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#game') as HTMLCanvasElement,
});

const physicsWorld = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.82, 0),
});

const groundBody = new CANNON.Body({
    type: CANNON.Body.STATIC,
    shape: new CANNON.Plane(),
});
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
physicsWorld.addBody(groundBody);

renderer.render(SceneManager.getScene(), SceneManager.getCamera());

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const controlsgridHelper = new OrbitControls(camera, renderer.domElement);

// Initialize cannon-es-debugger
const cannonDebugger = CannonDebugger(scene, physicsWorld);

// console.log(SceneManager.getScene());

window.onresize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    physicsWorld.step(1 / 60);
    cannonDebugger.update();

    if (Controller.getControllers().length > 0)
        Controller.getControllers()[0]?.update();

    controls.update();
    SceneManager.updateItemsWithRigidBodies();
    renderer.render(SceneManager.getScene(), SceneManager.getCamera());
}

animate();

// Test


const pointLight = new THREE.PointLight(0xffffff, 30, 100);
pointLight.intensity = 30;
pointLight.position.set(0, 10, 0);

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.intensity = 0.0;
scene.add(ambientLight);


// Debug
const pointLightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);

const box = new Object(new THREE.BoxGeometry(1, 1, 1), 0x00ff00, 1);
Controller.addController(new Controller(box));
box.addToPhysicsWorld(physicsWorld);
SceneManager.addItem(ambientLight);
SceneManager.addItem(pointLight);
SceneManager.addItem(new Skybox(100, "/starry.png"));
SceneManager.addItem(box);
