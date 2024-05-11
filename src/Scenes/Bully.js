class Bully extends Phaser.Scene {
    constructor() {
        super("bullyScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        // Create variables to hold constant values for sprite locations
        this.bodyX = 400;
        this.bodyY = 500;

        // Define the locations of the enemy.
        this.enemyX = 400;
        this.enemyY = 70;

        // Define the locations of the food relative to the body
        this.foodX = this.bodyX + 85;
        this.foodY = this.bodyY + 60;
    
        // Define the locations of the furniture  
        this.furnitureX = 100;
        this.furnitureY = 450;
        
        this.counter = 0;
        
        this.isFoodActive = false;
     }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Shape Characters"
        // https://kenney.nl/assets/shape-characters
        this.load.setPath("./assets/");
        // player
        this.load.image("player", "character_femalePerson_talk.png");
        // enemies
        this.load.image("bully", "character_femaleAdventurer_interact.png");
        this.load.image("popularKid", "character_maleAdventurer_interact.png");
        this.load.image("teacher", "character_malePerson_rope.png");
        // food
        this.load.image("pizza", "pizza.png");
        // furniture
        this.load.image("table1", "tableCrossCloth.png");
        this.load.image("table2", "tableRound.png");
        this.load.image("chair", "chairCushion.png");
        // audio
        this.load.audio("throw", "impactGeneric_light_001.ogg");
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Bully.js</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '20px', fill: '#ffffff' });
        this.throwSound = this.sound.add("throw", { loop: false });

        // Create the main body sprite
        my.sprite.player = this.physics.add.sprite(this.bodyX, this.bodyY, "player");
        my.sprite.player.body.setAllowGravity(false); // Disable gravity for the player
        this.physics.world.enable(this.my.sprite.player);

        // Creat the food sprites
        my.sprite.food = this.add.sprite(this.foodX, this.foodY, "pizza");

        // Create the three enemy sprites, one for bully, one for popular kid, and one for teacher
        // my.sprite.bully = this.add.sprite(this.enemyX, this.enemyY, "bully");
        // Create the three enemy sprites in a single row
        const numBullies = 5; // Number of bullies in the row
        const startX = 100; // Starting x-coordinate for the first bully
        const paddingX = 200; // Padding between each bully sprite on the x-axis

        for (let i = 0; i < numBullies; i++) {
            const xPos = startX + i * paddingX;
            const yPos = this.enemyY; // Keep the y-coordinate constant for all bullies
            const bullyAssetKey = i % 2 === 0 ? "bully" : "popularKid"; // Alternate between bully and popularKid assets
            my.sprite[`bully${i}`] = this.physics.add.sprite(xPos, yPos, bullyAssetKey);
            my.sprite[`bully${i}`].body.setAllowGravity(false); // Disable gravity for the enemy
            this.physics.world.enable(this.my.sprite[`bully${i}`]);
        }

        this.activeEnemies = numBullies;

        my.sprite.popularKid = this.add.sprite(this.enemyX, this.enemyY, "popularKid");
        my.sprite.teacher = this.add.sprite(this.enemyX - 300, this.enemyY + 300, "teacher");
        my.sprite.teacher.setScale(0.7);

        // Create sprite for furniture
        const furnitureSprites = ["table1", "table2", "chair"];
        this.shuffleArray(furnitureSprites);
        const totalFurnitureWidth = furnitureSprites.length * 100; // Assuming each furniture sprite has a width of 100 pixels

        // Calculate the number of repetitions needed to cover the screen width
        const numRepetitions = Math.ceil(this.sys.game.config.width / totalFurnitureWidth);

        // Calculate the spacing between each furniture sprite
        const spacingX = this.sys.game.config.width / (furnitureSprites.length * numRepetitions + 1);

        // Position the furniture sprites
        let offsetX = spacingX; // Start from the first spacing
        for (let i = 0; i < numRepetitions; i++) {
            furnitureSprites.forEach(spriteName => {
                my.sprite[spriteName] = this.add.sprite(offsetX, this.furnitureY, spriteName);
                offsetX += 100 + spacingX; // Adjust the offset for the next sprite
            });
        }

        my.sprite.popularKid.visible = false;
        my.sprite.teacher.visible = false;

        this.PKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability

        // To end the game early
        if (Phaser.Input.Keyboard.JustDown(this.PKey)) {
            this.isFoodActive = false;
            this.scene.start("gameOverScene");
        }
        
        if (this.AKey.isDown) {
            my.sprite.player.x -= 3;
            my.sprite.food.x -= 3;
        }

        if (this.DKey.isDown) {
            my.sprite.player.x += 3;
            my.sprite.food.x += 3;
        }

        // Since update is called multiple times/second, this.counter acts like
        // a timer, increasing once per clock tick
        this.counter++;

        if (this.counter % 120 == 0) {  // Do this once every 120 calls to update()
            my.sprite.teacher.visible = true;
            my.sprite.teacher.x = -100; // Start the teacher off-screen to the left
            this.tweenTeacher = this.tweens.add({
                targets: my.sprite.teacher,
                x: 2000, // Target x-coordinate
                duration: 10000, // Duration of the tween in milliseconds
                ease: 'Linear', // Easing function
                onComplete: function() {
                    my.sprite.teacher.visible = false; // Hide the teacher after tween completion
                }
            });
        }

        if (Phaser.Input.Keyboard.JustDown(this.spaceKey) && !this.isFoodActive) {
            // Shoot food
            this.throwSound.play();
            let character = my.sprite.player;
            let food = this.physics.add.sprite(character.x, character.y, 'pizza');
            food.setVelocity(character.body.velocity.x, -500);
            
            // Won't let food fall (remove this if you want food to come back to character)
            food.body.setAllowGravity(false); 
            food.body.setBounce(0);

            // Collider to detect collisions between the food and the bullies
            const numBullies = 5; // Number of bullies in the row

            for (let i = 0; i < numBullies; i++) {
                const bully = my.sprite[`bully${i}`];
                this.physics.add.collider(food, bully, this.handleCollision, null, this);
            }

            // Collider to detect collision between food and teacher
            if (my.sprite.teacher.visible) {
                this.physics.overlap(food, my.sprite.teacher, this.teacherHandleCollision, null, this);
            }
    
            this.isFoodActive = true;
    
            this.time.delayedCall(1000, () => {
                this.isFoodActive = false;
            });
        }

        // Move the bullies slowly down
        for (let i = 0; i < 5; i++) { 
            const bully = my.sprite[`bully${i}`];
            if (bully) {
                if (bully.y < my.sprite.player.y) {
                    bully.y += 0.3; // Adjust the increment value as needed to control the speed
                    
                }
                if (bully.y >= my.sprite.player.y) {
                    // Stop moving if the bully's y-coordinate is less than or equal to the player's y-coordinate
                    this.scene.start("gameOverScene");
                    break;
                }
            }
        }
    }
    
    // Randomizes the furniture order for the blockade
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    handleCollision(food, bully) {
        // Remove food projectile and the specific bully sprite that collided with the food
        food.destroy();
        bully.destroy();

        // Decrement the count of active enemies
        this.activeEnemies--;
        playerPoints += 10;
        this.scoreText.setText('Score: ' + playerPoints);

        // Check if there are no more active enemies
        if (this.activeEnemies <= 0) {
            // Trigger game over condition
            this.isFoodActive = false;
            this.scene.start("gameOverScene");
        
        }
    }

    teacherHandleCollision(food, teacher) {
        // Decrement player points when food collides with the teacher
        playerPoints -= 5;
        teacher.destroy();
        food.destroy();
    
        // Update the score text to reflect the new points
        this.scoreText.setText('Score: ' + playerPoints);
    
        // Check if player has run out of points
        if (playerPoints <= 0) {
            // Trigger game over condition
            this.isFoodActive = false;
            this.scene.start("gameOverScene");
        }
    }
}