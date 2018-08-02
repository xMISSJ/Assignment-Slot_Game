/**
 * Playable advertisement demo.
 * This is a Cloud Games Slot Machine assignment made with the framework PhaserJs.
 * @author Jenny Sun <xmissj96@gmail.com>
 */

// Initiate the Phaser framework.
const game = new Phaser.Game(750, 450, Phaser.AUTO, '', { preload: preload, create: create, update, update });

// Load the game assets before the game starts.
function preload() {

    game.load.image('Background', 'assets/bg.jpg');
    game.load.image('Background_2', 'assets/bg-2.jpg');
    game.load.image('Background_Coins', 'assets/bg-coins.png');
    game.load.image('Background_Overlay', 'assets/dark-bg-overlay.png');
    game.load.image('Big_Win', 'assets/big-win.png');
    game.load.image('Mouse_Hand', 'assets/mousehand.png');
    game.load.image('Huge_Win', 'assets/huge-win.png');
    game.load.image('Install_Button', 'assets/install-btn.png');
    game.load.image('Lines_Number', 'assets/lines-number.png');
    game.load.image('WinScore_1', 'assets/number-button2.png');
    game.load.image('WinScore_2', 'assets/number-button.png');
    game.load.image('Reel_Background', 'assets/reel-bg.png');
    game.load.image('Reel_Border', 'assets/reel-border.png');
    game.load.image('Reel_Overlay', 'assets/reel-overlay.png');
    game.load.image('Slot_Machine', 'assets/slotmachine-transparant2.png');
    game.load.image('Slots_Bar', 'assets/slots-bar.png');
    game.load.image('Slots_Bar_Lighter', 'assets/slots-bar-lighter.png');
    game.load.image('Slots_Cherry', 'assets/slots-cherry.png');
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
    game.load.image('Top_Diamonds_Glow', 'assets/top-diamond-glow.png');
    game.load.image('Total_Bet_Number', 'assets/total-bet-number.png');

    // Parameters: name, asset location, x-size, y-size, frames.
    game.load.spritesheet('Numbers_SpriteSheet', 'assets/red-numbers-sprite.png', 11, 22, 11);
    game.load.spritesheet('Bars_SpriteSheet', 'assets/slots-bar-sheet.png', 88, 84, 2);
    game.load.spritesheet('Diamonds_SpriteSheet', 'assets/slots-diamond-sheet.png', 88, 84, 2);
    game.load.spritesheet('Coin_Animation', 'assets/coin-animation.png', 126, 129, 5);
}

const SLOT_TYPE = {
    "BAR": 0,
    "LEMON": 1,
    "MELON": 2,
    "TEN": 3,
    "CHERRY": 4,
    "CROWN": 5,
    "SEVEN": 6,
    "DIAMOND": 7,
}

let counter;
let slotStopped;
let image, sprite;
let installButton;
let darkBackground;
let animationPlayed;
let winScore1, winScore2;
let slotMachineBackground;
let background, background2
let startMachine, firstPhase;
let linesNumber, totalBetNumber;
let slotMachine, slots, scrollSpeed;
let slotMachineActivated, popCounter;
let spinStartSpeed, maxUp, maxDown, upDownTimer;
let topBarsGlow, topDiamondsGlow, bigWin, hugeWin;
let spinButton, spinButtonGlow, spinStart, mouseHand;
let reelBorder1, reelBorder2, reelBorder3, reelBorder4;
let reelOverlay1, reelOverlay2, reelOverlay3, reelOverlay4
let reelBackground1, reelBackground2, reelBackground3, reelBackground4;

