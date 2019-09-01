import Phaser from "phaser";
import ape from "./assets/images/sprites-ape.svg"
import obstacle1 from "./assets/images/nonna.svg"
import obstacle2 from "./assets/images/tree.svg"
import obstacle3 from "./assets/images/torre.svg"

const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 800,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 100 },
      debug: true
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const settings = {
  velocity: 1000,
  score: 1,
  scoreMultiplier: 1,
  scoreMessage: ""
};

const game = new Phaser.Game(config);
let villains;
let key;
let timedEvent;
let player = [];
let lanes = 1;

function preload() {
  this.load.spritesheet("player", ape, {
    frameWidth: 80,
    frameHeight: 120
  });
  this.load.svg("villain0", obstacle1);
  this.load.svg("villain1", obstacle2);
  this.load.svg("villain2", obstacle3);
}

function create() {
  key = this.input.keyboard.createCursorKeys();
  for (var i = 0; i < lanes; i++) {
    setupPlayers(this, i);
  }
  setupVillains(this);
  setupScoring(this);
}

function update() {
  for (var i = 0; i < lanes; i++) {
    handleKeys(this, i);
    Phaser.Actions.IncY(villains.getChildren(), (1 * settings.score) / 8);

    villains.children.iterate(function(v) {
      if (v.y > config.height) {
        villains.killAndHide(v);
      }
    });

    this.physics.world.collide(player, villains);
  }
}

function handleKeys(game, i) {
  if (
    key.left.isDown &&
    config.width - player[i].body.halfWidth - player[i].x < 1
  ) {
    moveLeft(player[i]);
  } else if (key.right.isDown && player[i].x - player[i].body.halfWidth < 1) {
    moveRight(player[i]);
  } else if (isLeftBound(player[i]) || isRightBound(player[i])) {
    player[i].setVelocityX(0);
  }
}

function isLeftBound(player) {
  return player.x === config.width - player.body.halfWidth;
}

function isRightBound(player) {
  return player.x === player.body.halfWidth;
}

function moveLeft(player) {
  player.setVelocityX(-settings.velocity);
  player.anims.play("left", true);
}

function moveRight(player) {
  player.setVelocityX(settings.velocity);
  player.anims.play("right", true);
}

function computeScore() {
  settings.score += 1 * settings.scoreMultiplier;
  settings.scoreMessage.setText("PUNTI: " + settings.score);
}

function speedUpScoring(multiplier) {
  settings.scoreMultiplier *= multiplier;
}

function slowDownScoring(multiplier) {
  settings.scoreMultiplier /= multiplier;
}

function setupPlayers(ctx, i) {
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
  player[i] = ctx.physics.add.sprite(
    (config.width / lanes) * i,
    config.height,
    "player"
  );
  player[i].setCollideWorldBounds(true);
}

function setupVillains(ctx) {
  villains = ctx.add.group({
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
    callback: addVillain,
    callbackScope: ctx
  });
}

function addVillain() {
  var r = Math.floor(Math.random() * Math.floor(4));
  var g = Math.floor(Math.random() * Math.floor(4));
  var laneWidth = config.width / lanes;
  var lanesX = [0, r * laneWidth, laneWidth];
  var villain = villains.create(lanesX[g], Phaser.Math.Between(-5, 0) * 200);
  if (!villain) return;
  villain
    .setActive(true)
    .setVisible(true)
    .setScale(0.5);
}

function setupScoring(game) {
  settings.scoreMessage = game.add.text(20, 20, "PUNTI: " + settings.score, {
    fill: "#FFF"
  });
  timedEvent = game.time.addEvent({
    delay: 1000,
    callback: computeScore,
    callbackScope: game,
    loop: true
  });
}
