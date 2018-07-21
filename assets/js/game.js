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
    game.load.image('Reel_Border', 'assets/reel-border.png');
    game.load.image('Reel_Overlay', 'assets/reel-overlay.png');
    game.load.image('Slotmachine', 'assets/slotmachine-transparant2.png');
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

let layers;
let image, sprite;
let background, layer;
let slotmachineBackground;
let startMachine, firstPhase;
let linesNumber, totalBetNumber;
let slotmachineActivated;
let slotmachine, slots, scrollSpeed;
let spinStartSpeed, maxUp, maxDown, upDownTimer;
let spinButton, spinButtonGlow, spinStart, mouseHand;
let reelBorder1, reelBorder2, reelBorder3, reelBorder4;
let reelOverlay1, reelOverlay2, reelOverlay3, reelOverlay4;
let reelBackground1, reelBackground2, reelBackground3, reelBackground4;

// Executed after everything is loaded.
function create() {

    slotmachineStart = false;

    // Slots scroll speed.
    scrollSpeed = 500;

    // Up-down-movement speed of "Start Spinning"-image.
    spinStartSpeed = 15;

    maxUp = 320;
    maxDown = 325;

    // Physics System.
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Creates layers and adds a group to each. The groups are ordered from lowest to highest.
    backgroundLayer = game.add.group();
    reelBackgroundLayer = game.add.group();
    slotsLayer = game.add.group();
    reelOverlayLayer = game.add.group();
    slotmachineLayer = game.add.group();
    reelBorderLayer = game.add.group();
    interactionLayer = game.add.group();

    background = game.add.image(0, 0, 'Background');
    backgroundLayer.add(background);

    // Adds the reel background.
    reelBackground1 = game.add.image(195, 160, 'Reel_Background');
    reelBackground2 = game.add.image(0, 0, 'Reel_Background').alignTo(reelBackground1, Phaser.RIGHT_CENTER, -18);
    reelBackground3 = game.add.image(0, 0, 'Reel_Background').alignTo(reelBackground2, Phaser.RIGHT_CENTER, -17);
    reelBackground4 = game.add.image(0, 0, 'Reel_Background').alignTo(reelBackground3, Phaser.RIGHT_CENTER, -13);

    reelBackground1.scale.setTo(0.70, 0.70);
    reelBackground2.scale.setTo(0.70, 0.70);
    reelBackground3.scale.setTo(0.70, 0.70);
    reelBackground4.scale.setTo(0.70, 0.70);

    reelBackgroundLayer.add(reelBackground1);
    reelBackgroundLayer.add(reelBackground2);
    reelBackgroundLayer.add(reelBackground3);
    reelBackgroundLayer.add(reelBackground4);

    // Create new JSON object.
    slotmachine = new Object();
    startSlotmachine();

    //Adds the greyish reel overlay.
    reelOverlay1 = game.add.image(204.8, 171, 'Reel_Overlay');
    reelOverlay2 = game.add.image(0, 0, 'Reel_Overlay').alignTo(reelOverlay1, Phaser.RIGHT_CENTER, 0);
    reelOverlay3 = game.add.image(0, 0, 'Reel_Overlay').alignTo(reelOverlay2, Phaser.RIGHT_CENTER, 3);
    reelOverlay4 = game.add.image(0, 0, 'Reel_Overlay').alignTo(reelOverlay3, Phaser.RIGHT_CENTER, 1.2);

    reelOverlay1.scale.setTo(0.61, 0.61);
    reelOverlay2.scale.setTo(0.61, 0.61);
    reelOverlay3.scale.setTo(0.61, 0.61);
    reelOverlay4.scale.setTo(0.61, 0.61);

    reelOverlayLayer.add(reelOverlay1);
    reelOverlayLayer.add(reelOverlay2);
    reelOverlayLayer.add(reelOverlay3);
    reelOverlayLayer.add(reelOverlay4);

    reelBorder1 = game.add.image(200, 167, 'Reel_Border');
    reelBorder2 = game.add.image(0, 0, 'Reel_Border').alignTo(reelBorder1, Phaser.RIGHT_CENTER, -18);
    reelBorder3 = game.add.image(0, 0, 'Reel_Border').alignTo(reelBorder2, Phaser.RIGHT_CENTER, -15.5);
    reelBorder4 = game.add.image(0, 0, 'Reel_Border').alignTo(reelBorder3, Phaser.RIGHT_CENTER, -16);

    reelBorder1.scale.setTo(0.59, 0.60);
    reelBorder2.scale.setTo(0.59, 0.60);
    reelBorder3.scale.setTo(0.59, 0.60);
    reelBorder4.scale.setTo(0.59, 0.60);

    reelBorderLayer.add(reelBorder1);
    reelBorderLayer.add(reelBorder2);
    reelBorderLayer.add(reelBorder3);
    reelBorderLayer.add(reelBorder4);

    slotmachineBackground = game.add.image(155, 12, 'Slotmachine');
    slotmachineBackground.scale.setTo(0.62, 0.62);
    slotmachineLayer.add(slotmachineBackground);

    linesNumber = game.add.image(198, 388, 'Lines_Number');
    linesNumber.scale.setTo(0.7, 0.7);
    slotmachineLayer.add(linesNumber);

    totalBetNumber = game.add.image(241.5, 388, 'Total_Bet_Number');
    totalBetNumber.scale.setTo(0.7, 0.7);
    slotmachineLayer.add(totalBetNumber);

    spinButton = game.add.button(481, 366, 'Spin_Button', actionOnUp, this, 2, 1, 0);
    spinButton.scale.setTo(0.611, 0.611);
    interactionLayer.add(spinButton);

    spinButtonGlow = game.add.image(481, 366, 'Spin_Button_Lighter');
    spinButtonGlow.scale.setTo(0.611, 0.611);
    spinButtonGlow.visible = false;
    interactionLayer.add(spinButtonGlow);

    spinStart = game.add.sprite(460, 320, 'Start_Spinning');
    spinStart.scale.setTo(0.6, 0.6);
    spinStart.visible = true;
    interactionLayer.add(spinStart);

    // Enables the Physics System for spinStart.
    game.physics.enable(spinStart, Phaser.Physics.ARCADE);

    // Takes the first sprite from the spritesheet.
    sprite = game.add.sprite(376.5, 388, 'Numbers_Spritesheet');
    sprite.scale.setTo(0.7, 0.7);
    sprite.frame = 0;
    interactionLayer.add(sprite);

    mouseHand = game.add.image(545, 390, 'Mouse_Hand');
    mouseHand.scale.setTo(0.6, 0.6);
    mouseHand.visible = true;
    interactionLayer.add(mouseHand);
}

