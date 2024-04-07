import * as THREE from 'three';

export class Skybox extends THREE.Mesh {
    constructor(radius: number, texture: string) {
        const skyGeometry = new THREE.SphereGeometry(radius, 32, 32);
        
        const skyMaterial = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(texture),
            side: THREE.BackSide // Render on the inside of the sphere
        });

        super(skyGeometry, skyMaterial);
    }
}
