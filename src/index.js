import Phaser from "phaser";
import {HEIGHT, WIDTH, GRAVITY} from "./constants"
import MainScene from './scenes/main'
import Preloader from "./scenes/preloader"


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
  scene: [Preloader, MainScene]
};

window.game = new Phaser.Game(config);
