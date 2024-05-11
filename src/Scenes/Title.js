class Title extends Phaser.Scene {
    constructor() {
        super("titleScene");

        this.titleX = 500;
        this.titleY = 100;
    }

    preload() {
        // Load any assets needed for the title screen (e.g., title image)
        this.load.setPath("./assets/");
        this.load.image("titleImage", "pizza.png");
    }

    create() {
        // Display the title image
        document.getElementById('description').innerHTML = '<h2>Title.js</h2>'

        this.add.image(this.titleX, this.titleY + 200, "titleImage");

        // Add text for the title
        this.add.text(this.titleX, this.titleY, "Food", { fontSize: "48px", color: "#982121" }).setOrigin(1.5);
        this.add.text(this.titleX, this.titleY, "Fight!", { fontSize: "48px", color: "#e32929" }).setOrigin(0.5);

        this.add.text(this.titleX - 100, this.titleY + 400, "High Score: " + highScore, { fontSize: '32px', fill: '#FFF' });

        // Add text for instructions
        this.add.text(this.titleX, this.titleY + 100, "Press Space to Start", { fontSize: "24px", color: "#ffffff" }).setOrigin(0.5);
        this.add.text(this.titleX, this.titleY + 150, "Press Shift for Controls", { fontSize: "24px", color: "#ffffff" }).setOrigin(0.5);
       
        this.SpaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.ShiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    }
    
    update() {
        // Transition to the main game scene
        if (this.SpaceKey.isDown) {
            this.scene.start("bullyScene");
        }
        // Transition to the controls scene
        if (this.ShiftKey.isDown) {
            this.scene.start("controlsScene");
        }
    }
}