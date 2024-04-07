// TODO: Redo this whole class to load actual models and adapt them to the Object class

import * as THREE from 'three';

class ModelLoader {

    static loadCube() {
        const geometry = new THREE.BoxGeometry(10, 10, 10);
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        return new THREE.Mesh(geometry, material);
    }

    static loadModel(url) {
        return new Promise((resolve, reject) => {
            const loader = new THREE.GLTFLoader();
            loader.load(url, (data) => {
                resolve(data);
            }, null, (error) => {
                reject(error);
            });
        });
    }
}

export default ModelLoader;
