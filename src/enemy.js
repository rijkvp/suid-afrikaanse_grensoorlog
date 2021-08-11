class Enemy {
    constructor(plaatje) {
        this.sprite = plaatje;
        this.width = this.sprite.width / 4;
        this.height = this.sprite.height / 4;
        this.x = random(0, width - this.width);
        this.y = random(0, height - this.height);
        this.isDood = false;
        this.lifeTime = 5;
        this.snelheidX = random(-5, 5);
        this.snelheidY = random(-1, 1);

        this.headShotX = this.x + 0.3 * this.width;
        this.headShotY = this.y;
        this.headShotWidth = this.width - 0.6 * this.width;
        this.headShotHeight = 0.2 * this.height;
    }

    beweeg()
    {
        this.x += this.snelheidX;
        this.y += this.snelheidY;
        this.x = this.x % width;
        this.y = this.y % width;
        if (this.x > width)
        {
            this.x -= width;
        } else if (this.x < 0)
        {
            this.x += width;
        }
        if (this.y > height)
        {
            this.y -= height;
        } else if (this.y < 0)
        {
            this.y += this.height;
        }
        this.headShotX = this.x + 0.3 * this.width;
        this.headShotY = this.y;
    }

    verloopTijd() { 
        // Verloop tijd
        this.lifeTime -= (deltaTime / 1000);
        if (this.lifeTime < 0) {
            this.isDood = true;
            return true;
        }
        return false;
    }

    teken() {
        // fill('rgba(100%,10%,10%,0.16)');
        // rect(this.x, this.y, this.width, this.height);
        // fill('rgba(10%,100%,10%,0.26)');
        // rect(this.headShotX, this.headShotY, this.headShotWidth, this.headShotHeight);
        image(this.sprite, this.x, this.y, this.width, this.height);
    }

    valMisschienDood(x, y) {
        if (x > this.headShotX && x < this.headShotX + this.headShotWidth && y > this.headShotY && y < this.headShotY + this.headShotHeight)
        {
            this.isDood = true;
            return 2;
        }
        else if (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height) {
            this.isDood = true;
            return 1;
        }
        return 0;
    }
}