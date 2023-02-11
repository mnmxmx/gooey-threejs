import GUI from "lil-gui"
import * as THREE from "three"

class Controls{
  constructor(){
    this.params = {
      centerColor: new THREE.Color(0xfebebe),
      color1: new THREE.Color(0x90cefe),
      color2: new THREE.Color(0xd770ff),
      color3: new THREE.Color(0xfe9fe0),
      blur_radius: 32
    }
  }

  init(){
    this.gui = new GUI();

    this.gui.addColor(this.params, "centerColor");
    this.gui.addColor(this.params, "color1");
    this.gui.addColor(this.params, "color2");
    this.gui.addColor(this.params, "color3");

    this.gui.add(this.params, "blur_radius", 1, 42, 1);
  }
}

export default new Controls();