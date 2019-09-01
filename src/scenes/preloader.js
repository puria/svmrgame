// https://github.com/B3L7/phaser3-tilemap-pack

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
        this.text = this.add.text(50, 50, "Ciao sanvitese \nStiamo caricando il gioco \nSantu Vitu Mia ReLoaded", {font:"28px Stonewall50", fill:"#FFFFFF"})
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
    for (var i = 0; i < 500; i++) {
      this.load.pack("Preload", "src/assets/pack.json", "Preload");
      this.load.image('testloading'+i, 'src/assets/logo.png');
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
