import * as THREE from "three"

class Common {
    constructor() {
        this.$wrapper = null;
        this.dimensions = new THREE.Vector2();
        this.dimensions_old = new THREE.Vector2();
        this.aspect = null;
        this.isMobile = false;
        this.pixelRatio = null;

        this.fbo_dimensions = new THREE.Vector2();

        this.time = 0;
        this.delta = 0;
    }

    init({$wrapper}) {
        this.pixelRatio = Math.min(2, window.devicePixelRatio);


        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });

        this.$canvas = this.renderer.domElement;
        $wrapper.appendChild(this.$canvas);


        console.log(this.renderer);

        this.renderer.setClearColor(0xffffff);

        this.renderer.setPixelRatio(this.pixelRatio);

        this.clock = new THREE.Clock();
        this.clock.start();
        this.resize();
    }

    resize() {
        const width = document.body.clientWidth;
        const height = window.innerHeight;

        this.dimensions_old.copy(this.dimensions);
        this.dimensions.set(width, height);

        this.fbo_dimensions.set(
            width * this.pixelRatio,
            height * this.pixelRatio
        );

        this.aspect = width / height;

        this.renderer.setSize(this.dimensions.x, this.dimensions.y);
    }

    update() {
        const delta = this.clock.getDelta();
        this.delta = delta;
        this.time += this.delta;
    }
}

export default new Common();