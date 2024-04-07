export class Controller {
    static controllers: Controller[] = [];

    private parent: any;
    private keys: { [key: string]: boolean } = {};
    private focus: boolean = false;

    constructor(parent: any) {
        this.parent = parent;
        this.keys = {};
        this.focus = false;

        // event listeners for keydown and keyup events
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    static getControllers(): Controller[] {
        return Controller.controllers;
    }

    static setControllers(controllers: Controller[]) {
        Controller.controllers = controllers;
    }

    public static addController(controller: Controller) {
        Controller.controllers.push(controller);
    }

    private handleKeyDown(event: KeyboardEvent) {
        this.keys[event.key] = true;
    }

    private handleKeyUp(event: KeyboardEvent) {
        this.keys[event.key] = false;
    }

    public update() {
        const { parent, keys } = this;
        const speed = 0.5;
        //console.log(keys);
        if (keys['w']) {
            parent.rigidBody.position.z -= speed;
        }
        if (keys['a']) {
            parent.rigidBody.position.x -= speed;
        }
        if (keys['s']) {
            parent.rigidBody.position.z += speed;
        }
        if (keys['d']) {
            parent.rigidBody.position.x += speed;
        }
        if (keys[' ']) {
            parent.rigidBody.position.y += speed;
        }
    }
}