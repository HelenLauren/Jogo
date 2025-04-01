class Bola {
    constructor() {
        this.resetar();
        this.raio = 10;
        this.cor = color(106,90,205);
    }

    resetar() {
        this.x = width / 2;
        this.y = height - 100;
        this.velX = 5 * (random() > 0.5 ? 1 : -1);
        this.velY = -5;
    }

    display() {
        fill(this.cor);
        ellipse(this.x, this.y, this.raio * 2);
    }

    mover() {
        this.x += this.velX;
        this.y += this.velY;
    }

    colisaoComBorda() {
        if (this.x - this.raio < 0 || this.x + this.raio > width) {
            this.velX *= -1;
        }
        if (this.y - this.raio < 0) {
            this.velY *= -1;
        }
    }

    colisaoComPlataforma(plataforma) {
        //vai verificar se há colisão com a plataforma
        if (this.y + this.raio > plataforma.y && 
            this.y - this.raio < plataforma.y + plataforma.altura &&
            this.x + this.raio > plataforma.x && 
            this.x - this.raio < plataforma.x + plataforma.largura) {
            
            //vi calcular o ponto de impacto relativo ao centro da plataforma
            let impacto = (this.x - (plataforma.x + plataforma.largura/2)) / (plataforma.largura/2);
            
            //vai definir a nova direção baseada no ponto de impacto
            this.velX = impacto * 6; // Quanto mais longe do centro, maior o ângulo
            
            //inverte a direção vertical e mantém a velocidade
            this.velY = -abs(this.velY);
            
            //ajusta a posição para evitar colisões múltiplas
            this.y = plataforma.y - this.raio - 1;
        }
    }

    colisaoComBloco(bloco) {
        if (this.x + this.raio > bloco.x && 
            this.x - this.raio < bloco.x + bloco.largura &&
            this.y + this.raio > bloco.y && 
            this.y - this.raio < bloco.y + bloco.altura) {
            
            //vai determinar de que lado a colisão ocorreu
            let overlapX = Math.min(
                Math.abs(this.x + this.raio - bloco.x),
                Math.abs(this.x - this.raio - (bloco.x + bloco.largura))
            );
            
            let overlapY = Math.min(
                Math.abs(this.y + this.raio - bloco.y),
                Math.abs(this.y - this.raio - (bloco.y + bloco.altura))
            );
            
            //colisao laterl 
            if (overlapX < overlapY) {
                this.velX *= -1;
            } 
            //dolisao vertical
            else {
                this.velY *= -1;
            }
            return true;
        }
        return false;
    }
}

