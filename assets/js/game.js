// Initiate the Phaser framework.
const game = new Phaser.Game(750, 450, Phaser.AUTO, '', { preload: preload, create: create, update, update });

// Load the game assets before the game starts.
function preload() {
    game.load.image('Background', 'assets/bg.jpg');
    game.load.image('Background_Coins', 'assets/bg-coins.png');
    game.load.image('Background_Overlay', 'assets/dark-bg-overlay.png');
    game.load.image('Big_Win', 'assets/big-win.png');
    game.load.image('Coin_Animation', 'assets/coin-animation.png');
    game.load.image('Mouse_Hand', 'assets/mousehand.png');
    game.load.image('Huge_Win', 'assets/huge-win.png');
    game.load.image('Install_Button', 'assets/install-btn.png');
    game.load.image('Lines_Number', 'assets/lines-number.png');
    game.load.image('Numbers_Top', 'assets/number-button.png');
    game.load.image('Reel_Background', 'assets/reel-bg.png');
    game.load.image('Reel_Overlay', 'assets/reel-overlay.png');
    game.load.image('Slotmachine', 'assets/slotmachine-transparant.png');
    game.load.image('Slots_Bar', 'assets/slots-bar.png');
    game.load.image('Slots_Bar_Lighter', 'assets/slots-bar-lighter.png');
    game.load.image('Slots_Crown', 'assets/slots-crown.png');
    game.load.image('Slots_Diamond', 'assets/slots-diamond.png');
    game.load.image('Slots_Diamond_Lighter', 'assets/slots-diamond-lighter.png');
    game.load.image('Slots_Lemon', 'assets/slots-lemon.png');
    game.load.image('Slots_Watermelon', 'assets/slots-watermelon.png');
    game.load.image('Slots_Seven', 'assets/slots-7.png');
    game.load.image('Slots_Ten', 'assets/slots-10.png');
    game.load.image('Spin_Button', 'assets/spin-btn.png');
    game.load.image('Spin_Button_Lighter', 'assets/spin-btn-glow.png');
    game.load.image('Start_Spinning', 'assets/start-spinning.png');
    game.load.image('Top_Bars_Glow', 'assets/top-bars-glow.png');
    game.load.image('Top_Diamond_Glow', 'assets/top-diamond-glow.png');
    game.load.image('Total_Bet_Number', 'assets/total-bet-number.png');

    game.load.spritesheet('Numbers_Spritesheet', 'assets/red-numbers-sprite.png', 11, 22, 11);
}

let sprite;
let image;
let slotmachine, slots;
let slotmachineBackground;
let linesNumber, totalBetNumber;
let speed, maxUp, maxDown, upDownTimer;
let spinButton, spinButtonGlow, spinStart, mouseHand;
let reelOverlay1, reelOverlay2, reelOverlay3, reelOverlay4;
let reelBackground1, reelBackground2, reelBackground3, reelBackground4;

