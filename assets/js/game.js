// Initiate the Phaser framework.
const game = new Phaser.Game(750, 450, Phaser.AUTO, '', { preload: preload, create: create, update, update });

// Load the game assets before the game starts.
function preload() {
    game.load.image('Background', 'assets/bg.jpg');
    game.load.image('Background_2', 'assets/bg-2.jpg');
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
    game.load.image('Slot_Machine', 'assets/slotmachine-transparant2.png');
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

    // Parameters: name, asset location, x-size, y-size, frames.
    game.load.spritesheet('Numbers_SpriteSheet', 'assets/red-numbers-sprite.png', 11, 22, 11);
    game.load.spritesheet('Bars_SpriteSheet', 'assets/slots-bar-sheet.png', 88, 84, 2);
    game.load.spritesheet('Diamonds_SpriteSheet', 'assets/slots-diamond-sheet.png', 88, 84, 2);
}

// Using JSON to create slot types.
const SLOT_TYPE = {
    "BAR": 0,
    "LEMON": 1,
    "MELON": 2,
    "TEN": 3,
    "CROWN": 4,
    "SEVEN": 5,
    "DIAMOND": 6,
}

let counter;
let slotStopped;
let image, sprite;
let darkBackground;
let topBarsGlow, bigWin;
let slotMachineBackground;
let startMachine, firstPhase;
let background, background2
let linesNumber, totalBetNumber;
let slotMachine, slots, scrollSpeed;
let slotMachineActivated, popCounter;
let spinStartSpeed, maxUp, maxDown, upDownTimer;
let spinButton, spinButtonGlow, spinStart, mouseHand;
let reelBorder1, reelBorder2, reelBorder3, reelBorder4;
let reelOverlay1, reelOverlay2, reelOverlay3, reelOverlay4
let reelBackground1, reelBackground2, reelBackground3, reelBackground4;

// Executed after everything is loaded.
function create() {

    slotMachineActivated = false;
    slotMachineStart = false;
    slotStopped = false;

    counter = 0;

    // Slots scroll speed.
    scrollSpeed = 1000;

    // Up-down-movement speed of "Start Spinning"-image.
    spinStartSpeed = 15;

    maxUp = 326;
    maxDown = 331;

    // Physics System.
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Creates layers and adds a group to each. The groups are ordered from lowest to highest.
    backgroundLayer = game.add.group();
    reelBackgroundLayer = game.add.group();
    slotsLayer = game.add.group();
    reelOverlayLayer = game.add.group();
    slotMachineLayer = game.add.group();
    reelBorderLayer = game.add.group();
    interactionLayer = game.add.group();
    highestLayer = game.add.group();

    background2 = game.add.image(0, 0, 'Background_2');
    background2.scale.setTo(0.58, 0.63);
    interactionLayer.add(background2);

    background = game.add.image(game.world.centerX, game.world.centerY, 'Background');
    background.anchor.set(0.5, 0.5);
    background.scale.setTo(0.58, 0.63);
    backgroundLayer.add(background);

    // Adds the reel background.
    reelBackground1 = game.add.image(195, 166, 'Reel_Background');
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
    slotMachine = new Object();
    startSlotmachine();

    //Adds the greyish reel overlay.
    reelOverlay1 = game.add.image(204.8, 177, 'Reel_Overlay');
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

    reelBorder1 = game.add.image(200, 173, 'Reel_Border');
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

    slotMachineBackground = game.add.image(game.world.centerX, game.world.centerY + 8, 'Slot_Machine');
    slotMachineBackground.anchor.set(0.5, 0.5);
    slotMachineBackground.scale.setTo(0.62, 0.62);
    slotMachineLayer.add(slotMachineBackground);

    linesNumber = game.add.image(198, 393, 'Lines_Number');
    linesNumber.scale.setTo(0.7, 0.7);
    slotMachineLayer.add(linesNumber);

    totalBetNumber = game.add.image(241.5, 393, 'Total_Bet_Number');
    totalBetNumber.scale.setTo(0.7, 0.7);
    slotMachineLayer.add(totalBetNumber);

    spinButton = game.add.button(481, 371, 'Spin_Button', actionOnUp, this, 2, 1, 0);
    spinButton.scale.setTo(0.611, 0.611);
    interactionLayer.add(spinButton);

    spinButtonGlow = game.add.image(481, 371, 'Spin_Button_Lighter');
    spinButtonGlow.scale.setTo(0.611, 0.611);
    spinButtonGlow.visible = false;
    interactionLayer.add(spinButtonGlow);

    spinStart = game.add.sprite(460, 326, 'Start_Spinning');
    spinStart.scale.setTo(0.6, 0.6);
    spinStart.visible = true;
    interactionLayer.add(spinStart);

    // Enables the Physics System for spinStart.
    game.physics.enable(spinStart, Phaser.Physics.ARCADE);

    // Takes the first sprite from the spritesheet.
    sprite = game.add.sprite(376.5, 393, 'Numbers_SpriteSheet');
    sprite.scale.setTo(0.7, 0.7);
    sprite.frame = 0;
    interactionLayer.add(sprite);

    mouseHand = game.add.image(545, 396, 'Mouse_Hand');
    mouseHand.scale.setTo(0.6, 0.6);
    mouseHand.visible = true;
    interactionLayer.add(mouseHand);

    diamondSpriteSheet = game.add.sprite(0, 0, 'Diamonds_SpriteSheet');
    diamondSpriteSheet.scale.setTo(0.58, 0.58);
    slotsLayer.add(diamondSpriteSheet);

    barSpriteSheet = game.add.sprite(0, 0, 'Bars_SpriteSheet');
    barSpriteSheet.scale.setTo(0.58, 0.58);
    slotsLayer.add(barSpriteSheet);

    topBarsGlow = game.add.sprite(316, 58, 'Top_Bars_Glow');
    topBarsGlow.scale.setTo(0.62, 0.62);
    topBarsGlow.visible = false;
    interactionLayer.add(topBarsGlow);

    darkBackground = game.add.sprite(0, 0, 'Background_Overlay');
    darkBackground.visible = false;
    interactionLayer.add(darkBackground);

    bigWin = game.add.sprite(game.world.centerX, game.world.centerY, 'Big_Win');
    bigWin.anchor.set(0.5, 0.5)
    bigWin.scale.setTo(0.7, 0.7);
    bigWin.visible = false;
    highestLayer.add(bigWin);
}

