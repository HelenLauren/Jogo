class Ball {
    constructor() {
        this.pos = createVector(width / 2, height / 2);
        this.r = 20;
        this.vel = createVector(2, 2);
        this.img = loadImage('gatinho.png'); // Adicione o caminho da imagem
    }

    update() {
        this.pos.add(this.vel);

        if (this.pos.x <= this.r || this.pos.x >= width - this.r) {
            this.vel.x = -this.vel.x;
        }

        if (this.pos.y <= this.r) {
            this.vel.y = -this.vel.y;
        }

        if (this.pos.y > height + this.r) {
            this.pos.set(width / 2, height / 2);
            this.vel.set(2, 2);
            let angle = random(-PI / 4, -3 * PI / 4);
            this.vel.x = 5 * cos(angle);
            this.vel.y = 5 * sin(angle);
        }
    }

    edge(p) {
        let left = p.x - p.w / 2;
        let right = p.x + p.w / 2;
        let top = p.y - p.h / 2;
        let bottom = p.y;

        if (this.pos.x > left && this.pos.x < right && this.pos.y > top && this.pos.y < bottom) {
            this.vel.y *= -1;
            this.vel.x = (this.pos.x - p.x) * 0.05;
        }
    }

    show() {
        imageMode(CENTER);
        image(this.img, this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }
}
