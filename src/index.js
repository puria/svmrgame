import Phaser from "phaser";
import {HEIGHT, WIDTH, GRAVITY} from "./constants"
import MainScene from './scenes/main'
import Preloader from "./scenes/preloader"
import GameOver from "./scenes/game_over"


const config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: GRAVITY },
      debug: false 
    }
  },
  scene: [Preloader, MainScene, GameOver]
};

window.game = new Phaser.Game(config);