// Executed per frame.
function update() {
    if (spinStart.body.position.y <= maxUp) {
        spinStart.body.velocity.y = spinStartSpeed;
    } else if (spinStart.body.position.y >= maxDown) {
        spinStart.body.velocity.y = -spinStartSpeed;
    }

    // If the slotmachine has already been activated
    if (slotmachineActivated) {
        slotsIllusion();
    }
}

function actionOnUp(onClick) {
    // If the button is re-pressed, the action will be canceled so the spinButtonGlow disappears and spinStart won't pop up.
    if (onClick && !slotmachineActivated) {
        spinStart.visible = false;
        spinButtonGlow.visible = !spinButtonGlow.visible;
        mouseHand.visible = false;
        slotmachineActivated = true;

        for (let reel = 0; reel < 4; reel++)
            for (let slot = 0; slot < 4; slot++)
                slotmachine[reel][slot].body.velocity.y = scrollSpeed;
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
            image = game.add.sprite(0, 120, 'Slots_Bar');
            break;
        case 1:
            image = game.add.sprite(0, 120, 'Slots_Lemon');
            break;
        case 2:
            image = game.add.sprite(0, 120, 'Slots_Watermelon');
            break;
        case 3:
            image = game.add.sprite(0, 120, 'Slots_Ten');
            break;
        case 4:
            image = game.add.sprite(0, 120, 'Slots_Crown');
            break;
        case 5:
            image = game.add.sprite(0, 120, 'Slots_Seven');
            break;
        case 6:
            image = game.add.sprite(0, 150, 'Slots_Diamond');
            break;
    }

    image.scale.setTo(0.58, 0.58);
    slotsLayer.add(image);

    return image;
}

function startSlotmachine() {
    // Initializing slots.
    for (let reel = 0; reel < 4; reel++) {

        // Creates array in the JSON object.
        slotmachine[reel] = new Array();

        // Shows three slots for each reel.
        for (let slot = 0; slot < 4; slot++) {

            // Puts random selected slot.
            image = slotSelection();

            game.physics.enable(image, Phaser.Physics.ARCADE);

            if (slot != 0) {
                // Aligns to the previous slot in the reel.
                image.alignTo(slotmachine[reel][slot - 1], Phaser.BOTTOM_CENTER, 0, 7);
            }

            // Positions slot to the correct reel.
            switch (reel) {
                case 0:
                    image.position.x = 208;
                    break;
                case 1:
                    image.position.x = 302;
                    break;
                case 2:
                    image.position.x = 398;
                    break;
                case 3:
                    image.position.x = 494;
                    break;
            }

            slotmachine[reel][slot] = image;
        }
    }
}

function slotsIllusion() {
    for (let reel = 0; reel < 4; reel++) {
        //console.log(slotmachine[i][2].body.position.y);
        if (slotmachine[reel][3].position.y >= 335) {

            // Destroys the last row of slot images.
            slotmachine[reel][3].destroy();

            // Removes the last row of slot images.
            slotmachine[reel].pop();

            slotmachine[reel].unshift(slotSelection());

            game.physics.arcade.enable(slotmachine[reel][0]);

            // Positions the last row of slots of slotmachine[reel] to the first row.
            switch (reel) {
                case 0:
                    slotmachine[reel][0].position.x = 208;
                    break;
                case 1:
                    slotmachine[reel][0].position.x = 302;
                    break;
                case 2:
                    slotmachine[reel][0].position.x = 398;
                    break;
                case 3:
                    slotmachine[reel][0].position.x = 494;
                    break;
            }

            slotmachine[reel][0].body.velocity.y = scrollSpeed;
        }
    }
}