var numerodisatana = 666;

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
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
        size: 100
    }
}

var game = new Phaser.Game(config);

function preload() {
    this.load.image("player", "assets/images/puria.png") //, { frameWidth: settings.player.size, frameHeight: settings.player.size })
    this.load.image("villain", "assets/images/baffo.png")
}

function create() {
    cursors = this.input.keyboard.createCursorKeys();

    player = this.physics.add.image(100, 450, 'player');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    villain = this.physics.add.image(400, 450, 'villain');
    // villain.setBounce(0.2);
    villain.setCollideWorldBounds(false);

    platforms = this.physics.add.staticGroup();
    villains = this.physics.add.group({
        key: 'villain',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });
    
    villains.children.iterate( function(child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(player, villain);
    this.physics.add.collider(player, villains);
}

function update() {
    if (cursors.left.isDown) {
      player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);
    } else {
      player.setVelocityX(0);
    }
    if (cursors.up.isDown && player.y === config.height - player.body.halfHeight) {
        console.log(player)
        player.setVelocityY(-200);
    }
}