class Controls extends Phaser.Scene {
    constructor() {
        super("controlsScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        this.titleX = 500;
        this.titleY = 100;

        this.aKeyX = this.titleX;
        this.aKeyY = 190;
        
        this.dKeyX = this.aKeyX;
        this.dKeyY = 300;

        this.spaceKeyX = this.dKeyX;
        this.spaceKeyY = 400;

        this.pKeyX = this.dKeyX;
        this.pKeyY = 500;

        this.enKeyX = this.dKeyX;
        this.enKeyY = 600;
    }

    preload() {
        this.load.setPath("./assets/");
        this.load.image("aKeyImage", "keyboard_a.png");
        this.load.image("dKeyImage", "keyboard_d.png");
        this.load.image("enterKeyImage", "keyboard_enter.png");
        this.load.image("spaceKeyImage", "keyboard_space.png");
        this.load.image("pKeyImage", "keyboard_p.png");
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        this.add.text(this.titleX, this.titleY, "Controls", { fontSize: "48px", color: "#982121" }).setOrigin(0.5);
        
        this.add.text(this.titleX, this.titleY + 50, "To go left, press A. Test it to see if you can press the A key!", { fontSize: "24px", color: "#ffffff" }).setOrigin(0.5);
        my.sprite.aKey = this.add.sprite(this.aKeyX, this.aKeyY, "aKeyImage");
        my.sprite.aKey.visible = false;

        this.add.text(this.titleX, this.titleY + 150, "To go right, press D. Test it to see if you can press the D key!", { fontSize: "24px", color: "#ffffff" }).setOrigin(0.5);
        my.sprite.dKey = this.add.sprite(this.dKeyX, this.dKeyY, "dKeyImage");
        my.sprite.dKey.visible = false;

        this.add.text(this.titleX, this.titleY + 250, "To shoot, press SPACE. Test it to see if you can press the SPACE key!", { fontSize: "24px", color: "#ffffff" }).setOrigin(0.5);
        my.sprite.spaceKey = this.add.sprite(this.spaceKeyX, this.spaceKeyY, "spaceKeyImage");
        my.sprite.spaceKey.visible = false;

        this.add.text(this.titleX, this.titleY + 350, "To end the game, press P. Test it to see if you can press the P key!", { fontSize: "24px", color: "#ffffff" }).setOrigin(0.5);
        my.sprite.pKey = this.add.sprite(this.pKeyX, this.pKeyY, "pKeyImage");
        my.sprite.pKey.visible = false;

        this.add.text(this.titleX, this.titleY + 450, "Press ENTER to go to menu", { fontSize: "24px", color: "#ffffff" }).setOrigin(0.5);
        this.add.image(this.enKeyX, this.enKeyY, "enterKeyImage");

        this.EnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.SpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.PKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }
    
    update() {
        let my = this.my;

        // Transition to the main game scene
        if (this.AKey.isDown) {
            my.sprite.aKey.visible = true;
        }
        if (this.DKey.isDown) {
            my.sprite.dKey.visible = true;
        }
        if (this.SpKey.isDown) {
            my.sprite.spaceKey.visible = true;
        }
        if (this.PKey.isDown) {
            my.sprite.pKey.visible = true;
        }
        if (this.EnKey.isDown) {
            this.scene.start("titleScene");
        }
    }
}