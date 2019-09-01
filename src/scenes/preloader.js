// https://github.com/B3L7/phaser3-tilemap-pack

import {WIDTH, HEIGHT} from '../constants'
import background from "../assets/images/background.svg"
import villain0 from "../assets/images/nonna.svg"
import villain1 from "../assets/images/tree.svg"
import villain2 from "../assets/images/torre.svg"
import wall1 from "../assets/images/wall1.svg"
import wall2 from "../assets/images/wall2.svg"
import bumpmp3 from "../assets/sounds/rimbalzo.mp3"
import bumpogg from "../assets/sounds/rimbalzo.ogg"

import crash0mp3 from "../assets/sounds/urloVecchia.mp3"
import crash0ogg from "../assets/sounds/urloVecchia.ogg"
import crash2mp3 from "../assets/sounds/torreCheCade.mp3"
import crash2ogg from "../assets/sounds/torreCheCade.ogg"
import crash1mp3 from "../assets/sounds/treeCrash.mp3"
import crash1ogg from "../assets/sounds/treeCrash.ogg"

import musicmp3 from "../assets/sounds/svmrcore.mp3"
import musicogg from "../assets/sounds/svmrcore.ogg"

class Preloader extends Phaser.Scene {
  constructor() {
    super({
      key: "Preloader"
    });
  }

  preload() {
    //create a background and prepare loading bar
    this.cameras.main.setBackgroundColor(0x2a0503);
    this.fullBar = this.add.graphics();
    this.fullBar.fillStyle(0xda7a34, 1);
    this.fullBar.fillRect(
      this.cameras.main.width / 4 - 2,
      this.cameras.main.height / 2 - 18,
      this.cameras.main.width / 2 + 4,
      20
    );
    this.progress = this.add.graphics();
    this.text = this.add.text()

    //pass loading progress as value to loading bar and redraw as files load
    this.load.on(
      "progress",
      function(value) {
        if (!value) {
          this.text.setText(" ")
        } else if (value == 1) {
          this.text = this.add.text(50, 50, "Ciao sanvitese \nStiamo caricando il gioco \nSantu Vitu Mia ReLoaded", {font:"28px Stonewall50", fill:"#FFFFFF"})
        }
        this.progress.clear();
        this.progress.fillStyle(0xfff6d3, 1);
        this.progress.fillRect(
          this.cameras.main.width / 4,
          this.cameras.main.height / 2 - 16,
          (this.cameras.main.width / 2) * value,
          16
        );
      },
      this
    );

    //cleanup our graphics on complete
    this.load.on(
      "complete",
      function() {
        this.progress.destroy();
        this.fullBar.destroy();
      },
      this
    );

    //start loading
    this.load.svg('background', background, { width: WIDTH, height: HEIGHT });
    this.load.svg("villain0", villain0, { width: 160, height: 80 });
    this.load.svg("villain1", villain1, { width: 320, height: 80 });
    this.load.svg("villain2", villain2, { width: 160, height: 80 });
    this.load.svg('wall1', wall1, { width: 20, height: 80 });
    this.load.svg('wall2', wall2, { width: 20, height: 80 });
    this.load.audio("bump",   [bumpmp3, bumpogg])
    this.load.audio("crash0", [crash0mp3, crash0ogg])
    this.load.audio("crash1", [crash1mp3, crash1ogg])
    this.load.audio("crash2", [crash2mp3, crash2ogg])
    this.load.audio("music",  [musicmp3, musicogg])
  }

  create() {
    this.initRegistry(); //initialize the starting registry values.
    this.scene.start("MainScene");
  }

  initRegistry() {
    //the game registry provides a place accessible by all scenes to set and get data.
    //Here we store our key that tells the LevelScene what map to load.
    this.registry.set("gameOver", false);
    this.registry.set("score", 1);
  }
}

export default Preloader;
