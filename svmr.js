const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 480,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
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
  player: {
    size: 100,
    velocity: 2000
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("player", "assets/images/puria.png"); //, { frameWidth: settings.player.size, frameHeight: settings.player.size })
  this.load.image("villain", "assets/images/baffo.png");
}

function create() {
  cursors = this.input.keyboard.createCursorKeys();
  player = this.physics.add.image(100, 450, "player");
  player.setCollideWorldBounds(true);
  platforms = this.physics.add.staticGroup();
  const villains = this.physics.add.group();
  this.physics.add.collider(player, villains);
}

function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-settings.player.velocity);
  } else if (cursors.right.isDown) {
    player.setVelocityX(settings.player.velocity);
  } else if (player.x === config.width - player.body.halfWidth ||
             player.x === player.body.halfWidth) {
    player.setVelocityX(0);
  }
}
