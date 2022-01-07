import * as THREE from "three"
import EventBus from "../utils/EventBus";
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader.js"

class Assets{
    constructor(){
        this.textures = {
        }

        this.shapes = {
        }

        this.envs = {
        }

        this.illusts = [];

        this.total = 0;
        this.count = 0;
        this.countTotal(this.textures);
        this.countTotal(this.shapes);
        this.countTotal(this.envs);

    }

    countTotal(obj){
        for(let key in obj){
            this.total++;
        }
    }
    compLoad(){
        this.count++;
        EventBus.emit("COUNT_LOADING", {
            progress: this.count / this.total
        });
        if(this.count == this.total){
            // .log(this.illusts);
            EventBus.emit("FINISH_LOADING");
        }
    }

    load(){
        this.loadShapes();
        this.loadTextures();
    }

    loadShapes(){
    }

    loadEnv(){
        for(let key in this.envs){
            const data = this.envs[key]
            const loader = new RGBELoader();
            loader.load(data.src, (texture) => {
                texture.encoding = THREE.sRGBEncoding;
                data.value = texture;
                this.compLoad();
            });
        }
    }

    loadTextures(){
        for(let key in this.textures){
            const data = this.textures[key];
            const loader = new THREE.TextureLoader();
            loader.load(data.src, (texture) => {
                data.value = texture;
                this.compLoad();
            });
        }
    }
}

export default new Assets();