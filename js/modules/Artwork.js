import * as THREE from "three"
import common from "./Common";
import controls from "./Controls"

import centerVert from "./glsl/centerCircle.vert"
import centerFrag from "./glsl/centerCircle.frag"

import smallVert from "./glsl/smallCircle.vert"
import smallFrag from "./glsl/smallCircle.frag"

import GaussianBlur from "./GaussianBlur"

import screenVert from "./glsl/screen.vert";
import outputFrag from "./glsl/output.frag"


export default class Artwork{
    constructor(props){
        this.props = props;
        this.centerCircle = null;
        this.smallCircles = null;
        this.smallCircleNum = 30;
        this.circlePosArray = []; 
        this.group = new THREE.Group();
        

        this.uniforms = {
            uTime: {
                value: 0
            }
        }
        this.init();
    }

    init(){
        controls.init();
        common.init({
            $wrapper: this.props.$wrapper
        });
        common.scene.add(this.group);

        this.fbo = new THREE.WebGLRenderTarget(common.fbo_dimensions.x, common.fbo_dimensions.y);

        this.gaussianBlur = new GaussianBlur(this.fbo);

        this.outputMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(2, 2),
            new THREE.ShaderMaterial({
                vertexShader: screenVert,
                fragmentShader: outputFrag,
                uniforms: {
                    uDiffuse: {
                        value: this.gaussianBlur.blurFbos[1].texture
                    },
                    uGooey: {
                        value: controls.params.enableGooey
                    }
                },
                transparent: true
            })
        );

        this.createCenterCircle();
        this.createSmallCircles();

        this.update();
    }

    createCenterCircle(){
        this.centerCircle = new THREE.Mesh(
            new THREE.CircleGeometry(0.8, 64),
            new THREE.ShaderMaterial({
                vertexShader: centerVert,
                fragmentShader: centerFrag,
                uniforms: {
                    ...this.uniforms,
                    uColor: {
                        value: controls.params.centerColor
                    }
                },
                depthTest: false
            })
        )

        this.centerCircle.renderOrder = 2;
        this.group.add(this.centerCircle);

    }

    createSmallCircles(){
        const originalGeometry = new THREE.CircleGeometry(0.6, 64);
        const instancedGeometry = new THREE.InstancedBufferGeometry();

        instancedGeometry.count = this.smallCircleNum;

        const position = originalGeometry.attributes.position.clone();
        const uv = originalGeometry.attributes.uv.clone();

        const index = originalGeometry.getIndex().clone();

        instancedGeometry.setAttribute("position", position);
        instancedGeometry.setAttribute("uv", uv);

        instancedGeometry.setIndex(index);

        const aVelocity = new THREE.InstancedBufferAttribute( new Float32Array(this.smallCircleNum * 3), 3, false, 1)
        instancedGeometry.setAttribute("aVelocity", aVelocity);

        const aColorValue = new THREE.InstancedBufferAttribute( new Float32Array(this.smallCircleNum * 2), 2, false, 1)
        instancedGeometry.setAttribute("aColorValue", aColorValue);


        const aRandom = new THREE.InstancedBufferAttribute( new Float32Array(this.smallCircleNum * 3), 3, false, 1)
        instancedGeometry.setAttribute("aRandom", aRandom);


        for(let i = 0; i < this.smallCircleNum; i++){
            const radian = Math.random() * Math.PI * 2;
            aVelocity.setXYZ(i, 
                Math.cos(radian),
                Math.sin(radian),
                Math.random()
            );
            aColorValue.setXY(i, Math.random(), Math.random());

            aRandom.setXYZ(i, Math.random(), Math.random(), Math.random());
        }


        const material = new THREE.ShaderMaterial({
            vertexShader: smallVert,
            fragmentShader: smallFrag,
            uniforms: {
                ...this.uniforms,
                uColor1: {
                    value: controls.params.color1
                },
                uColor2: {
                    value: controls.params.color2
                },
                uColor3: {
                    value: controls.params.color3
                },
                uAreaSize: {
                    value: 10
                }
            }
        });

        this.smallCircles = new THREE.Mesh(instancedGeometry, material);
        this.group.add(this.smallCircles);
    }

    resize(){
        common.resize();
        this.fbo.setSize(common.fbo_dimensions.x, common.fbo_dimensions.y);
        this.gaussianBlur.resize();
    }

    update(){
        common.update();
        this.outputMesh.material.uniforms.uGooey.value = controls.params.enableGooey
        this.uniforms.uTime.value += common.delta;
        common.renderer.setClearColor(0xffffff, 0.0)
        common.renderer.setRenderTarget(this.fbo);
        common.renderer.render(common.scene, common.camera);

        this.gaussianBlur.update();

        common.renderer.setClearColor(controls.params.bgColor)
        common.renderer.setRenderTarget(null);
        common.renderer.render(this.outputMesh, common.camera);
        window.requestAnimationFrame(this.update.bind(this));
    }
}