// Executed after everything is loaded.
function create() {

    slotMachineActivated = false;
    slotMachineStart = false;
    slotStopped = false;
    animationPlayed = true;

    counter = 0;
    scrollSpeed = 1000;
    spinStartSpeed = 15;
    maxUp = 326;
    maxDown = 331;

    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Creates layers and adds a group to each. The groups are ordered from lowest to highest.
    lowestLayer = game.add.group();
    reelBackgroundLayer = game.add.group();
    slotsLayer = game.add.group();
    reelOverlayLayer = game.add.group();
    slotMachineLayer = game.add.group();
    reelBorderLayer = game.add.group();
    interactionLayer = game.add.group();
    backgroundLayer = game.add.group();
    coinsLayer = game.add.group();
    highestLayer = game.add.group();

    // Illusion of background so when images are added you won't see them on the top left corner.
    background2 = game.add.image(0, 0, 'Background_2');
    background2.scale.setTo(0.598, 0.6232);

    backgroundLayer.add(background2);

    background = game.add.image(game.world.centerX, game.world.centerY, 'Background');
    background.anchor.set(0.5, 0.5);
    background.scale.setTo(0.58, 0.63);
    lowestLayer.add(background);

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

    slotMachine = new Object();
    startSlotmachine();

    // Adds the greyish reel overlay.
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

    game.physics.enable(spinStart, Phaser.Physics.ARCADE);

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
    topBarsGlow.preUpdate();
    interactionLayer.add(topBarsGlow);

    topDiamondsGlow = game.add.sprite(303, 33, 'Top_Diamonds_Glow');
    topDiamondsGlow.scale.setTo(0.62, 0.62);
    topDiamondsGlow.visible = false;
    topDiamondsGlow.preUpdate();
    interactionLayer.add(topDiamondsGlow);

    darkBackground = game.add.sprite(0, 0, 'Background_Overlay');
    darkBackground.visible = false;
    darkBackground.preUpdate();
    backgroundLayer.add(darkBackground);

    bigWin = game.add.sprite(game.world.centerX, game.world.centerY, 'Big_Win');
    bigWin.anchor.set(0.5, 0.5)
    bigWin.scale.setTo(0.75, 0.75);
    bigWin.visible = false;
    bigWin.preUpdate();
    highestLayer.add(bigWin);

    hugeWin = game.add.sprite(game.world.centerX, game.world.centerY + 15, 'Huge_Win');
    hugeWin.anchor.set(0.5, 0.5);
    hugeWin.scale.setTo(0.75, 0.75);
    hugeWin.visible = false;
    hugeWin.preUpdate();
    highestLayer.add(hugeWin);

    winScore1 = game.add.sprite(306, 393, 'WinScore_1');
    winScore1.scale.setTo(0.7, 0.7);
    winScore1.visible = false;
    interactionLayer.add(winScore1)

    winScore2 = game.add.sprite(296, 393, 'WinScore_2');
    winScore2.scale.setTo(0.7, 0.7);
    winScore2.visible = false;
    interactionLayer.add(winScore2);

    // When pressed on the button the user will be redirected to the Cloud Games page.
    installButton = game.add.button(game.world.centerX + 4, game.world.centerY + 120, 'Install_Button', function () { window.open("https://cloudgames.com/play", "_blank"); }, this);
    installButton.anchor.set(0.5, 0.5);
    installButton.scale.setTo(0.6, 0.6);
    installButton.visible = false;
    highestLayer.add(installButton);
}

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

/**
 * Performs actions when the spinStart button has been pressed.
 * Counter keeps up the times the slotmachine has been started (user has pressed on spinStart button).
 * @param {boolean} onClick 
 */
function actionOnUp(onClick) {

    if (onClick && !slotMachineActivated && !(bigWin.visible || hugeWin.visible) && animationPlayed) {
        spinStart.visible = false;
        spinButtonGlow.visible = true;
        mouseHand.visible = false;
        slotMachineActivated = true;
        animationPlayed = false;
        counter++;

        // Adds y-velocity to every slot in every reel on click.
        for (let reel = 0; reel < 4; reel++)
            for (let slot = 0; slot < 4; slot++)
                slotMachine[reel][slot].body.velocity.y = scrollSpeed;

        // No delay at start.
        let delay = 0;

        for (let reel = 0; reel < 4; reel++) {
            // For every reel delay is added.
            delay += 900;

            // For the last reel we add extra delay.
            if (reel == 3)
                delay += 600;

            // Timer which is called for every reel loop.
            setTimeout(() => {

                slotMachineEnd(reel);

                // For every slot from a reel, we will perform an action.
                for (let slot = 0; slot < 4; slot++) {

                    // We will set the velocity of each slot from a reel to 0, making them stand still.
                    slotMachine[reel][slot].body.velocity.y = 0;
                    slotMachine[reel][0].position.y = 135;
                    slotMachine[reel][1].position.y = 198;
                    slotMachine[reel][2].position.y = 248;
                    slotMachine[reel][3].position.y = 295;

                    // Bounces the slots a bit for extra effect.
                    bounceAnimation(slotMachine[reel][slot]);

                    // The button stops glowing at the last reel when the middle slot has stopped.
                    if (slotMachine[3][3].body.velocity.y <= 0) {
                        spinButtonGlow.visible = false;
                        slotMachineActivated = false;
                    }
                }
            }, delay + 600);
        }


        if (counter == 1) {
            setTimeout(() => {
                for (let reel = 1; reel < 4; reel++) {
                    blinkAnimation(slotMachine[reel][2]);
                    topBarsGlow.visible = true;

                    setTimeout(() => {
                        sprite.visible = false;
                        winScore1.visible = true;
                        darkBackground.visible = true;
                        bigWin.visible = true;
                        winAnimation(bigWin);
                    }, 1800);

                }
            }, 5000);
        } else {
            topBarsGlow.visible = false;
            bigWin.visible = false;
            darkBackground.visible = false;
            topDiamondsGlow.visible = false;
            hugeWin.visible = false;
            installButton.visible = false;
            animationPlayed = true;
        }

        if (counter == 3) {
            setTimeout(() => {
                for (let reel = 0; reel < 4; reel++) {

                    blinkAnimation(slotMachine[reel][2]);

                    setTimeout(() => {
                        diamondAnimation(slotMachine[reel][2]);
                        topDiamondsGlow.visible = true;
                    }, 1300);
                }

                setTimeout(() => {
                    sprite.visible = false;
                    winScore1.visible = false;
                    winScore2.visible = true;
                    darkBackground.visible = true;
                    darkBackground.alpha = 1;
                    hugeWin.visible = true;

                    winAnimation(hugeWin);
                    installButton.visible = true;
                    coinAnimation();
                    rotateAnimation1(installButton);

                }, 3000);
            }, 5000);
        }
    }
}

