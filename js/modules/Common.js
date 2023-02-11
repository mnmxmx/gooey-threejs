import * as THREE from "three"

class Common {
    constructor() {
        this.$wrapper = null;
        this.dimensions = new THREE.Vector2();
        this.dimensions_old = new THREE.Vector2();
        this.aspect = null;
        this.isMobile = false;
        this.pixelRatio = null;

        this.scene = new THREE.Scene();
        this.camera = null

        this.fbo_dimensions = new THREE.Vector2();

        this.time = 0;
        this.delta = 0;
    }

    init({$wrapper}) {
        this.pixelRatio = Math.min(1.0, window.devicePixelRatio);

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });

        this.$canvas = this.renderer.domElement;
        $wrapper.appendChild(this.$canvas);


        this.renderer.setClearColor(0xffffff, 0.0);

        this.renderer.setPixelRatio(this.pixelRatio);

        this.clock = new THREE.Clock();
        this.clock.start();
        this.resize();

        this.camera = new THREE.PerspectiveCamera(52, this.aspect, 0.1, 100);
        this.camera.position.set(0, 0, 10);
        this.camera.lookAt(this.scene.position);
    }

    resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.dimensions_old.copy(this.dimensions);
        this.dimensions.set(width, height);

        this.fbo_dimensions.set(
            width * this.pixelRatio,
            height * this.pixelRatio
        );

        this.aspect = width / height;

        if(this.camera){
            this.camera.aspect = this.aspect;
            this.camera.updateProjectionMatrix();
        }
        

        this.renderer.setSize(this.dimensions.x, this.dimensions.y);
    }

    update() {
        const delta = this.clock.getDelta();
        this.delta = delta;
        this.time += this.delta;
    }
}

export default new Common();