class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
        this.my = {sprite: {}};
        this.titleX = 500;
        this.titleY = 100;
        this.enKeyX = 500;
        this.enKeyY = 540;
    }

    preload() {
        this.load.setPath("./assets/");

        this.load.image("enterKeyImage", "keyboard_enter.png");

    } 
    
    create() {
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>GameOver.js</h2>'
        
        let my = this.my;

        this.add.text(this.titleX, this.titleY, "Game Over", { fontSize: "48px", color: "#982121" }).setOrigin(0.5);
        this.add.text(this.titleX - 100, this.titleY + 100, "Score: " + playerPoints, { fontSize: '32px', fill: '#FFF' });


        this.add.text(this.titleX, this.titleY + 400, "To return to title, press enter", { fontSize: "24px", color: "#ffffff" }).setOrigin(0.5);
        this.add.image(this.enKeyX, this.enKeyY, "enterKeyImage");

        this.EnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    } 
    
    update() {
        if (playerPoints > highScore) {
            highScore = playerPoints;
        }
        if (this.EnKey.isDown) {
            playerPoints = 0;
            this.scene.start("titleScene");
        }
    }
}