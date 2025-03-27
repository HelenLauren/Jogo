class Paddle {
    constructor() {
        this.x = width / 2;
        this.y = 570;
        this.w = 100;
        this.h = 15;
    }

    update() {
        this.x = mouseX;

        if (this.x > width - this.w / 2) {
            this.x = width - this.w / 2;
        }

        if (this.x < this.w / 2) {
            this.x = this.w / 2;
        }
    }

    show() {
        noStroke();
        fill(255);
        rectMode(CENTER);
        rect(this.x, this.y, this.w, this.h);
    }
}