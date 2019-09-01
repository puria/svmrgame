import { HEIGHT, WIDTH } from "../constants";

const settings = {
  velocity: 1000,
  score: 1,
  scoreMultiplier: 1,
  scoreMessage: ""
};

let villains;
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
    this.load.spritesheet("player", "ape", {
      frameWidth: 80,
      frameHeight: 120
    });
    this.load.svg("villain0", 'villain0');
  }

  create() {
    key = this.input.keyboard.createCursorKeys();
    this.add.image(0, 0, 'background').setOrigin(0);
    for (var i = 0; i < lanes; i++) {
      this.setupPlayers(this, i);
    }
    this.setupVillains(this);
    this.setupScoring(this);
  }

  update() {
    for (var i = 0; i < lanes; i++) {
      this.handleKeys(this, i);
      Phaser.Actions.IncY(villains.getChildren(), (1 * settings.score) / 8);

      villains.children.iterate(function(v) {
        if (v.y > HEIGHT) {
          villains.killAndHide(v);
        }
      });

      this.physics.world.collide(player, villains);
    }
  }

  handleKeys(game, i) {
    if (key.left.isDown && WIDTH - player[i].body.halfWidth - player[i].x < 1) {
      this.moveLeft(player[i]);
    } else if (key.right.isDown && player[i].x - player[i].body.halfWidth < 1) {
      this.moveRight(player[i]);
    } else if (this.isLeftBound(player[i]) || this.isRightBound(player[i])) {
      player[i].setVelocityX(0);
    }
  }

  isLeftBound(player) {
    return player.x === WIDTH - player.body.halfWidth;
  }

  isRightBound(player) {
    return player.x === player.body.halfWidth;
  }

  moveLeft(player) {
    player.setVelocityX(-settings.velocity);
    player.anims.play("left", true);
  }

  moveRight(player) {
    player.setVelocityX(settings.velocity);
    player.anims.play("right", true);
  }

  computeScore() {
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
    player[i].setCollideWorldBounds(true);
  }

  setupVillains(ctx) {
    villains = ctx.add.group(
      {
        defaultKey: "villain0"
      }
      // , {
      //   defaultKey: "villain1"
      // }, {
      //   defaultKey: "villain2"
      // }]
    );

    ctx.time.addEvent({
      delay: 100,
      loop: true,
      callback: this.addVillain,
      callbackScope: ctx
    });
  }

  addVillain() {
    var r = Math.floor(Math.random() * Math.floor(4));
    var g = Math.floor(Math.random() * Math.floor(4));
    var laneWidth = WIDTH / lanes;
    var lanesX = [0, r * laneWidth, laneWidth];
    var villain = villains.create(lanesX[g], Phaser.Math.Between(-5, 0) * 200);
    if (!villain) return;
    villain
      .setActive(true)
      .setVisible(true)
      .setScale(0.5);
  }

  setupScoring(game) {
    settings.scoreMessage = game.add.text(20, 20, "PUNTI: " + settings.score, {
      fill: "#FFF",
      font:"28px Stonewall50"
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
