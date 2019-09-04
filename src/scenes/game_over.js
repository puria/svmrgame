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
      font: "26px Stonewall50"
    });
    var qa_win = `
	Ci tuzzi na vota, no s'apre  la porta
  tuzzanci arretu, ma no cci 'mporta.
  Solo alla terza sai come si mette
  in via Garibaldi al 107
	`
	var qa_lose = `'nci stava na vota
  nu sorgi e na malota
  che facevano gira e vota.
  Cce te lu conto n'atra vota?
  scioca arretu ccu truevi la nota`
	var qa = this.registry.get('gameOver') ? qa_lose : qa_win
    this.text = this.add.text(this.cameras.main.width / 2,
                              this.cameras.main.height / 4 + 64,
		                      qa, {font:"28px Stonewall50", fill:"#FFFFFF"})
    this.text.setOrigin(0.5);
    this.input.keyboard.on("keydown_ENTER", function(event) {
      self.sfxwin.play();
      self.scene.start("MainScene");
    });
  }
}
