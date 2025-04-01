class Bloco {
    constructor(x, y, largura, altura) {
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
    }

    display() {
        fill(178, 102, 255);
        stroke(0);
        strokeWeight(2);
        rect(this.x, this.y, this.largura, this.altura);
    }
}
