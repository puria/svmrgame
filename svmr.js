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
var player = [];

var numeroPiste = 3;

function preload() {
  this.load.image("player", "assets/images/ape.svg");
  this.load.image("villain", "assets/images/baffo.png");
}

function create() {
  key = this.input.keyboard.createCursorKeys();
  for(i = 0; i < numeroPiste; i++){
  setupPlayers(this, i);
  setupInvisibles(this, i);
  setupScoring(this, i);
  }
}

function update() {
  for(i = 0; i < numeroPiste; i++){
  handleKeys(this,i);
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

function setupPlayers(game,i) {
  var sezioni = config.width/numeroPiste;
  var rightLine = [];
  var leftLine = [];
  var rightVillains = [];
  var leftVillains = [];
  player[i] = game.physics.add.image(config.width/numeroPiste*i, config.height, "player").setScale(0.6);
  player[i].setCollideWorldBounds(true);
  leftLine[i] = new Phaser.Geom.Line(config.width/numeroPiste*i, 0, config.width/numeroPiste*i, config.height);
  rightLine[i] = new Phaser.Geom.Line(config.width/numeroPiste*(i+1), 0, config.width/numeroPiste*(i+1), config.height);
  rightVillains[i] = game.add.group({ key: 'villain', frameQuantity: 1 });
  leftVillains[i] = game.add.group({ key: 'villain', frameQuantity: 1 });
  Phaser.Actions.RandomLine(rightVillains[i].getChildren(), rightLine[i]);
  Phaser.Actions.RandomLine(leftVillains[i].getChildren(), leftLine[i]);  
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
