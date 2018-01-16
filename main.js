var game = new Phaser.Game(32*20,32*8, Phaser.AUTO, 'game');

var PhaserGame = function(game) {
  this.map = null;
  this.layer = null;

  this.hero = null;
  this.villain = null;

  this.gridsize = 32;
  this.speed = 150;
}

PhaserGame.prototype = {
  preload: function() {
    game.load.image('car', 'car.png');
    game.load.tilemap('map', 'dirt.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'ground_tiles.png');
    game.load.spritesheet('hero', 'hero.png', 48, 48);
    game.load.spritesheet('villain', 'villain.png', 80, 48);
  },
  create: function() {
    // load the background
    this.map = this.add.tilemap('map');
    this.map.addTilesetImage('ground_tiles', 'tiles');
    this.layer = this.map.createLayer(0);
    this.layer.resizeWorld();

    // load the hero and villain
    this.hero = this.add.sprite(2*this.gridsize, 2*this.gridsize, 'hero');
    this.villain = this.add.sprite(6*this.gridsize, 4*this.gridsize, 'villain');

    this.physics.arcade.enable(this.hero);
    this.physics.arcade.enable(this.villain);
    this.hero.body.collideWorldBounds = true;
    this.villain.body.collideWorldBounds = true;

    // cursor animations
    this.hero.animations.add('down', [0, 1, 2], 10, true);
    this.hero.animations.add('up', [36, 37, 38], 10, true);
    this.hero.animations.add('left', [12, 13, 14], 10, true);
    this.hero.animations.add('right', [24, 25, 26], 10, true);

    this.villain.animations.add('left', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], 10, true);
    this.villain.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9 , 10], 10, true);
    this.villain.animations.add('up', [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46], 10, true);
    this.villain.animations.add('down', [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34], 10, true);

    this.cursors = this.input.keyboard.createCursorKeys();
  },
  update: function() {
    // TODO: make villain move autonomously
    
    this.hero.body.velocity.x = 0;
    this.hero.body.velocity.y = 0;

    if (this.cursors.left.isDown)
    {
      this.hero.body.velocity.x = -this.speed;
      this.hero.animations.play('left');
    }
    else if (this.cursors.right.isDown)
    {
      this.hero.body.velocity.x = this.speed;
      this.hero.animations.play('right');
    }
    else if (this.cursors.up.isDown)
    {
      this.hero.body.velocity.y = -this.speed;
      this.hero.animations.play('up');
    }
    else if (this.cursors.down.isDown)
    {
      this.hero.body.velocity.y = this.speed;
      this.hero.animations.play('down');
    }
    else
    {
      this.hero.animations.stop();
    }
  }
};

game.state.add('Game', PhaserGame, true);

