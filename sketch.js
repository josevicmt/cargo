/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///
///
///
///
///                link do vídeo resolução unidade 2: https://youtu.be/besn542tAQY
///
///
///
///
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//arrays
var personagem, disp, calen, inim, colore;
//variaveis
var modo, gatilho, a, b, pause, triguer = 0, primeiro = false, txt, textY, textW;
//imagens
var persoI;
var sair, count, projetil, inimig, proje, boom, palm1, imageInim, sobreT1, sobreT2, instru1, instru2, pause;
gatilho = false;
instru1 = 'Bem vindo, Cadete, este é o programa inicial de treinamento na Iniciativa Cargo. Suas pontuações serão armazedas, coletadas e analisadas pelo seu orientador. Aqueles com melhor desempenho, serão promovidos a piloto. Lembre-se: destrua as naves com o código de cor indicado no seu painel antes que alcancem a Terra e dê passagem para nossos aliados. Manual inicial da nave em anexo:';
instru2 = 'MOVIMENTAÇÃO:\nW ou Seta Cima -> Cima\nS ou Seta Baixo -> Baixo\nA ou Seta Esquerda -> Esquerda\nD ou Seta Direita -> Direita\nEspaço -> Disparo';
sobreT1 = 'José Tavares\nFunção: programdor';
sobreT2 = '(EF01MA17)\nReconhecer e relacionar períodos do dia, dias da semana e meses do ano, utilizando calendário, quando necessário\n \nNick do Professor idealizador no colabeduc: raulvlb';

count = 0;
sair = false;
pause = false;


/*cor = [
  [0, 255, 0],
  [0, 0, 255],
  [255, 0, 0],
  [255, 255, 255],
  [0, 0, 0]
]*/

function preload() {
  //background
  backM = loadImage('d/backM.jpg');
  backJ = loadImage('d/backJ.jpg');


  //menu
  logo = loadImage('d/CARGo.png');
  play = loadImage('d/pla.png');
  Play = loadImage('d/play.png');
  instr = loadImage('d/instru.png');
  Instr = loadImage('d/instr.png');
  sobre = loadImage('d/sobr.png');
  Sobre = loadImage('d/sobre.png');
  eU = loadImage('d/eu.PNG')

  //jogo
  persoI = loadImage('d/padrao.png');
  inimig = loadImage('d/padrao1.png');
  proje = loadImage('d/disp.png');
  boom = loadImage('d/boom.png');
  palm1 = loadImage('d/palm1.png');

  //palm
  palm = loadImage('d/palm.png');
  //palmS = loadImage('d/palm.png');
  
  //fonte
  lines = loadStrings('d/space.txt');
  font = loadFont('d/AvenirNextLTPro-Demi.otf');
}

a = false;
b = true;


modo = 0;
pause = false;

textY = 800;

function setup() {
  createCanvas(400, 700);
  frameRate(45);
  //translate(width / 2, height / 2);
  textSize(13);
  textAlign(CENTER);
  textStyle(BOLD);
  //textFont(font);
  txt = join(lines, '\n');
  
}

function draw() {
  if (modo == 0) {
    if (!sair){
      background(0);
      push();
      //translate(width/2, height/2)
      textSize(width * 0.04);
      //textAlign(CENTER);
      fill(0,255,0)
      textW = width * 0.6;
      text(txt, 100, textY, textW, txt.length)
      if(textY <= height && textY >= 400){ text('Para Sair pressione "Esc"', 0, 20, 400, 700)}
      pop();
      if(textY>=-txt.length){
        textY -= 1;
      } 
      if (textY<=-txt.length || keyIsDown(27)){
        background(backM);
        menu();
      }      
    }
    if (sair){
      background(backM);
      menu();
    }    
  }
  if (modo == 1) {
    background(backJ);
    jogo();
  }
  triguer += 1;
  
}