// Executed after everything is loaded.
function create() {

    speed = 15;
    maxUp = 320;
    maxDown = 325;

    // Physics System.
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.image(0, 0, 'Background');

    slotmachine = new Array();

    slotmachineBackground = game.add.image(155, 12, 'Slotmachine');

    // Adds the reel background.
    reelBackground1 = game.add.image(200, 167, 'Reel_Background');
    reelBackground2 = game.add.image(0, 0, 'Reel_Background').alignTo(reelBackground1, Phaser.RIGHT_CENTER, -18);
    reelBackground3 = game.add.image(0, 0, 'Reel_Background').alignTo(reelBackground2, Phaser.RIGHT_CENTER, -17);
    reelBackground4 = game.add.image(0, 0, 'Reel_Background').alignTo(reelBackground3, Phaser.RIGHT_CENTER, -13);


    // Initializing slots.
    for (let reel = 0; reel < 4; reel++) {
        slotmachine[reel] = new Array();
        // Shows three slots for each reel.
        for (let slot = 0; slot < 3; slot++) {
            // Puts random selected slot.
            image = slotSelection();
            game.physics.enable(image, Phaser.Physics.ARCADE);
            image.body.velocity.y += speed * 5;
            if (slot != 0) {
                // Aligns to the previous slot in the reel.
                image.alignTo(slotmachine[reel][slot - 1], Phaser.BOTTOM_CENTER, 0, 5);
            }

            // Position slot to the correct wheel.
            switch (reel) {
                case 0:
                    image.position.x = 207;
                    break;
                case 1:
                    image.position.x = 301;
                    break;
                case 2:
                    image.position.x = 395.5;
                    break;
                case 3:
                    image.position.x = 495;
                    break;
            }

            slotmachine[reel][slot] = image;
        }
    }

    // Adds the greyish reel overlay.
    reelOverlay1 = game.add.image(205.3, 172, 'Reel_Overlay');
    reelOverlay2 = game.add.image(0, 0, 'Reel_Overlay').alignTo(reelOverlay1, Phaser.RIGHT_CENTER, 0);
    reelOverlay3 = game.add.image(0, 0, 'Reel_Overlay').alignTo(reelOverlay2, Phaser.RIGHT_CENTER, 1);
    reelOverlay4 = game.add.image(0, 0, 'Reel_Overlay').alignTo(reelOverlay3, Phaser.RIGHT_CENTER, 5);

    linesNumber = game.add.image(198, 388, 'Lines_Number');
    totalBetNumber = game.add.image(241.5, 388, 'Total_Bet_Number');

    spinButton = game.add.button(481, 366, 'Spin_Button', actionOnUp, this, 2, 1, 0);

    spinButtonGlow = game.add.image(481, 366, 'Spin_Button_Lighter');
    spinButtonGlow.visible = false;

    spinStart = game.add.sprite(460, 320, 'Start_Spinning');
    spinStart.visible = true;

    // Enables the Physics System for spinStart.
    game.physics.enable(spinStart, Phaser.Physics.ARCADE);

    // Takes the first sprite from the spritesheet.
    sprite = game.add.sprite(376.5, 388, 'Numbers_Spritesheet');
    sprite.frame = 0;

    mouseHand = game.add.image(545, 390, 'Mouse_Hand');
    mouseHand.visible = true;

    // Scales images down.
    slotmachineBackground.scale.setTo(0.62, 0.62);

    // Reel backgrounds.
    reelBackground1.scale.setTo(0.59, 0.59);
    reelBackground2.scale.setTo(0.59, 0.59);
    reelBackground3.scale.setTo(0.59, 0.59);
    reelBackground4.scale.setTo(0.59, 0.59);

    // Reel overlays.
    reelOverlay1.scale.setTo(0.5898, 0.5898);
    reelOverlay2.scale.setTo(0.5898, 0.5898);
    reelOverlay3.scale.setTo(0.5898, 0.5898);
    reelOverlay4.scale.setTo(0.5898, 0.5898);

    linesNumber.scale.setTo(0.7, 0.7);
    totalBetNumber.scale.setTo(0.7, 0.7);
    sprite.scale.setTo(0.7, 0.7);

    spinButton.scale.setTo(0.611, 0.611);
    spinButtonGlow.scale.setTo(0.611, 0.611);
    spinStart.scale.setTo(0.6, 0.6);

    mouseHand.scale.setTo(0.6, 0.6);
}
// Executed per frame.
function update() {
    if (spinStart.body.position.y <= maxUp) {
        spinStart.body.velocity.y = speed;
    }
    else if (spinStart.body.position.y >= maxDown) {
        spinStart.body.velocity.y = -speed;
    }

    //console.log(image.body.position.y);
    if (image.body.position.y >= 330 <= 333){
        for(let i = 0; i < 4; i++){
            console.log(slotmachine[i, 0].unshift());
        }

    }

    // if (image.body.position.y == 331.19) {
    //     for (let i = 0; i < 4; i++) {
    //         for (let j = 0; i < 3; j++) {
    //             //console.log(slotmachine.pop([i, 2]));
    //             //console.log(slotmachine[i, 0].push());
    //             //slotmachine[i, 2].pop();
    //             slotmachine[i][j].pop(3);
    //         }
    //     }
    // }
}

function actionOnUp(onClick) {
    // If the button is re-pressed, the action will be canceled so the spinButtonGlow disappears and spinStart won't pop up.
    if (onClick) {
        spinStart.visible = false;
        spinButtonGlow.visible = !spinButtonGlow.visible;
        mouseHand.visible = false;
    }
}

// If type is not defined, a random slot will be chosen
function slotSelection(type) {

    let image;
    if (!type) {
        type = Math.floor(Math.random() * 6);
    }

    // 7 different logos, magic number
    switch (type) {
        case 0:
            image = game.add.sprite(0, 175, 'Slots_Bar');
            break;
        case 1:
            image = game.add.sprite(0, 175, 'Slots_Lemon');
            break;
        case 2:
            image = game.add.sprite(0, 175, 'Slots_Watermelon');
            break;
        case 3:
            image = game.add.sprite(0, 175, 'Slots_Ten');
            break;
        case 4:
            image = game.add.sprite(0, 175, 'Slots_Crown');
            break;
        case 5:
            image = game.add.sprite(0, 175, 'Slots_Seven');
            break;
        case 6:
            image = game.add.sprite(0, 175, 'Slots_Diamond');
            break;
    }

    image.scale.setTo(0.58, 0.58);

    return image;
}
