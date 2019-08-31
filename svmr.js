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
let player = [];
let lanes = 3;

function preload() {
  this.load.image("player", "assets/images/ape.svg");
  this.load.image("villain", "assets/images/baffo.png");
}

function create() {
  key = this.input.keyboard.createCursorKeys();
  for(i = 0; i < lanes; i++){
    setupPlayers(this, i);
  }
  setupVillains(this);
  setupScoring(this);
}

function update() {
  for(i = 0; i < lanes; i++){
    handleKeys(this,i);
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
 if (key.left.isDown) {
 game.physics.arcade.moveToXY(player[i],500,0,0,3000);
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

function setupPlayers(ctx, i) {
  player[i] = ctx.physics.add.image(config.width/lanes*i, config.height, "player").setScale(0.6);
  player[i].setCollideWorldBounds(true);
}

function setupVillains(ctx) {
  villains = ctx.add.group({
    defaultKey: "villain",
    bounceX: 1,
    bounceY: 1,
    collideWorldBounds: true,
    createCallback: function(villain) {
      villain.setName("villain_" + this.getLength());
    },
    removeCallback: function(villain) {
      console.log("Removed", villain.name);
    }
  });

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
  var laneWidth = config.width/lanes;
  var lanesX = [0, (r *laneWidth) - 10, (r * laneWidth) + 10, laneWidth];
  var villain = villains.create(
    lanesX[g],
    Phaser.Math.Between(-5, 0) * 200
  );
  if (!villain) return;
  villain.setActive(true).setVisible(true);
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
