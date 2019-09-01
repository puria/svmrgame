export default class GameOver extends Phaser.Scene {
  constructor() {
    super({
      key: "GameOver"
    });
  }

  create() {
    this.cameras.main.setBackgroundColor(0x2a0503);
    this.text = this.add.text(this.cameras.main.width / 2,
                              this.cameras.main.height / 2 + 64,
                              "Hai perso, male.", {font:"28px Stonewall50", fill:"#FFFFFF"})
    this.text.setOrigin(0.5);
    this.input.keyboard.on("keydown_ENTER", function(event) {
      location.reload(); // Load tests
    });
  }
}
