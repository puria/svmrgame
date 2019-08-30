const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 480,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const settings = {
  velocity: 2000,
  score: 1,
  scoreMultiplier: 1.0,
  scoreMessage: ""
};

const game = new Phaser.Game(config);
let timedEvent;

function preload() {
  this.load.image("player", "assets/images/ape.svg");
  this.load.image("villain", "assets/images/baffo.png");
}

function create() {
  cursors = this.input.keyboard.createCursorKeys();
  player = this.physics.add.image(0, config.height, "player").setScale(0.6);
  player.setCollideWorldBounds(true);
  platforms = this.physics.add.staticGroup();
  const villains = this.physics.add.group();
  this.physics.add.collider(player, villains);
  settings.scoreMessage = this.add.text(20, 20, "PUNTI: " + settings.score, {
    fill: "#FFF"
  });
  timedEvent = this.time.addEvent({
    delay: 1000,
    callback: computeScore,
    callbackScope: this,
    loop: true
  });
}

function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-settings.velocity);
  } else if (cursors.right.isDown) {
    player.setVelocityX(settings.velocity);
  } else if (
    player.x === config.width - player.body.halfWidth ||
    player.x === player.body.halfWidth
  ) {
    player.setVelocityX(0);
  }
}

function computeScore() {
  settings.score += settings.scoreMultiplier;
  settings.scoreMessage.setText("PUNTI: " + settings.score);
}

function speedUpScoring(multiplier) {
  settings.scoreMultiplier *= multiplier;
}

function slowDownScoring(multiplier) {
  settings.scoreMultiplier /= multiplier;
}