// Executed per frame.
function update() {

    // Checks the position of the "Start Spinning"-image and moves this up and down.
    if (spinStart.body.position.y <= maxUp) {
        spinStart.body.velocity.y = spinStartSpeed;
    } else if (spinStart.body.position.y >= maxDown) {
        spinStart.body.velocity.y = -spinStartSpeed;
    }

    // If the slotMachine has already been activated
    if (slotMachineActivated) {
        slotsIllusion();
    }
}

function actionOnUp(onClick) {

    // If the button is re-pressed, the action will be canceled so the spinButtonGlow disappears and spinStart won't pop up.
    if (onClick && !slotMachineActivated) {
        spinStart.visible = false;
        spinButtonGlow.visible = true;
        mouseHand.visible = false;
        slotMachineActivated = true;
        counter++;

        // Adds y-velocity to every slot in every reel on click.
        for (let reel = 0; reel < 4; reel++)
            for (let slot = 0; slot < 4; slot++)
                slotMachine[reel][slot].body.velocity.y = scrollSpeed;

        // We first start with no delay.
        let delay = 0;

        for (let reel = 0; reel < 4; reel++) {
            // For every reel we add a 0.9 second delay.
            delay += 900;

            // For the last reel we add a 0.6 second delay.
            if (reel == 3)
                delay += 600;

            // Timer which is called for every reel loop.
            setTimeout(() => {

                slotMachineEnd(reel);

                // For every slot from a reel, we will perform an action.
                for (let slot = 0; slot < 4; slot++) {

                    // We will set the velocity of each slot from a reel to 0, making them stand still.
                    slotMachine[reel][slot].body.velocity.y = 0;
                    slotMachine[reel][0].position.y = 110;
                    slotMachine[reel][1].position.y = 173;
                    slotMachine[reel][2].position.y = 223;
                    slotMachine[reel][3].position.y = 275;

                    // Bounces the slots a bit for extra effect.
                    bounceSlotMachine(slotMachine[reel][slot]);

                    // The button stops glowing at the last reel when the middle slot has stopped.
                    if (slotMachine[3][3].body.velocity.y <= 0) {
                        spinButtonGlow.visible = false;
                        slotMachineActivated = false;
                    }
                }

            }, delay + 600);
        }

        // For the first spin we make it so the bars blink all at once after the slots stopped spinning.
        if (counter == 1) {
            setTimeout(() => {
                for (let reel = 1; reel < 4; reel++) {
                    startAnimation(slotMachine[reel][2]);
                    topBarsGlow.visible = true;

                    // Delays 0.2 seconds before showing a pop-up.
                    setTimeout(() => {
                        darkBackground.visible = true;
                        bigWin.visible = true;
                        // Animation for the pop-up.
                        winAnimation(bigWin);
                    }, 2000);
                }
            }, 5000);
        } else {
            topBarsGlow.visible = false;
            bigWin.visible = false;
            darkBackground.visible = false;
        }

        // For the last spin we make it so the diamonds blink all at once after the slots stopped spinning.
        if (counter == 3) {
            setTimeout(() => {
                for (let reel = 0; reel < 4; reel++) {
                    startAnimation(slotMachine[reel][2]);
                }
            }, 5000);
        }

    }
}

