const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 480,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 100 },
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
  scoreMultiplier: 1,
  scoreMessage: ""
};

const game = new Phaser.Game(config);
let timedEvent;

function preload() {
  this.load.image("player", "assets/images/ape.svg");
  this.load.image("villain", "assets/images/baffo.png");
}

function create() {
  key = this.input.keyboard.createCursorKeys();
  setupPlayers(this);
  setupScoring(this);
}

function update() {
  handleKeys();
}

function handleKeys() {
  if (key.left.isDown) {
    moveLeft(player);
  } else if (key.right.isDown) {
    moveRight(player);
  } else if (isLeftBound(player) || isRightBound(player)) {
    player.setVelocityX(0);
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
}

function moveRight(player) {
  player.setVelocityX(settings.velocity);
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

function setupPlayers(game) {
  player = game.physics.add.image(0, config.height, "player").setScale(0.6);
  player.setCollideWorldBounds(true);
  const villains = game.physics.add.group();
  game.physics.add.collider(player, villains);
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
