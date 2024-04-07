import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export class Box extends THREE.Mesh {
    private _rigidBody: CANNON.Body;

    constructor(width: number = 1, height: number = 1, depth: number = 1, color: number = 0x00ff00, mass: number = 1) {
        super(new THREE.BoxGeometry(width, height, depth), new THREE.MeshStandardMaterial({ color }));
        this._rigidBody = new CANNON.Body({
            mass: mass,
            position: new CANNON.Vec3(0, 4, 0),
            shape: new CANNON.Box(new CANNON.Vec3(width * 0.5, height * 0.5, depth * 0.5)),
        });
    }

    set rigidBody(rigidBody: CANNON.Body) {
        this._rigidBody = rigidBody;
    }

    get rigidBody(): CANNON.Body {
        return this._rigidBody;
    }

    addToPhysicsWorld(physicsWorld: CANNON.World): void {
        physicsWorld.addBody(this.rigidBody);
    }

    update(): void {
        this.position.copy(this.rigidBody.position);
        this.quaternion.copy(this.rigidBody.quaternion);
    }
}