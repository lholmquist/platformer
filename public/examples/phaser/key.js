
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    //game.load.image('phaser', 'assets/dude.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

}

var sprite, spirte1, cursors;

var upKey, downKey, leftKey, rightKey;
var upKey1, downKey1, leftKey1, rightKey1;

function create() {

    game.stage.backgroundColor = '#736357';

    player = game.add.sprite(300, 300, 'dude');

    // Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    player.animations.add('up', [5, 6, 7, 8], 10, true);
    player.animations.add('down', [5, 6, 7, 8], 10, true);

    //  Enable p2 physics
    //game.physics.startSystem(Phaser.Physics.P2JS);

    //  Make things a bit more bouncey
    //game.physics.p2.defaultRestitution = 0.8;

    //  Enable if for physics. This creates a default rectangular body.
    //game.physics.p2.enable(player);

    game.physics.arcade.enable(player);

    cursors = game.input.keyboard.createCursorKeys();

    //sprite1 = game.add.sprite(300, 300, 'phaser');

    //  In this example we'll create 4 specific keys (up, down, left, right) and monitor them in our update function

    // upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    // downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    // leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    // rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);


    // upKey1 = game.input.keyboard.addKey(Phaser.Keyboard.W);
    // downKey1 = game.input.keyboard.addKey(Phaser.Keyboard.S);
    // leftKey1 = game.input.keyboard.addKey(Phaser.Keyboard.A);
    // rightKey1 = game.input.keyboard.addKey(Phaser.Keyboard.D);


}

function update() {

    //  Reset the players velocity (movement)
    player.body.setZeroVelocity();

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    } else if (cursors.up.isDown) {

        player.body.velocity.y = -150;
        player.animations.play('down');

    } else if (cursors.down.isDown) {
        player.body.velocity.y = 150;
        player.animations.play('up');
    } else {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }




    // if (upKey.isDown)
    // {
    //     sprite.y--;
    // }
    // else if (downKey.isDown)
    // {
    //     sprite.y++;
    // }

    // if (upKey1.isDown)
    // {
    //     sprite1.y--;
    // }
    // else if (downKey1.isDown)
    // {
    //     sprite1.y++;
    // }

    // if (leftKey.isDown)
    // {
    //     sprite.x--;
    //     sprite.animations.play('left');
    // }
    // else if (rightKey.isDown)
    // {
    //     sprite.x++;
    //     sprite.animations.play('right');
    // }

    // if (leftKey1.isDown)
    // {
    //     sprite1.x--;
    // }
    // else if (rightKey1.isDown)
    // {
    //     sprite1.x++;
    // }

}
