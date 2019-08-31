const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 480,
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
  velocity: 2000,
  score: 1,
  scoreMultiplier: 1,
  scoreMessage: ""
};

const game = new Phaser.Game(config);
let villains;
let timedEvent;
let player;

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
  Phaser.Actions.IncY(villains.getChildren(), (1 * settings.score) / 8);

  villains.children.iterate(function(v) {
    if (v.y > config.height) {
      villains.killAndHide(v);
    }
  });

  this.physics.world.collide(player, villains);
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

function setupPlayers(ctx) {
  player = ctx.physics.add.image(0, config.height, "player").setScale(0.6);
  player.setCollideWorldBounds(true);

  villains = ctx.add.group({
    defaultKey: "villain",
    bounceX: 1,
    bounceY: 1,
    collideWorldBounds: true,
    maxSize: 20,
    createCallback: function(villain) {
      villain.setName("alien" + this.getLength());
    },
    removeCallback: function(villain) {
      console.log("Removed", villain.name);
    }
  });

  ctx.time.addEvent({
    delay: 1000,
    loop: true,
    callback: addVillain,
    callbackScope: ctx
  });
}

function addVillain() {
  var villain = villains.create(
    Math.random() <= 0.5 ? 0 : config.width,
    Phaser.Math.Between(-5, 0) * 200
  );
  if (!villain) return; // None free
  villain.setActive(true).setVisible(true);
  this.physics.add.collider(player, villain);
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
