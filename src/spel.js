class Spel {
    constructor() {
        this.enemies = [];
        this.civilians = [];
        this.enemyImages = [];
        this.civilianImages = [];
        this.tekenMuzzleFlash = false;
        this.inMenu = true;
        this.inIntro = false;
        this.inLevel = false;
        this.recoilX = 0;
        this.recoilY = 0;
    }

    laad() {
        this.normaleScope = loadImage("assets/images/scope.png");
        this.elandScope = loadImage("assets/images/Eland_Scope.png");

        this.backgrounds = {};
        this.backgrounds[1] = loadImage("assets/images/backgrounds/background_1.png");
        this.backgrounds[2] = loadImage("assets/images/backgrounds/background_2.jpg");
        this.backgrounds[3] = loadImage("assets/images/backgrounds/background_3.png");
        this.backgrounds[4] = loadImage("assets/images/backgrounds/background_4.png");

        this.headshotGeluid = loadSound('assets/sounds/Headshot_sound.mp3');

        this.mflashPlaatje = loadImage("assets/images/mflash.png")
        this.hartPlaatje = loadImage("assets/images/heart.png")
        this.profielPlaatje = loadImage("assets/images/profilepic.png");

        // De verschillende wapens
        this.vectorR4 = new Wapen("Vector R4", 30, 2.5, 3.0, loadImage("assets/images/r4.png"), 6, loadSound('assets/sounds/R4_shot.mp3'), loadSound('assets/sounds/R4_reload.mp3'));
        this.fnFAL = new Wapen("FN FAL", 20, 1.5, 5.0, loadImage("assets/images/FAL-rifle.png"), 6, loadSound('assets/sounds/FAL_shot.mp3'), loadSound('assets/sounds/FAL_reload.mp3'));
        this.fnMAG = new Wapen("FN MAG", 100, 6.0, 1.8, loadImage("assets/images/MAG-gun.png"), 1, loadSound('assets/sounds/MAG_shot.mp3'), loadSound('assets/sounds/MAG_reload.mp3'));
        this.eland = new Wapen("Eland", 200, 10.0, 1.0, loadImage("assets/images/Eland.png"), 2, loadSound('assets/sounds/Eland_firing_sound.mp3'), loadSound('assets/sounds/Eland_Reload.mp3'));

        this.enemyImages.push(loadImage("assets/images/enemies/enemy1.png"));
        this.enemyImages.push(loadImage("assets/images/enemies/enemy2.png"));
        this.enemyImages.push(loadImage("assets/images/enemies/enemy3.png"));
        this.enemyImages.push(loadImage("assets/images/enemies/enemy4.png"));
        this.enemyImages.push(loadImage("assets/images/enemies/enemy5.png"));
        this.civilianImages.push(loadImage("assets/images/civilians/civilian_1.png"));
        this.civilianImages.push(loadImage("assets/images/civilians/civilian_2.png"));
        this.civilianImages.push(loadImage("assets/images/civilians/civilian_3.png"));

        this.bossPlaatje = loadImage('assets/images/MPLA_tank.png');

        this.startscreen = loadImage("assets/images/backgrounds/ZuidAfrika1.png");
        this.civilianWarningScreen = loadImage("assets/images/backgrounds/civilians_warning.png");
        this.gameoverScreen = loadImage("assets/images/backgrounds/gameover_screen.png");
        this.victoryScreen = loadImage("assets/images/backgrounds/victory_screen.png");
        this.endScreen = loadImage("assets/images/backgrounds/end_screen.png");
        this.menuSong = loadSound('assets/sounds/diekaplyn.mp3');
        this.endSong = loadSound('assets/sounds/Lied Einde.mp3');
        this.video = createVideo('assets/videos/intro.mp4');
        this.video.hide();
    }

    spawnVijand(aantal) {
        for (var i = 0; i < aantal; i++) {
            var willekeurigeIndex = int(random(0, this.enemyImages.length));
            this.enemies.push(new Enemy(this.enemyImages[willekeurigeIndex]));
        }
    }

    spawnCivilian()
    {
        var willekeurigeIndex = int(random(0, this.civilianImages.length));
        this.civilians.push(new Civilian(this.civilianImages[willekeurigeIndex]));
    }

    startMenu() {
        this.menuSong.loop();
    }

    startLevel(level) {
        this.level = level;
        this.inLevel = true;
        this.inMenu = false;
        this.inIntro = false;
        this.inEndScreen = false;
        this.canvas.show();
        this.video.hide();
        this.video.stop();
        this.menuSong.stop();

        this.enemies.length = 0;
        this.civilians.length = 0;

        this.inBossFight = false;
        switch (level) {
            case 1:
                this.wapen = this.vectorR4;
                this.maxVijanden = 2;
                this.levens = 5;
                this.doel = 250;
                this.tijdOver = 45;
                this.spawnVijanden = true;
                this.spawnCivialians = false;
                this.scopePlaatje = this.normaleScope;
                break;
            case 2:
                this.wapen = this.fnFAL;
                this.maxVijanden = 3;
                this.levens = 6;
                this.doel = 350;
                this.tijdOver = 55;
                this.spawnVijanden = true;
                this.spawnCivialians = true;
                this.scopePlaatje = this.normaleScope;
                break;
            case 3:
                this.wapen = this.fnMAG;
                this.maxVijanden = 5;
                this.levens = 7;
                this.doel = 600;
                this.tijdOver = 70;
                this.spawnVijanden = true;
                this.spawnCivialians = false;
                this.scopePlaatje = this.normaleScope;
                break;
            case 4:
                this.spawnVijanden = false;
                this.tijdOver = 60;
                this.levens = 8;
                this.wapen = this.eland;
                this.scopePlaatje = this.elandScope;
                this.boss = new Boss(this.bossPlaatje);
                this.inBossFight = true;
                this.spawnCivialians = false;
                break;
            default:
                this.wapen = this.fnMAG;
                break;
        }
        this.ammo = this.wapen.maxCapacity;
        this.wapenTimer = 0;
        this.score = 0;
        this.spawnTimer = 0;
        this.civilianTimer = 0;
        this.civiliansGeraakt = 0;
    }

    startIntro() {
        this.inIntro = true;
        this.inLevel = false;
        this.inMenu = false;
        this.canvas.hide();
        this.video.show();
        this.video.play();
        this.video.size(windowWidth, windowHeight);
        this.menuSong.stop();
    }

    update() {
        if (this.inMenu) {
            cursor(ARROW);
            if (keyIsDown(32)) {
                this.startIntro();
            }
        } else if (this.inIntro) {
            if (keyIsDown(ENTER)) {
                this.startLevel(1)
            }
        }
        else if (this.inLevel) {
            noCursor();
            imageMode(CORNER)

            // Dikke cheat
            if (keyIsDown(87)) {
                this.score += 100;
            }

            if (mouseIsPressed) {
                if (this.wapenTimer <= 0 && !this.wapen.reloadGeluid.isPlaying()) {
                    if (this.ammo == 0) {
                        this.herlaad();
                    }
                    else {
                        this.schiet();
                    }
                }
            }

            for (var i = 0; i < this.enemies.length; i++) {
                this.enemies[i].beweeg();
                if (this.enemies[i].verloopTijd()) {
                    this.levens--;
                    this.score -= 15;
                }
            }

            for (var i = this.enemies.length - 1; i >= 0; i--) {
                if (this.enemies[i].isDood) {
                    this.enemies.splice(i, 1);
                }
            }

            for (var i = 0; i < this.civilians.length; i++) {
                this.civilians[i].beweeg();
                this.civilians[i].verloopTijd();
            }

            for (var i = this.civilians.length - 1; i >= 0; i--) {
                if (this.civilians[i].isDood) {
                    this.civilians.splice(i, 1);
                }
            }

            if (this.inBossFight) {
                this.boss.beweeg();
                if (this.boss.ontvangSchade()) {
                    this.levens--;
                }
            }

            if (this.spawnVijanden) {
                this.spawnTimer -= (deltaTime / 1000);

                if (this.enemies.length == 0 && this.spawnTimer > 0.8) {
                    this.spawnTimer = 0.8;
                } else if (this.enemies.length == this.maxVijanden) {
                    this.spawnTimer = 2.0;
                }

                if (this.spawnTimer <= 0) {
                    if (this.enemies.length < this.maxVijanden) {
                        this.spawnTimer = random(0.5, 1.5);
                        this.spawnVijand(1);
                    }
                }
            }

            if (this.spawnCivialians) {
                if (this.civilianTimer > 0) {
                    this.civilianTimer -= (deltaTime / 1000);
                } else {
                    this.spawnCivilian();
                    this.civilianTimer = random(3, 6);
                }
            }

            if (this.wapenTimer > 0) {
                this.wapenTimer -= (deltaTime / 1000);
            }

            this.recoilX /= 1.2;
            this.recoilY /= 1.2;

            this.tijdOver -= (deltaTime / 1000);
            if (this.score >= this.doel) {
                this.inLevel = false;
                this.gameOver = false;
                this.inEndScreen = false;
                if (this.level == 4) {
                    this.inEndScreen = true;
                }
            }
            if (this.inBossFight) {
                if (this.boss.isVerslagen) {
                    this.inLevel = false;
                    this.gameOver = false;
                    this.inEndScreen = true;
                }
            }
            if (this.tijdOver <= 0.0 || this.levens <= 0 || this.civiliansGeraakt >= 3) {
                this.inLevel = false;
                this.gameOver = true;
            }
        } else if (this.inCivilianWaarschuwing)
        {
            if (keyIsDown(ENTER)) {
                this.startLevel(2);
                this.inCivilianWaarschuwing = false;
            }
        } 
        else if (this.inEndScreen) {
            if (!this.endSong.isPlaying()) {
                this.endSong.loop();
            }
            if (keyIsDown(ENTER)) {
                this.endSong.stop();
                this.inEndScreen = false;
                this.inMenu = true;
                this.startMenu();
            }
        } else {
            if (this.gameOver) {
                if (keyIsDown(32)) {
                    this.startLevel(this.level);
                }
            } else {
                if (keyIsDown(32)) {
                    if (this.level == 1)
                    {
                        this.civilianWaarschuwing();
                    } 
                    else
                    {
                        this.startLevel(this.level + 1);
                    }
                }
            }
        }
    }

    civilianWaarschuwing()
    {
        this.inCivilianWaarschuwing = true;
        this.inLevel = false;
        this.inMenu = false;
        this.inIntro = false;
        this.inEndScreen = false;
    }

    schiet() {
        // Shiet de kogel
        this.wapenTimer = 1.0 / this.wapen.rof;
        this.wapen.shietGeluid.play();
        this.ammo--;

        // Muzzle Flash effect
        this.tekenMuzzleFlash = true;
        this.muzzleX = mouseX - this.recoilX;
        this.muzzleY = mouseY - this.recoilY;

        // Raak vijanden
        var geraakt = false;
        for (var i = 0; i < this.enemies.length; i++) {
            var resultaat = this.enemies[i].valMisschienDood(mouseX - this.recoilX, mouseY - this.recoilY);
            if (resultaat == 2) {
                this.score += 25;
                this.headshotGeluid.play();
                geraakt = true;
            } else if (resultaat == 1) {
                this.score += 10;
                geraakt = true;
            }
        }

        // Raak boss
        if (this.inBossFight) {
            if (this.boss.raak(mouseX - this.recoilX, mouseY - this.recoilY)) {
                geraakt = true;
            }
        }

        // Raak civilians
        this.civilians.forEach(civilian => {
            if (civilian.wordtPerongelukGeraakt(mouseX - this.recoilX, mouseY - this.recoilY)) {
                this.levens--;
                this.score -= 100;
                this.civiliansGeraakt++;
            }
        });


        // Score omlaag als geen vijanden worden geraakt
        if (!geraakt) {
            this.score -= this.wapen.verliesPunten;
        }

        // Recoil effect
        this.recoilY += this.wapen.recoilAmount * random(50, 70);
        this.recoilX += this.wapen.recoilAmount * random(-10, 10);
    }

    herlaad() {
        this.wapen.reloadGeluid.play();
        this.ammo = this.wapen.maxCapacity;
    }

    teken() {
        if (this.inMenu) {
            textFont('monospace');
            cursor(ARROW);
            image(this.startscreen, 0, 0, width, height);
            fill(0);
            textStyle(BOLD);
            textAlign(CENTER, CENTER);
            textSize(48);
            text("[SPATIE] BEKIJK INTRO / VOLGEND LEVEL", width / 2, height / 2 + 200);
            textSize(32);
            text("[ENTER] START GAME / SKIP INTRO", width / 2, height / 2 + 250);
            text("[LEFT MOUSE] SCHIET", width / 2, height / 2 + 280);
            textSize(28);
            text("Uitleg: Haal het puntendoel binnen het tijdslimiet. Je krijgt 10 punten voor elke vijand die je uitschakeld. Een headshot is 25 punten. Schiet niet mis want dan verlies je punten. Als je de vijanden niet uitschakeld binnen een bepaalde tijd verlies je levens en punten. Je hebt gameover als je levens op zijn of als de tijd over is.", 150, height / 2 + 220, width - 150, 400);
        } else if (this.inIntro) {
            background(255, 0, 255);
        }
        else if (this.inLevel) {
            imageMode(CORNER);
            background(this.backgrounds[this.level]);

            this.enemies.forEach(enemy => {
                enemy.teken();
            })
            this.civilians.forEach(civilian => {
                civilian.teken();
            })

            if (this.inBossFight) {
                this.boss.teken();
            }

            fill(0)
            textSize(36);
            textStyle(BOLD);
            textAlign(LEFT);
            if (!this.wapen.reloadGeluid.isPlaying())
            {
                text(this.wapen.naam + " - " + this.ammo + "/" + this.wapen.maxCapacity, width - 420, height - 200);
            } else
            {
                text(this.wapen.naam + " - HERLADEN...", width - 420, height - 200);
            }
            image(this.wapen.plaatje, width - this.wapen.plaatje.width / 2 - 100,
                height - this.wapen.plaatje.height / 2 - 50, this.wapen.plaatje.width / 2, this.wapen.plaatje.height / 2);

            if (this.tekenMuzzleFlash) {
                image(this.mflashPlaatje, this.muzzleX + 30 - 250, this.muzzleY - 10 - 250, 500, 500);
                this.tekenMuzzleFlash = false;
            }

            // HUD
            fill('rgba(0%,0%,0%,0.3)');
            rect(0, 0, width, 64);
            textFont('monospace');
            fill(250);
            textSize(36);
            textAlign(CENTER, CENTER);
            textStyle(BOLD);
            if (!this.inBossFight) {
                text(this.score + "/" + this.doel, width / 2, 32);
            } else {
                text("MPLA Levens: " + this.boss.levens, width / 2, 32);
            }
            text("TIJD: " + this.tijdOver.toFixed(2) + "s", 300, 32);
            text("LEVEL: " + this.level, width - 300, 32);

            image(this.profielPlaatje, 0, 0, this.profielPlaatje.width / 5, this.profielPlaatje.height / 5)

            // Healthbar
            for (var i = 0; i < this.levens; i++) {
                noStroke();
                fill(200, 20, 20)
                const HEART_SIZE = 80;
                imageMode(CENTER);
                image(this.hartPlaatje, .5 * HEART_SIZE + i * HEART_SIZE + 10, windowHeight - 50, HEART_SIZE, HEART_SIZE);
            }
            imageMode(CORNER)
            image(this.scopePlaatje, mouseX - 250 - this.recoilX, mouseY - 250 - this.recoilY, 500, 500);
        } else if (this.inEndScreen) {
            cursor(ARROW);
            image(this.endScreen, 0, 0, width, height);
        }
        else if (this.inCivilianWaarschuwing) {
            cursor(ARROW);

            image(this.civilianWarningScreen, 0, 0, width, height);
        }
        else {
            cursor(ARROW);

            
            textAlign(CENTER, CENTER);
            textFont('monospace');
            textSize(84);

            if (this.gameOver) {
                fill(0);
                image(this.gameoverScreen, 0, 0, width, height);
                textStyle(NORMAL);
                textSize(32);
                if (!this.inBossFight) {
                    text("Score: " + this.score + "/" + this.doel, width / 2, height / 2 + 50);
                }
                else {
                    text("MPLA Levens: " + this.boss.levens, width / 2, 32);
                }
            } else {
                fill(255);
                image(this.victoryScreen, 0, 0, width, height);
                textStyle(BOLD);
                text("LEVEL " + this.level + "  GEHAALD!", width / 2, height / 2 - 100);
                textStyle(NORMAL);
                textSize(32);
                text("Tijd over: " + this.tijdOver.toFixed(2) + "s", width / 2, height / 2 + 50);
            }
        }
    }
}

var spel = new Spel();

function preload() {
    spel.laad();
}

function setup() {
    frameRate(60);
    spel.canvas = createCanvas(windowWidth, windowHeight);
    spel.startMenu();
}

function draw() {
    spel.update();
    spel.teken();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}