function status() {
  image(palm1, 0, 500, 400, 200)
  for (let i = 0; i < personagem[3]; i++) {
    image(persoI, 30 + i * 41, 625, 40, 40);
  }

  push();

  rectMode(CENTER);
  translate(width / 2, height / 2)
  textAlign(CENTER);

  let dia = 1;
  
  let tA = 200;
  let pL = 20;

  let tB = 30;
  let pA = 20;

  let tC = 1;
  
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      let pp;

      i > 0 ? pp = colore[i - 1][j] : 0;

      if (dia) {
        if (i != 0) {
          fill(cor[pp])
        } else {
          fill(255)
        }

        rect(j * pA + tB, i * pL + tA, pA, pL)
        stroke(30);

        let tt = tA + 5;

        if (i == 0) {
          noFill()
          if (j == 0) {
            text('D', j * pA + tB, i * pL + tt, pA, pL)
            //console.log('cuscuz')
          }
          if (j == 1) {
            text('S', j * pA + tB, i * pL + tt, pA, pL)
          }
          if (j == 2) {
            text('T', j * pA + tB, i * pL + tt, pA, pL)
          }
          if (j == 3) {
            text('Q', j * pA + tB, i * pL + tt, pA, pL)
          }
          if (j == 4) {
            text('Q', j * pA + tB, i * pL + tt, pA, pL)
          }
          if (j == 5) {
            text('S', j * pA + tB, i * pL + tt, pA, pL)
          }
          if (j == 6) {
            text('S', j * pA + tB, i * pL + tt, pA, pL)
          }
        } else {
          fill(255)
          text(dia, j * pA + tB, i * pL + tt, pA, pL)

          dia < calen[2] && dia ? dia++ : dia = false;
        }
      }
    }
  }

  text('Pontuação: ' + personagem[5], -100, 240, 400, 60);
  text('Dia: ' + (personagem[6]) + ' Mês: ' + (personagem[7]), -100, 260, 400, 60);
  
  let indexX = personagem[8];
  let indexY = personagem[9];
  let index = colore[indexX][indexY];
  fill(cor[index]);
  rect(-100, 260, pA, pL)
  
  pop();
}

function calendario(){
    cor = [
    [parseInt(Math.random() * 255), parseInt(Math.random() * 255), parseInt(Math.random() * 255)],
    [parseInt(Math.random() * 255), parseInt(Math.random() * 255), parseInt(Math.random() * 255)],
    [parseInt(Math.random() * 255), parseInt(Math.random() * 255), parseInt(Math.random() * 255)],
    [parseInt(Math.random() * 255), parseInt(Math.random() * 255), parseInt(Math.random() * 255)],
    [parseInt(Math.random() * 255), parseInt(Math.random() * 255), parseInt(Math.random() * 255)],
    [parseInt(Math.random() * 255), parseInt(Math.random() * 255), parseInt(Math.random() * 255)]
  ];

  
  // Cria Calendario

  calen = [];

  let hj = day();
  let hjMes;
  
  if (primeiro){
    hjMes = personagem[7];
  }else{
    hjMes = month();
  }

  calen.push(hj);
  calen.push(hjMes);

  if (calen[1] == 4 || calen[1] == 5 || calen[1] == 11 || calen[1] == 9) {
    calen.push(30);
  } else if (calen[1] == 2) {
    calen.push(28);
  } else {
    calen.push(31);
  }
  //console.log(calen)

  colore = [];

  for (let i = 0; i < 6; i++) {
    var f = [];
    for (let j = 0; j < 7; j++) {
      let FA = parseInt(random() * cor.length);
      f.push(FA)
      //console.log(FA)
    }
    colore.push(f);
  }
  //console.log(colore)

}

function newGame() {
  //let c = parseInt(random()*4);
  //            x        y         movr  vida timer pont dia mes diaCorX diaCorY
  personagem = [width / 2, height / 2, true, 3, 15, 0, 1, 1, 0, 0];
  //console.log(personagem)

  //cria matrix de disparos
  disp = [];

  for (let i = 0; i < 20; i++) {
    let c = [];
    for (let j = 0; j < 3; j++) {
      if (j == 0) {
        c.push(a);
      } else {
        c.push(0)
      }
    }
    disp.push(c);
  }
  //console.log(disp)

  //cria matrix de inimgos
  inim = [];

  for (i = 0; i < 6; i++) {
    let n = [];
    for (j = 0; j < 7; j++) {
      n.push();
      if (j == 0 || j == 1) {
        n[j] = a;
      } else if (j == 3) {
        n[j] = -height / 2;
      } else if (j == 5) {
        n[j] = 30;
      } else {
        n[j] = j;
      }

    }
    //console.log(n);
    inim.push(n);
  }
  //console.log(inim)
  calendario();
  primeiro = true;
}

