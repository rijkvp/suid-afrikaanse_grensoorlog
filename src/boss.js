class Boss {
    constructor(plaatje) {
        this.sprite = plaatje;
        this.levens = 300;
        this.width = plaatje.width / 2;
        this.height = plaatje.height / 2;
        this.x = 100 - this.width / 2;
        this.y = height / 2  - this.height / 2;
        this.isVerslagen = false;
        this.veranderRichting();
        this.schadeTimer = 0;
    }

    veranderRichting() {
        this.snelheidX = random(-5, 5);
        this.snelheidY = random(-2, 2);
        this.richtingTimer = 2.0;
    }

    beweeg() {
        this.richtingTimer -= (deltaTime / 1000);
        if (this.richtingTimer <= 0)
        {
            this.veranderRichting();
        }
        this.x += this.snelheidX;
        this.y += this.snelheidY;
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
    }

    ontvangSchade() {
        this.schadeTimer += (deltaTime / 1000);
        if (this.schadeTimer >= 3.0)
        {
            this.schadeTimer = 0;
            return true;
        }
        return false;
    }

    teken() {
        image(this.sprite, this.x, this.y, this.width, this.height);
    }

    raak(x, y) {
        this.schadeTimer = 0;
        if (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height) {
            this.levens -= 1;
            if (this.levens <= 0)
            {
                this.isVerslagen = true;
            }
            return true;
        }
        return false;
    }
}