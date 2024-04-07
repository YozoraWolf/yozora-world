import * as THREE from 'three';
import { Object } from './Object';

export namespace SceneManager {
    let _scene: THREE.Scene | null = null;
    let _camera: THREE.Camera | null = null;
    let _lighting: any;

    export function init(scene: THREE.Scene, camera: THREE.Camera) {
        _scene = scene;
        _camera = camera;
    }

    export function getScene(): THREE.Scene {
        if (!_scene) {
            _scene = new THREE.Scene();
        }
        return _scene;
    }

    export function setScene(scene: THREE.Scene) {
        _scene = scene;
    }

    export function getCamera(): THREE.Camera {
        if (!_camera) {
            _camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        }
        return _camera;
    }

    export function setCamera(camera: THREE.Camera) {
        _camera = camera;
    }

    export function getLighting() {
        return _lighting;
    }

    export function setLighting(lighting: any) {
        _lighting = lighting;
    }

    export function addItem(item: THREE.Object3D) { 
        if (_scene) { 
            _scene.add(item); 
        } 
    }

    export function removeItem(item: THREE.Object3D) { 
        if (_scene) { 
            _scene.remove(item); 
        } 
    }

    export function getItemsFromScene(): THREE.Object3D[] { 
        if (_scene) {
            return _scene.children; 
        } 
        return [];
    }

    export function updateItemsWithRigidBodies() {
        if (_scene) {
            _scene.traverse((object) => {
                if (object instanceof Object) {
                    object.update();
                }
            });
        }
    }
}