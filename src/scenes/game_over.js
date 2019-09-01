export default class GameOver extends Phaser.Scene {
  constructor() {
    super({
      key: "GameOver"
    });
  }

  preload() {
    this.sfxwin = this.sound.add("win");
  }

  create() {
    var self = this
    this.cameras.main.setBackgroundColor("#24334e");
    this.add.text(20, 20, "PUNTI: " + this.registry.get('score'), {
      fill: "#FFF",
      font: "28px Stonewall50"
    });
    this.text = this.add.text(this.cameras.main.width / 2,
                              this.cameras.main.height / 4 + 64,
                              "Hai perso, male.\nPer continuare a giocare\nrispondi correttamente", {font:"28px Stonewall50", fill:"#FFFFFF"})
    this.text.setOrigin(0.5);



    var qa = `Il bene comune deve essere gestito nel rispetto:

    ☐ degli esseri umani
    ☐ dell’ambiente
    ☐ di tutte le forme di vita:
            umane, animali e vegetali`

    this.add.text(this.cameras.main.width / 2,
      this.cameras.main.height / 2 + 64, qa,
       {font:"18px Stonewall50", fill:"#FFFFFF"}).setOrigin(0.44)

    this.input.keyboard.on("keydown_ENTER", function(event) {
      self.sfxwin.play();
      self.scene.start("MainScene");
    });
  }
}
