// Initiate the Phaser framework.
var game = new Phaser.Game(750, 450, Phaser.AUTO, '', { preload: preload, create: create, update, update });

// Load the game assets before the game starts.
function preload() {
  game.load.image('Background', 'assets/bg.jpg');
  game.load.image('Background_Coins', 'assets/bg-coins.png');
  game.load.image('Background_Overlay', 'assets/dark-bg-overlay.png');
  game.load.image('Big_Win', 'assets/big-win.png');
  game.load.image('Coin_Animation', 'assets/coin-animation.png');
  game.load.image('Cursor', 'assets/mousehand.png');
  game.load.image('Huge_Win', 'assets/huge-win.png');
  game.load.image('Install_Button', 'assets/install-btn.png');
  game.load.image('Lines_Number', 'assets/lines-number.png');
  game.load.image('Numbers_Top', 'assets/number-button.png');
  game.load.image('Reel_Background', 'assets/reel-bg.png');
  game.load.image('Reel_Overlay', 'assets/reel-overlay.png');
  game.load.image('Slotmachine', 'assets/slotmachine-transparant.png');
  game.load.image('Slots_7', 'assets/slots-7.png');
  game.load.image('Slots_10', 'assets/slots-10.png');
  game.load.image('Slots_Bar', 'assets/slots-bar.png');
  game.load.image('Slots_Bar_Lighter', 'assets/slots-bar-lighter.png');
  game.load.image('Slots_Crown', 'assets/slots-crown.png');
  game.load.image('Slots_Diamond', 'assets/slots-diamond.png');
  game.load.image('Slots_Diamond_Lighter', 'assets/slots-diamond-lighter.png');
  game.load.image('Slots_Lemon', 'assets/slots-lemon.png');
  game.load.image('Slots_Melon', 'assets/slots-watermelon.png');
  game.load.image('Spin_Button', 'assets/spin-btn.png');
  game.load.image('Spin_Button_Lighter', 'assets/spin-btn-glow.png');
  game.load.image('Start_Spinning', 'assets/start-spinning.png');
  game.load.image('Top_Bars_Glow', 'assets/top-bars-glow.png');
  game.load.image('Top_Diamond_Glow', 'assets/top-diamond-glow.png');
  game.load.image('Total_Bet_Number', 'assets/total-bet-number.png');

  game.load.spritesheet('Numbers_Spritesheet', 'assets/red-numbers-sprite.png', 11, 22, 11);
}
// Executed after everything is loaded.
function create() {
  game.add.image(0, 0, 'Background');

  var slotmachine = game.add.image(155, 12, 'Slotmachine');

  var reelBackground1 = game.add.image(200, 167, 'Reel_Background');
  var reelBackground2 = game.add.image(294, 167, 'Reel_Background');
  var reelBackground3 = game.add.image(389, 167, 'Reel_Background');
  var reelBackground4 = game.add.image(488, 167, 'Reel_Background');

  var linesNumber = game.add.image(198, 388, 'Lines_Number');
  var totalBetNumber = game.add.image(241.5, 388, 'Total_Bet_Number');

  // Takes the first sprite from the spritesheet.
  var sprite = game.add.sprite(376.5, 388, 'Numbers_Spritesheet');
  sprite.frame = 0;

  // Scales the images down.
  slotmachine.scale.setTo(0.62, 0.62);

  reelBackground1.scale.setTo(0.59, 0.59);
  reelBackground2.scale.setTo(0.59, 0.59);
  reelBackground3.scale.setTo(0.59, 0.59);
  reelBackground4.scale.setTo(0.59, 0.59);

  linesNumber.scale.setTo(0.7, 0.7);
  totalBetNumber.scale.setTo(0.7, 0.7);
  sprite.scale.setTo(0.7, 0.7);
}
// Executed per frame.
function update() {

}