/**
 * Selects a random image sprite and returns this.
 * @param {int} type 
 */
function slotSelection(type) {

    if (type === undefined) {
        type = Math.floor(Math.random() * 8);
    }

    // Eight different logos.
    switch (type) {
        case SLOT_TYPE.BAR:
            image = game.add.sprite(0, 151, 'Bars_SpriteSheet');
            break;
        case SLOT_TYPE.LEMON:
            image = game.add.sprite(0, 151, 'Slots_Lemon');
            break;
        case SLOT_TYPE.MELON:
            image = game.add.sprite(0, 151, 'Slots_Watermelon');
            break;
        case SLOT_TYPE.TEN:
            image = game.add.sprite(0, 151, 'Slots_Ten');
            break;
        case SLOT_TYPE.CHERRY:
            image = game.add.sprite(0, 151, 'Slots_Cherry');
            break;
        case SLOT_TYPE.CROWN:
            image = game.add.sprite(0, 151, 'Slots_Crown');
            break;
        case SLOT_TYPE.SEVEN:
            image = game.add.sprite(0, 151, 'Slots_Seven');
            break;
        case SLOT_TYPE.DIAMOND:
            image = game.add.sprite(0, 151, 'Diamonds_SpriteSheet');
            break;
    }

    image.scale.setTo(0.58, 0.58);
    image.anchor.set(0.5, 0.5);
    slotsLayer.add(image);

    return image;
}

/**
 * Adds and positions the slots in the right position for each reel before slotmachine start spinning.
 * @function
 */
function startSlotmachine() {

    for (let reel = 0; reel < 4; reel++) {

        // Creates array in the JSON object.
        slotMachine[reel] = new Array();

        // Shows four slots for each reel.
        for (let slot = 0; slot < 4; slot++) {

            image = slotSelection();

            game.physics.enable(image, Phaser.Physics.ARCADE);

            if (slot != 0) {
                // Aligns to the previous slot in the reel.
                image.alignTo(slotMachine[reel][slot - 1], Phaser.BOTTOM_CENTER, 0, 5);
            }

            // Position slots to the correct reel.
            positionSlot(image, reel);

            slotMachine[reel][slot] = image;

        }
    }
}

/**
 * Creates an illusion of having infinite slots scrolling down per reel.
 * @function
 */
function slotsIllusion() {

    for (let reel = 0; reel < 4; reel++) {

        if (slotMachine[reel][3].position.y >= 335) {

            // Destroys the last row of slot sprites.
            slotMachine[reel][3].destroy();

            // Removes the last row of slot sprites.
            slotMachine[reel].pop();

            // Adds new slot sprite for each reel to the slots.
            slotMachine[reel].unshift(slotSelection());

            game.physics.arcade.enable(slotMachine[reel][0]);

            // Positions the slots to the correct reel.
            positionSlot(slotMachine[reel][0], reel);

            slotMachine[reel][0].body.velocity.y += scrollSpeed;
        }
    }
}

/**
 * Correctly places a slot sprite to a designated x position.
 * @function
 * @param {Object} image - A Phaser sprite object.
 * @param {int} image.position.x - The x position of the Phaser sprite object.
 * @param {int} reel - A reel from the slot machine starting from 0, left to right.
 */
function positionSlot(image, reel) {

    game.physics.arcade.enable(image);

    switch (reel) {
        case 0:
            image.position.x = 233.5;
            break;
        case 1:
            image.position.x = 327;
            break;
        case 2:
            image.position.x = 423;
            break;
        case 3:
            image.position.x = 520;
            break;
    }
}

/**
 * First spin: three bars are displayed horizontally from left to right, skipping the third slot of the first reel.
 * Third spin: four diamonds are displayed horizonally from left to right.
 * At default: all third slots of each reel are random.
 * @function
 * @param {int} reel - A reel from the slot machine starting from 0, left to right.
 */

