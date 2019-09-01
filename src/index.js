import Phaser from "phaser";
import {HEIGHT, WIDTH, GRAVITY} from "./constants"
import * as scenes from './scenes'

let scene = [];
for (let i in scenes) {
  scene.push(scenes[i]);
}

const config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: GRAVITY },
      debug: true
    }
  },
  scene
};

window.game = new Phaser.Game(config);
