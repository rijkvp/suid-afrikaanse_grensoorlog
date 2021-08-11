class Civilian {
    constructor(plaatje) {
        this.sprite = plaatje;
        this.width = this.sprite.width / 2;
        this.height = this.sprite.height / 2;
        this.x = random(0, width - this.width);
        this.y = random(0, height - this.height);
        this.isDood = false;
        this.lifeTime = 8;
        this.snelheidX = random(-5, 5);
        this.snelheidY = random(-1, 1);
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
        this.lifeTime -= (deltaTime / 1000);
        if (this.lifeTime < 0) {
            this.isDood = true;
            return true;
        }
        return false;
    }

    teken() {
        image(this.sprite, this.x, this.y, this.width, this.height);
    }

    wordtPerongelukGeraakt(x, y) {
        if (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height) {
            this.isDood = true;
            console.log("GERAAKT!");
            return true;
        }
        return false;
    }
}