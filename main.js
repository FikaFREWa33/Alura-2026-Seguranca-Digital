const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;

const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.parametro-senha-checkbox input');

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';
const forcaSenha = document.querySelector('.forca');

function classificaSenha(tamanhoAlfabeto){
    const valorEntropia = document.querySelector('.entropia');
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    valorEntropia.textContent = "Um computador pode levar até " + Math.floor(2**entropia/(100e6*60*60*24)) + " dias para descobrir essa senha.";
    console.log(entropia);
    forcaSenha.classList.remove('fraca','media','forte');
    if (tamanhoSenha > 57){
        forcaSenha.classList.add('forte');
    } else if (tamanhoSenha > 35 && tamanhoSenha < 57 ) {
        forcaSenha.classList.add('media');
    } else if (tamanhoSenha <= 35){
        forcaSenha.classList.add('fraca');
    }
}

// Atualiza número de caracteres na tela
numeroSenha.textContent = tamanhoSenha;

// Configura eventos dos botões
botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

// Configura eventos dos checkboxes
for (let i = 0; i < checkbox.length; i++){
    checkbox[i].onclick = geraSenha;
}

// Gera a senha inicial
geraSenha();


function diminuiTamanho(){
    if (tamanhoSenha > 1){
        //tamanhoSenha = tamanhoSenha-1;
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}
function aumentaTamanho(){
    if (tamanhoSenha < 20){
       //tamanhoSenha = tamanhoSenha+1;
       tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

function geraSenha(){
    let alfabeto = '';
    if (checkbox[0].checked){
        alfabeto = alfabeto + letrasMaiusculas;
    }
    if (checkbox[1].checked){
        alfabeto = alfabeto + letrasMinusculas;
    }
    if (checkbox[2].checked){
        alfabeto = alfabeto + numeros;
    }
    if (checkbox[3].checked){
        alfabeto = alfabeto + simbolos;
    }
    console.log(alfabeto);
    let senha = '';
    for (let i = 0; i < tamanhoSenha;i++){
        let numeroAleatorio = Math.random()*alfabeto.length;
        numeroAleatorio = Math.floor(numeroAleatorio);
        senha = senha + alfabeto[numeroAleatorio];
    }
    campoSenha.value = senha;
    classificaSenha(alfabeto.length);
}