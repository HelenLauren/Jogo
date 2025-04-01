class Plataforma {
    constructor() {
        this.largura = 100;
        this.altura = 20;
        this.x = width / 2 - this.largura / 2;
        this.y = height - this.altura - 10;
        this.velocidade = 10;
    }

    mover() {
        if (keyIsDown(LEFT_ARROW) && this.x > 0) {
            this.x -= this.velocidade;
        }
        if (keyIsDown(RIGHT_ARROW) && this.x < width - this.largura) {
            this.x += this.velocidade;
        }
    }

    display() {
        fill(255);
        noStroke();
        rect(this.x, this.y, this.largura, this.altura);
    }
}
