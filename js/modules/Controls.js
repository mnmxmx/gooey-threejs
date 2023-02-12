import GUI from "lil-gui"
import * as THREE from "three"

class Controls{
  constructor(){
    this.params = {
      bgColor: new THREE.Color(0xe0e7ff),
      centerColor: new THREE.Color(0x9d8aff),
      color1: new THREE.Color(0x90b5fe),
      color2: new THREE.Color(0xd56cfe),
      color3: new THREE.Color(0xfea9cb),
      blur_radius: 36,
      enableGooey: true
    }
  }

  init(){
    this.gui = new GUI();
    this.gui.addColor(this.params, "bgColor")
    this.gui.addColor(this.params, "centerColor");
    this.gui.addColor(this.params, "color1");
    this.gui.addColor(this.params, "color2");
    this.gui.addColor(this.params, "color3");

    this.gui.add(this.params, "blur_radius", 1, 50, 1);
    this.gui.add(this.params, "enableGooey");

  }
}

export default new Controls();