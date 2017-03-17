
var state = 'init';
var posx; // posição horizontal da mão
var currentx;
var nextstate = 'init';

var options ={
refresh: 15 // tempo para reiniciar depois de uma detecção
};


matrix.led([
          {
            arc: 270,
            color: 'blue',
            start: 110
          }
        ]).render();

matrix.service('palm',options ).start().then(function locat(data){
	console.log("Tentando");
 var exec = require('child_process').exec;
 switch (state) {
    case 'init': //Estado inicial, espera encontrar a posição inicial da mao
    matrix.led('green').render();
    posx =  data.location.x;
    nextstate = 'recog';
    break;

    case 'recog': // procura a direção do deslocamento da mao
    if (posx/100 > data.location.x/100) {
      matrix.led([    //arco de led para direita
                {
                  arc: 180,
                  color: 'blue',
                  start: 270
                }
              ]).render();
	     
	      
	      exec("python client.py", null);
              nextstate = 'delay';
    } else if (posx/100 < data.location.x/100) {
      matrix.led([//arco de led para esquerda
                {
                  arc: 180,
                  color: 'blue',
                  start: 90
                }
              ]).render();
	      exec("python client.py", null);
              nextstate = 'delay';
    }else{
      matrix.led("purple").render();
    }
      break;

      case 'delay': //estado de espera
      matrix.led('orange').render();
      nextstate = 'delay2';
      break;

      case 'delay2': //resetando pra o inicial
      matrix.led('black').render();
      nextstate = 'init';
      break;
  }

  setInterval(function () {
        state = nextstate;
  }, 500);

});
