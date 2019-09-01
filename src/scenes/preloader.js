// https://github.com/B3L7/phaser3-tilemap-pack

import {WIDTH, HEIGHT} from '../constants'

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
    this.text = this.add.text(50, 50, "Ciao sanvitese \nStiamo caricando il gioco \nSantu Vitu Mia ReLoaded", {font:"28px Stonewall50", fill:"#FFFFFF"})
    this.text = this.add.text(50, 50, "Ciao sanvitese \nStiamo caricando il gioco \nSantu Vitu Mia ReLoaded", {font:"28px Stonewall50", fill:"#FFFFFF"})
    this.text = this.add.text(50, 50, "Ciao sanvitese \nStiamo caricando il gioco \nSantu Vitu Mia ReLoaded", {font:"28px Stonewall50", fill:"#FFFFFF"})


    //pass loading progress as value to loading bar and redraw as files load
    this.load.on(
      "progress",
      function(value) {
        if (!value) {
          this.text.setText(" ")
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
    for (var i = 0; i < 5; i++) {
      // this.load.spritesheet('playButton', 'src/assets/images/play.svg');
      this.load.svg('background', 'src/assets/images/background.svg', { width: WIDTH, height: HEIGHT });
     // this.load.svg('ape', 'src/assets/images/sprites-ape.svg', { width: 80, height: 120 });
      this.load.svg("villain0", 'src/assets/images/nonna.svg', { width: 160, height: 80 });
     this.load.svg("villain1", 'src/assets/images/torre.svg', { width: 320, height: 80 });
      this.load.svg("villain2", 'src/assets/images/tree.svg', { width: 160, height: 80 });
           this.load.svg('wall1', 'src/assets/images/wall1.svg', { width: 20, height: 80 });
                      this.load.svg('wall2', 'src/assets/images/wall2.svg', { width: 20, height: 80 });

    }

  }

  create() {
    this.initRegistry(); //initialize the starting registry values.
    this.scene.start("MainScene");
  }

  initRegistry() {
    //the game registry provides a place accessible by all scenes to set and get data.
    //Here we store our key that tells the LevelScene what map to load.
    this.registry.set("newGame", true);
    this.registry.set("score", 1);
  }
}

export default Preloader;
