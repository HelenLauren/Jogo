let bola;
let plataforma;
let blocos = [];
let tentativas = 3;
let blocosRestantes;
let gameOver = false;
let vitoria = false;
let reiniciarButton;
let tempoInicial;
let tempoDecorrido = 0;

function setup() {
    console.log("Setup iniciado");
    createCanvas(600, 400);

    reiniciarButton = createButton('REINICIAR JOGO');
    reiniciarButton.position(width / 2 - 80, height / 2 + 80);
    reiniciarButton.size(160, 40);
    reiniciarButton.style('font-size', '18px');
    reiniciarButton.style('font-weight', 'bold');
    reiniciarButton.style('background-color', '#4a4a8a');
    reiniciarButton.style('color', '#ffffff');
    reiniciarButton.style('border', 'none');
    reiniciarButton.style('border-radius', '10px');
    reiniciarButton.style('cursor', 'pointer');
    reiniciarButton.style('box-shadow', '0 4px 8px rgba(0,0,0,0.2)');
    reiniciarButton.mousePressed(reiniciarJogo);
    
    reiniciarButton.hide();

    iniciarJogo();
}

function draw() {
    if (gameOver) {
        background(0);
        fill(255, 0, 0);
        textSize(32);
        textAlign(CENTER, CENTER);
        text("GAME OVER", width / 2, height / 2);
        textSize(16);
        text("Tempo: " + tempoDecorrido + "s", width / 2, height / 2 + 40);
        reiniciarButton.show();
        return;
    }

    if (vitoria) {
        background(0);
        fill(0, 255, 0);
        textSize(32);
        textAlign(CENTER, CENTER);
        text("VITÓRIA!", width / 2, height / 2);
        textSize(16);
        text("Tempo: " + tempoDecorrido + "s", width / 2, height / 2 + 40);
        reiniciarButton.show();
        return;
    }

    background(204, 204, 255);
    bola.mover();
    bola.display();
    bola.colisaoComPlataforma(plataforma);
    bola.colisaoComBorda();
    plataforma.display();
    plataforma.mover();

    for (let i = blocos.length - 1; i >= 0; i--) {
        blocos[i].display();
        if (bola.colisaoComBloco(blocos[i])) {
            blocos.splice(i, 1);
            blocosRestantes--;
        }
    }

    if (blocosRestantes === 0) {
        vitoria = true;
    }

    if (bola.y > height) {
        tentativas--;
        if (tentativas <= 0) {
            gameOver = true;
        } else {
            bola.resetar();
        }
    }

    tempoDecorrido = floor((millis() - tempoInicial) / 1000);
    fill(0);
    textSize(16);
    textAlign(RIGHT, BOTTOM);
    text("Tempo: " + tempoDecorrido + "s", width - 10, height - 10);
}

function iniciarJogo() {
    bola = new Bola();
    plataforma = new Plataforma();

    let numeroDeBlocosPorLinha = 10;
    let numeroDeLinhas = 3;
    let larguraBloco = width / numeroDeBlocosPorLinha;
    let alturaBloco = 40;
    blocosRestantes = numeroDeBlocosPorLinha * numeroDeLinhas;
    blocos = [];

    for (let i = 0; i < numeroDeLinhas; i++) {
        for (let j = 0; j < numeroDeBlocosPorLinha; j++) {
            let x = j * larguraBloco;
            let y = i * alturaBloco;
            blocos.push(new Bloco(x, y, larguraBloco, alturaBloco));
        }
    }

    tentativas = 3;
    gameOver = false;
    vitoria = false;
    reiniciarButton.hide();
    tempoInicial = millis();
}

function reiniciarJogo() {
    reiniciarButton.hide();
    iniciarJogo();
}