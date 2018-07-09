// Initiate the Phaser framework.
var game = new Phaser.Game(750, 450, Phaser.AUTO, '', {preload: preload, create: create, update, update});

// Load the game assets before the game starts.
function preload() {
  game.load.image('Background', 'assets/bg.jpg')
  game.load.image('Background_Coins', 'assets/bg-coins.png')
  game.load.image('Background_Overlay', 'assets/dark-bg-overlay.png')
  game.load.image('Big_Win', 'assets/big-win.png')
  game.load.image('Huge_Win', 'assets/huge-win.png')
  game.load.image('Coin_Animation', 'assets/coin-animation.png')
  game.load.image('Install_Button', 'assets/install-btn.png')
  game.load.image('Lines_Number', 'assets/lines-number.png')
  game.load.image('Cursor', 'assets/mousehand.png')
  game.load.image('Numbers_Top', 'assets/number-button.png')
  game.load.image('Reel_Background', 'assets/reel-bg.png')
  game.load.image('Reel_Overlay', 'assets/reel-overlay.png')
  game.load.image('Slotmachine', 'assets/slotmachine.png')
  game.load.image('Slots_7', 'assets/slots-7.png')
  game.load.image('Slots_10', 'assets/slots-10.png')
  game.load.image('Slots_Bar', 'assets/slots-bar.png')
  game.load.image('Slots_Bar_Lighter', 'assets/slots-bar-lighter.png')
  game.load.image('Slots_Crown', 'assets/slots-crown.png')
  game.load.image('Slots_Diamond', 'assets/slots-diamond.png')
  game.load.image('Slots_Diamond_Lighter', 'assets/slots-diamond-lighter.png')
  game.load.image('Slots_Lemon', 'assets/slots-lemon.png')
  game.load.image('Slots_Melon', 'assets/slots-watermelon.png')
  game.load.image('Spin_Button', 'assets/spin-btn.png')
  game.load.image('Spin_Button_Lighter', 'assets/spin-btn-glow.png')
  game.load.image('Start_Spinning', 'assets/start-spinning.png')
  game.load.image('Top_Bars_Glow', 'assets/top-bars-glow.png')
  game.load.image('Top_Diamond_Glow', 'assets/top-diamond-glow.png')
  game.load.image('Total_Bet_Number', 'assets/total-bet-number.png')

  game.load.spritesheet('Numbers_Spritesheet', 'assets/red-numbers-sprite.png', 11, 22)
}
// Executed after everything is loaded.
function create() {
  game.add.image(0, 0, 'Background');

  var slotmachine = game.add.image(155, 12, 'Slotmachine');
  // Scales the slotmachine down.
  slotmachine.scale.setTo(0.68,0.68);
}
// Executed per frame.
function update() {

}