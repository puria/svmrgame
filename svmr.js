
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
        size: 100,
        velocity: 2000

    }
}

var game = new Phaser.Game(config);
var dir=0;

function preload() {
    this.load.image("player", "assets/images/puria.png") //, { frameWidth: settings.player.size, frameHeight: settings.player.size })
    this.load.image("villain", "assets/images/baffo.png")
}

function create() {
    cursors = this.input.keyboard.createCursorKeys();

    player = this.physics.add.image(100, 450, 'player');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // villain = this.physics.add.image(400, 450, 'villain');
    // villain.setBounce(0.2);
   // villain.set  CollideWorldBounds(false);

    platforms = this.physics.add.staticGroup();
    const villains = this.physics.add.group();


 /*
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

*/

}



function update() {
    if (cursors.left.isDown) {
    	dir=1;
    } else if (cursors.right.isDown) {
      dir=-1;
    } 

       
if (player.x === config.width - player.body.width)
	{dir=0;}

if(dir==1)
{    player.setVelocityX(-settings.player.velocity);
}
else if(dir==-1)
{player.setVelocityX(settings.player.velocity);}
else 
{player.setVelocityX(0);}



    
}