function colisao(id, n) {
  for (j = 0; j < inim.length; j++) {
    //console.log(inim+'a')
    if (inim[j][0] == true) {
      let p;
      if (id == 2) {
        // Disp Inim
        p = parseInt(dist(disp[n][1] + width / 20, disp[n][2] + height / 30, inim[j][3] + width / 20, inim[j][4] + height / 20));
        if (inim[j][1]) {

          if (p < 30) {
            let indexX = personagem[8];
            let indexY = personagem[9];
            let index = colore[indexX][indexY];
            //console.log(index)

            if (index == inim[j][2]) {
              //console.log('inde '+index+'inim '+inim[j][2])
              personagem[3] -= 1;
              //personagem[5] += 50;
            }
            if (index != inim[j][2]) {
              //console.log('erro inde '+index+'inim '+inim[j][2])
              personagem[5] += 10;
              if (personagem[5] % 100 == 0 && personagem[3] < 4){
                personagem[3] +=1;
              }

              //Aletera os dias
              if (personagem[5] % 50 == 0) {
                personagem[9] += 1;
                personagem[6] += 1;

                if (personagem[9] > (colore[0].length - 1)) {
                  personagem[9] = 0;
                  personagem[8] += 1;

                  if (personagem[8] > (colore.length - 1)) {
                    personagem[8] = 0;
                  }
                }

                if (personagem[6] > calen[2]) {
                  personagem[7] += 1;
                  personagem[6] = 1;
                  calendario();
                  if (personagem[7] > 12) {
                    personagem[7] = 1;
                  }
                }
              }
            }
          }
        }
        if (p <= 30) {
          inim[j][1] = false;
          disp[n][0] = false;
          //console.log(personagem)
        }
      }

      // Inim Personagem
      if (id == 1 && personagem[2] == true) {
        p = parseInt(dist(personagem[0] + width / 20, personagem[1] + height / 30, inim[j][3] + width / 20, inim[j][4] + height / 30));
        
        if (p <= 30 && personagem[2] == true) {
          personagem[2] = false;
          personagem[3] -= 1;
          //console.log(personagem[3])
        }
      }
      //console.log(o)
    }
  }
  //return;
}

function inimigo() {

  for (i = 0; i < inim.length; i++) {
    //gera inimigos
    if (!pause) {
      if (inim[i][0] == false && inim[i][0] == false && count == 60) {
        inim[i][0] = b;
        inim[i][1] = b;
        inim[i][2] = parseInt(random() * (cor.length));
        inim[i][3] = parseInt(random() * 370);
        //console.log(inim[i]);
        count = 0;
      }
    }
    //move inimigos
    if (inim[i][0] == true && inim[i][1] == true) {
      if (!pause) {
        inim[i][4] += 5;
      }
      push();
      index = inim[i][2];
      tint(cor[index]);
      image(inimig, inim[i][3], inim[i][4], width / 10, height / 10);
      pop();
      //console.log(inim)
      if (inim[i][4] > height + 60) {
        inim[i][4] = -60;
        inim[i][0] = a;
        inim[i][1] = a;
        let indexX = personagem[8];
        let indexY = personagem[9];
        let index = colore[indexX][indexY];
        
        if (index == inim[i][2]) {
              //console.log('inde '+index+'inim '+inim[j][2])
              personagem[5] += 10;
              //personagem[5] += 50;
            }
            if (index != inim[i][2]) {
              personagem[3] -= 1;
              //console.log(inim)
            }
          }
    }

    //desenha explosoes
    if (inim[i][0] == true && inim[i][1] == false && !pause) {
      image(boom, inim[i][3], inim[i][4], width / 10, height / 10);
      inim[i][5] -= 1;
      //console.log(inim[i]+'gg')
      if (inim[i][5] <= 0) {
        inim[i][4] = -60;
        inim[i][0] = a;
        inim[i][1] = a;
        inim[i][5] = 30;
      }
    }
  }
  count += 1;
  if (count > 60) {
    count = 0;
  }
  return;
}