function slotMachineEnd(reel) {

    // Makes it so the reels are manipulated like bars, random, diamonds.
    switch (counter) {
        case 1:
            if (reel != 0) {
                slotMachine[reel][2].destroy();
                slotMachine[reel][2] = slotSelection(SLOT_TYPE.BAR);
                positionSlot(slotMachine[reel][2], reel);

            } else {
                slotMachine[reel][2].destroy();

                // Prevents the 3rd slot of the first reel to be a bar.
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

/**
 * Animates the diamond sprite to blink (alpha: 0 to alpha: 1).
 * @function
 * @param {Object} diamond - a Phaser spritesheet.
 */
function blinkAnimation(diamond) {
    let spriteSheet = diamond;
    let blink = game.add.tween(spriteSheet);
    spriteSheet.frame = 0;
    blink.to({ frame: 1 }, 200, Phaser.Easing.Linear.None, true, 0, 200, true);
}

/**
 * Animates the slot sprite to bounce up a little.
 * @function
 * @param {Object} slot - a Phaser sprite.
 */
function bounceAnimation(slot) {
    bounce1 = slot;
    bounce1 = game.add.tween(slot);
    bounce1.to({ y: slot.position.y + 10 }, 500, Phaser.Easing.Bounce.Out, true);
}

/**
 * Animtes the diamond sprite to pop-out by changing the scale.
 * @function
 * @param {Object} diamond 
 */
function diamondAnimation(diamond) {
    diamondScale = diamond;
    diamondScale = game.add.tween(diamond.scale).to({ x: 0.68, y: 0.68 }, 300, Phaser.Easing.Linear.None, true, 0, 300, true);
}

/**
 * Shows a popup sprite which becomes smaller and bigger over time and eventually fades out.
 * @function
 * @param {Object} popup 
 */
function winAnimation(popup) {
    winScale = popup;
    winScale = game.add.tween(popup.scale).to({ x: 0.7, y: 0.7 }, 300, Phaser.Easing.Linear.None, true, 0, 300, true);

    if (counter == 1) {

        setTimeout(() => {
            winFadeOut = game.add.tween(popup).to({ alpha: 0 }, 1500, Phaser.Easing.Linear.None, true);
            winFadeOut2 = game.add.tween(darkBackground).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
        }, 2000)

        setTimeout(() => {
            popup.visible = false;
            darkBackground.visible = false;
            animationPlayed = true;
        }, 4500)
    }

    /* Uncomment this section if you wish for the user to be able to continue playing after third phase.
    if (counter == 3) {
        setTimeout(() => {
            winFadeOut = game.add.tween(popup).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            winFadeOut2 = game.add.tween(darkBackground).to({ alpha: 0 }, 2500, Phaser.Easing.Linear.None, true);
            winFadeOut3 = game.add.tween(installButton).to({ alpha: 0 }, 2500, Phaser.Easing.Linear.None, true);
        }, 10000)

        setTimeout(() => {
            popup.visible = false;
            darkBackground.visible = false;
            animationPlayed = true;
        }, 14500)
    }
    */
}

/**
 * Animates the button called "button" to rotate slightly (angle: -4 to angle: 4 in a loop).
 * @function
 * @param {Object} button 
 */
function rotateAnimation1(button) {
    rotate = button;
    rotate.angle = -4;
    rotate = game.add.tween(button).to({ angle: 4 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
}

/**
 * Selects a random coinImage frame ( 0 to 4 ) from the "Coin_Animation"-spritesheet and returns this.
 * @function
 */
function coinSelection() {
    let coinImage = game.add.sprite(-20 + (game.world.randomX), -450, 'Coin_Animation');
    // Fixes bug that coinImage flickers at x: 0 and y: 0.
    coinImage.preUpdate();
    coinImage.frame = Math.floor(Math.random() * 4);
    coinsLayer.add(coinImage);
    return coinImage;
}

/**
 * Animates coins to fall down in the screen.
 * The coin is chosen with the coinSelection() function.
 * @function
 */
function coinAnimation() {

    let delay = 0;

    for (let loop = 0; loop < 50; loop++) {

        // Increases for every loop with a minimum of 200ms and will have a difference of +- 50ms each loop.
        delay += Math.floor(Math.random() * 50) + 200;

        // Initializes a setTimeout to add delay to the coin generation.
        setTimeout(() => {

            let coin = coinSelection();
            coin.scale.set(game.rnd.realInRange(0.3, 0.6));
            let speed = game.rnd.between(800, 1000);

            // Coins fall down.
            game.add.tween(coin).to({ y: +500 }, speed, Phaser.Easing.Linear.None, true, -200, 500, false);

            // Coins rotate slightly.
            game.add.tween(coin).to({ angle: Math.floor(Math.random() * 20) + -20 }, speed, Phaser.Easing.Linear.None, true, 0, 50, true)

        }, delay);
    }
}