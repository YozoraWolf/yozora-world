import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export class Object extends THREE.Mesh {
    private _rigidBody: CANNON.Body;

    constructor(mesh: THREE.BufferGeometry, color: number = 0x00ff00, mass: number = 1) {
        super(mesh, new THREE.MeshStandardMaterial({ color }));
        this._rigidBody = new CANNON.Body({
            mass: mass,
            position: new CANNON.Vec3(0, 4, 0),
            shape: this._getShape(mesh)

        });
    }

    _getShape(mesh: THREE.BufferGeometry): CANNON.Shape {
        // Determine the type of the mesh geometry and create the corresponding Cannon.js shape
        let shape: CANNON.Shape;
        if (mesh instanceof THREE.BoxGeometry) {
            const { width, height, depth } = mesh.parameters;
            shape = new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2));
        } else if (mesh instanceof THREE.SphereGeometry) {
            const radius = mesh.parameters.radius;
            shape = new CANNON.Sphere(radius);
        } else {
            // Default to using a sphere shape if the mesh type is not recognized
            shape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
        }
        return shape;
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
        this.position.copy(this._rigidBody.position);
        this.quaternion.copy(this._rigidBody.quaternion);
    }
}