function disparo() {

  for (i = 0; i < disp.length; i++) {
    //cria disparos
    if (!pause) {
      if (disp[i][0] == false && gatilho && triguer > 3 ){
        disp[i][0] = true;
        disp[i][1] = personagem[0];
        disp[i][2] = personagem[1];
        //console.log(disp);  
        triguer = 0;
        !keyIsDown(32)? gatilho = false: 0;
      }
      //movimenta disparos
      if (disp[i][0] == true) {
        //console.log(disp[i][0])
        disp[i][2] -= 5;
        if (disp[i][2] < 0) {
          disp[i][0] = false;
        }
        colisao(2, i);
      }
    }
    disp[i][0] ? image(proje, disp[i][1], disp[i][2], 40, 60) : 0;
  }
  
  return;
}

function jogo() {

  inimigo();
  disparo();
  colisao(1);
  status();

  //Movimenta e desenha personagem
  if (personagem[3] >= 0) {

    if (personagem[2] == true && !pause) {
      if ((keyIsDown(38) || keyIsDown(87)) && personagem[1] > 10) {
        personagem[1] -= 5;
      }
      if ((keyIsDown(40) || keyIsDown(83)) && personagem[1] < 500 - 70) {
        personagem[1] += 5;
      }
      if ((keyIsDown(39) || keyIsDown(68)) && personagem[0] < width - 50) {
        personagem[0] += 5;
      }
      if ((keyIsDown(37) || keyIsDown(65)) && personagem[0] > 10) {
        personagem[0] -= 5;
      }
    }

    if (personagem[2] == false) {
      personagem[4] -= 1;
      image(boom, personagem[0], personagem[1], width / 10, height / 10);
      if (personagem[4] <= 0) {
        personagem[2] = true;
        personagem[4] = 15;
      }
    } else {
      image(persoI, personagem[0], personagem[1], width / 10, height / 10);
    }
  } else {
    image(boom, personagem[0], personagem[1], width / 10, height / 10);
    if (personagem[4] > -60) {
      personagem[4] -= 1;
    } else {
      modo = 0;
    }
  }
  return;
}

function menu() {
  let xBas, yBas, larg, alt, Logo, play1, instr1, sobre1;

  xBas = width / 4;
  yBas = height / 3;
  larg = width / 2;
  alt = height / 6;

  Logo = logo;
  play1 = Play;
  instr1 = Instr;
  sobre1 = Sobre;

  if (mouseX >= xBas && mouseX <= xBas + larg) {
    if (mouseY >= yBas && mouseY <= yBas + alt) {
      play1 = play;
      if (mouseIsPressed) {
        newGame();
        modo = 1;
      }
    }
    if (mouseY >= yBas + alt && mouseY <= yBas + alt * 2) {
      instr1 = instr;
      if (mouseIsPressed) {
        modo = 2;
      }
    }
    if (mouseY >= yBas + alt * 2 && mouseY <= yBas + alt * 3) {
      sobre1 = sobre;
      if (mouseIsPressed) {
        modo = 3;
      }
    }
  }

  image(logo, xBas, 30, larg, alt);
  image(play1, xBas, yBas, larg, alt);
  image(instr1, xBas, yBas + alt, larg, alt);
  image(sobre1, xBas, yBas + alt * 2, larg, alt);
  //console.log(sair+'22')

  if (modo == 2) {
    image(palm, 0, 0, width, height)
    push();
    textAlign(CENTER);
    fill(255, 255, 255);
    stroke(15);
    text(instru1, 55, 140, 300, 700);
    text(instru2, 55, height / 2 + 55, 300, 700);
    push();
  }
  if (modo == 3) {

    push();
    imageMode(CENTER);
    //translate(width/2,height/2)

    image(palm, width / 2, height / 2, width, height);
    image(eU, width / 2, height / 2 - 170, 150, 150);

    textAlign(CENTER);
    fill(255);
    //text(sobreT1, width / 2 - 80, height / 2 - 170 + 100, 160, 220);
    text(sobreT2, width / 2 - 100, height / 2, 200, 220);
    pop();
  }
  return;
}

function keyPressed() {
  if (keyCode == 32) {
    gatilho = true;
  }
  if (keyCode == 27) {
    sair = true;
    if (modo == 1) {
      if (pause) {
        pause = false;
        //console.log('pause')
      } else {
        pause = true;
        //console.log('pauseT')
      }
    } else {
      modo = 0;
    }
  }
  return;
}