// If type is not defined, a random slot will be chosen.
function slotSelection(type) {

    if (type === undefined) {
        type = Math.floor(Math.random() * 7);
    }

    // 7 different logos.
    switch (type) {
        case SLOT_TYPE.BAR:
            image = game.add.sprite(0, 124, 'Bars_SpriteSheet');
            break;
        case SLOT_TYPE.LEMON:
            image = game.add.sprite(0, 124, 'Slots_Lemon');
            break;
        case SLOT_TYPE.MELON:
            image = game.add.sprite(0, 124, 'Slots_Watermelon');
            break;
        case SLOT_TYPE.TEN:
            image = game.add.sprite(0, 124, 'Slots_Ten');
            break;
        case SLOT_TYPE.CROWN:
            image = game.add.sprite(0, 124, 'Slots_Crown');
            break;
        case SLOT_TYPE.SEVEN:
            image = game.add.sprite(0, 124, 'Slots_Seven');
            break;
        case SLOT_TYPE.DIAMOND:
            image = game.add.sprite(0, 124, 'Diamonds_SpriteSheet');
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
        slotMachine[reel] = new Array();

        // Shows three slots for each reel.
        for (let slot = 0; slot < 4; slot++) {

            image = slotSelection();

            game.physics.enable(image, Phaser.Physics.ARCADE);

            if (slot != 0) {
                // Aligns to the previous slot in the reel.
                image.alignTo(slotMachine[reel][slot - 1], Phaser.BOTTOM_CENTER, 0, 7);
            }

            // Position slots to the correct reel.
            positionSlot(image, reel);

            slotMachine[reel][slot] = image;

        }
    }
}

function slotsIllusion() {

    for (let reel = 0; reel < 4; reel++) {

        //console.log(slotMachine[i][2].body.position.y);
        if (slotMachine[reel][3].position.y >= 335) {

            // Destroys the last row of slot images.
            slotMachine[reel][3].destroy();

            // Removes the last row of slot images.
            slotMachine[reel].pop();

            slotMachine[reel].unshift(slotSelection());

            game.physics.arcade.enable(slotMachine[reel][0]);

            // Positions the slots to the correct reel.
            positionSlot(slotMachine[reel][0], reel);

            slotMachine[reel][0].body.velocity.y += scrollSpeed;
        }
    }
}

// Positions every first image of each reel accordingly.
function positionSlot(image, reel) {

    game.physics.arcade.enable(image);

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
}


function slotMachineEnd(reel) {

    // Makes it so the reels are manipulated like bars, random, diamonds.
    switch (counter) {
        case 1:
            if (reel != 0) {
                slotMachine[reel][2].destroy();
                slotMachine[reel][2] = slotSelection(SLOT_TYPE.BAR);
                positionSlot(slotMachine[reel][2], reel);

                // Prevents the 3rd slot of the first reel to be a bar.
            } else {
                slotMachine[reel][2].destroy();
                let type = Math.floor(Math.random() * 6) + 1;
                slotMachine[reel][2] = slotSelection(type);
                positionSlot(slotMachine[reel][2], reel);
            }
            break;
        case 3:
            slotMachine[reel][2].destroy();
            slotMachine[reel][2] = slotSelection(SLOT_TYPE.DIAMOND);
            positionSlot(slotMachine[reel][2], reel);
            break;
        default:
            slotMachine[reel][2].destroy();
            slotMachine[reel][2] = slotSelection();
            positionSlot(slotMachine[reel][2], reel);
            break;
    }
}

// Blink animation.
function startAnimation(item) {
    let spriteSheet = item;
    let blink = game.add.tween(spriteSheet);
    spriteSheet.frame = 0;
    blink.to({ frame: 1 }, 200, Phaser.Easing.Linear.None, true, 0, 200, true);
}

// Bounce animation.
function bounceSlotMachine(slot) {
    bounce1 = slot;
    bounce1 = game.add.tween(slot);
    bounce1.to({ y: slot.position.y + 10 }, 500, Phaser.Easing.Bounce.Out, true);
}

// Transform animation.
function winAnimation(popup) {
    let tweenTransform = popup;
    tweenTransform = game.add.tween(popup.scale);
    tweenTransform.to({ x: 0.73, y: 0.73 }, 300, Phaser.Easing.Linear.None, true, 0, 300, true);
}