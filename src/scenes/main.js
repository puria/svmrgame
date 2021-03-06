import { HEIGHT, WIDTH } from "../constants";
import ape from "../assets/images/sprites-ape.svg";

const settings = {
  velocity: 1000,
  score: 1,
  scoreMultiplier: 1,
  scoreMessage: ""
};

let villains0;
var villainScale = 0.7;
let villains1;
var platforms;
let villains2;
let key;
let player = [];
let lanes = 1;

class MainScene extends Phaser.Scene {
  constructor() {
    super({
      key: "MainScene"
    });
  }

  preload() {
    settings.score = this.registry.get('score')
    this.load.spritesheet("player", ape, {
      frameWidth: 100,
      frameHeight: 150
    });
    this.load.svg("villain0", "villain0");
    this.sfxbump = this.sound.add("bump");
    this.sfxvecchia = this.sound.add("crash0");
    this.sfxmusic = this.sound.add("music")
    this.sfxmusic.play();
  }

  create() {
    key = this.input.keyboard.createCursorKeys();
    this.add.image(0, 0, "background").setOrigin(0);
    for (var i = 0; i < lanes; i++) {
      this.setupPlayers(this, i);
    }
    this.setupVillains(this);
    this.setupScoring(this);

    platforms = this.physics.add.staticGroup();
    var i;
    var k;
    var widthlane;
    widthlane = WIDTH / lanes;

    for (k = 0; k <= lanes; k++) {
      for (i = 0; i <= HEIGHT / 80; i++) {
        platforms.create(widthlane * k + 10, 80 * i, "wall1").setImmovable();
        platforms
          .create(widthlane * (k + 1) - 10, 80 * i, "wall2")
          .setImmovable();
      }
    }
    this.physics.add.collider(player, platforms);
  }

  update() {
    for (var i = 0; i < lanes; i++) {
      this.handleKeys(this, i);

      villains0.children.iterate(function(v) {
        if (v.y > HEIGHT) {
          villains0.killAndHide(v);
        }
      });

      villains1.children.iterate(function(v) {
        if (v.y > HEIGHT) {
          villains1.killAndHide(v);
        }
      });

      villains2.children.iterate(function(v) {
        if (v.y > HEIGHT) {
          villains2.killAndHide(v);
        }
      });
    }
  }

  hitVecchia() {
    this.physics.pause();
    this.sfxmusic.stop();
    this.sfxvecchia.play();
    this.registry.set("gameOver", true);
    this.registry.set("score", 1)
    this.scene.start("GameOver");
  }

  handleKeys(game, i) {
    if (
      key.left.isDown &&
      Math.abs(WIDTH / lanes - player[i].body.halfWidth - player[i].x - 20) < 1
    ) {
      this.moveLeft(player[i]);
    } else if (
      key.right.isDown &&
      Math.abs(-20 + player[i].x - player[i].body.halfWidth) < 1
    ) {
      this.moveRight(player[i]);
    } else if (this.isLeftBound(player[i]) || this.isRightBound(player[i])) {
      player[i].setVelocityX(0);
    }
  }

  isLeftBound(player) {
    return player.x === player.body.halfWidth + 20;
  }

  isRightBound(player) {
    return player.x === WIDTH / lanes - player.body.halfWidth - 20;
  }

  moveLeft(player) {
    player.setVelocityX(-settings.velocity);
    player.anims.play("left", true);
    this.sfxbump.play();
  }

  moveRight(player) {
    player.setVelocityX(settings.velocity);
    player.anims.play("right", true);
    this.sfxbump.play();
  }

  computeScore() {
    if (settings.score > 80) {
		this.scene.start("GameOver");
        this.registry.set("gameOver", false);
	}
    settings.score += 1 * settings.scoreMultiplier;
    settings.scoreMessage.setText("PUNTI: " + settings.score);
  }

  speedUpScoring(multiplier) {
    settings.scoreMultiplier *= multiplier;
  }

  slowDownScoring(multiplier) {
    settings.scoreMultiplier /= multiplier;
  }

  setupPlayers(ctx, i) {
    ctx.anims.create({
      key: "left",
      frames: ctx.anims.generateFrameNumbers("player", { start: 2, end: 0 }),
      duration: 500
    });
    ctx.anims.create({
      key: "right",
      frames: ctx.anims.generateFrameNumbers("player", { start: 0, end: 2 }),
      duration: 500
    });
    player[i] = ctx.physics.add.sprite((WIDTH / lanes) * i, HEIGHT, "player");
    player[i].x = (WIDTH / lanes) * i + player[i].width / (2 * lanes) + 20;
    player[i].setScale(1 / lanes);
    player[i].setCollideWorldBounds(true);
  }

  setupVillains(ctx) {
    villains0 = ctx.add.group({ defaultKey: "villain0" });
    villains1 = ctx.add.group({ defaultKey: "villain1" });
    villains2 = ctx.add.group({ defaultKey: "villain2" });

    ctx.time.addEvent({
      delay: 1000,
      loop: true,
      callback: this.addVillain,
      callbackScope: ctx
    });
    this.physics.world.enable([villains0, villains1, villains2]);
  }

  addVillain() {
    var b = Math.floor(Math.random() * 2);
    var g = Math.floor(Math.random() * lanes);
    var v = Math.floor(Math.random() * 3);
    var laneWidth = WIDTH / lanes;
    var allvillains = [villains0, villains1, villains2];
    var villain = allvillains[v].create(0, -20);

    villain.setScale(villainScale / lanes);
    if (b == 1) {
      villain.x =
        laneWidth * g + 20 + (villainScale * villain.width) / (2 * lanes);
    } else {
      villain.angle = 180;
      villain.x =
        laneWidth * (g + 1) - 20 - (villainScale * villain.width) / (2 * lanes);
    }

    this.physics.world.enable(villain);
    this.physics.add.collider(player, villain, this.hitVecchia, null, this);
  }

  setupScoring(game) {
    settings.scoreMessage = game.add.text(20, 20, "PUNTI: " + settings.score, {
      fill: "#FFF",
      font: "28px Stonewall50"
    });
    game.time.addEvent({
      delay: 1000,
      callback: this.computeScore,
      callbackScope: game,
      loop: true
    });
  }
}

export default MainScene;
