const cardResultado = document.querySelector('#card-resultado');
const cardMensagem = document.querySelector('#card-mensagem');

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");

const temas = [
    {
        tema: "Esporte",
        palavras: [
            "FUTEBOL",
            "BASQUETE",
            "TENIS",
            "NATACAO",
            "CORRIDA",
            "CICLISMO",
            "VOLEI",
            "BOXE",
            "SURFE",
            "GOLF"
        ]
    },
    {
        tema: "Animal",
        palavras: [
            "CACHORRO",
            "GATO",
            "LEAO",
            "TIGRE",
            "ELEFANTE",
            "GIRAFA",
            "MACACO",
            "URSO",
            "AGUIA",
            "COBRA"
        ]
    },
    {
        tema: "Alimento",
        palavras: [
            "ARROZ",
            "FEIJAO",
            "CARNE",
            "FRANGO",
            "MACA",
            "BANANA",
            "PAO",
            "LEITE",
            "OVO",
            "QUEIJO"
        ]
    },
    {
        tema: "País",
        palavras: [
            "BRASIL",
            "CANADA",
            "JAPAO",
            "FRANCA",
            "ALEMANHA",
            "ITALIA",
            "EGITO",
            "CHINA",
            "AUSTRALIA",
            "MEXICO"
        ]
    },
    {
        tema: "Profissão",
        palavras: [
            "MEDICO",
            "PROFESSOR",
            "ENGENHEIRO",
            "ADVOGADO",
            "PROGRAMADOR",
            "BOMBEIRO",
            "POLICIAL",
            "CANTOR",
            "MOTORISTA",
            "PADEIRO"
        ]
    }
];

// Pega um número aleatório de 0 a 4 e seleciona um tema
const indexTema = Math.trunc((Math.random() * 10) / 2);
const TEMA_ESCOLHIDA = temas[indexTema].tema;

// Pega um número aleatório de 0 a 9 e seleciona uma palavra
const indexPalavra = Math.trunc((Math.random() * 10));
const PALAVRA_ESCOLHIDA = temas[indexTema].palavras[indexPalavra];

// Adicionar tema na tela
const p = document.createElement('p');
p.innerHTML = TEMA_ESCOLHIDA;
cardResultado.appendChild(p);

const letrasTentadas = [];
const letrasErradas = [];
const letrasCorretas = [];

const mostrarMensagemErro = (mensagem) => {
    cardMensagem.innerHTML = mensagem;
}

const mostrarGanhouJogo = () => {
    cardResultado.innerHTML = '';

    const h3 = document.createElement('h3');
    h3.innerHTML = 'VOCÊ GANHOU!';
    cardResultado.appendChild(h3);

    const p = document.createElement('p');
    p.innerHTML = 'Clique em "Tente novamente" para reiniciar o jogo';
    cardResultado.appendChild(p);

    const btn = document.createElement('button');
    btn.innerHTML = 'Tente novamente';
    btn.onclick = () => location.reload();
    cardResultado.appendChild(btn);

    cardResultado.classList.add('sucesso');

    document.querySelector('fieldset').disabled = true;
}

const mostrarPerdeuJogo = () => {
    cardResultado.innerHTML = '';

    const h3 = document.createElement('h3');
    h3.innerHTML = 'A PALAVRA ERA: ' + PALAVRA_ESCOLHIDA + '!';
    cardResultado.appendChild(h3);

    const p = document.createElement('p');
    p.innerHTML = 'Clique em "Tente novamente" para reiniciar o jogo';
    cardResultado.appendChild(p);

    const btn = document.createElement('button');
    btn.innerHTML = 'Tente novamente';
    btn.onclick = () => location.reload();
    cardResultado.appendChild(btn);

    cardResultado.classList.add('erro');

    document.querySelector('fieldset').disabled = true;
}

const desenharForca = (letrasCorretas = [], letrasErradas = []) => {
    console.log({ TEMA_ESCOLHIDA, PALAVRA_ESCOLHIDA })

    const erros = letrasErradas.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhando a forca
    ctx.fillRect(50, 50, 4, 200);
    ctx.fillRect(50, 50, 100, 4);
    ctx.fillRect(150, 50, 4, 25);

    if (erros >= 1) {
        // Cabeça
        ctx.beginPath();
        ctx.arc(152, 100, 20, 0, Math.PI * 2, true);
        ctx.stroke();
    }

    if (erros >= 2) {
        // Corpo
        ctx.fillRect(152, 120, 1, 60);
    }

    if (erros >= 3) {
        // Braço Esquerdo
        ctx.beginPath();
        ctx.moveTo(152, 130);
        ctx.lineTo(132, 160);
        ctx.stroke();
    }

    if (erros >= 4) {
        // Braço Direito
        ctx.beginPath();
        ctx.moveTo(153, 130);
        ctx.lineTo(172, 160);
        ctx.stroke();
    }

    if (erros >= 5) {
        // Perna Esquerda
        ctx.beginPath();
        ctx.moveTo(152, 180);
        ctx.lineTo(132, 210);
        ctx.stroke();
    }

    if (erros >= 6) {
        // Perna Direita
        ctx.beginPath();
        ctx.moveTo(153, 180);
        ctx.lineTo(172, 210);
        ctx.stroke();
    }

    const LETRA_LEFT_INIT = 190;
    const LETRA_WIDTH = 30;
    const LETRA_PADDING = 4;
    const FONT_STYLE = "20px sans-serif";

    PALAVRA_ESCOLHIDA.split('').forEach((letra, index) => {
        let x = 0;
        let y = 248;

        ctx.font = FONT_STYLE;
        if (index > 0) {
            x = (LETRA_LEFT_INIT + (LETRA_PADDING * index) + (index * LETRA_WIDTH));

            if (letrasCorretas && letrasCorretas.indexOf(letra) > -1)
                ctx.fillText(letra, x + 10, y - 1);
        } else {
            x = (LETRA_LEFT_INIT + (index * LETRA_WIDTH));

            if (letrasCorretas && letrasCorretas.indexOf(letra) > -1)
                ctx.fillText(letra, x + 10, y - 1);
        }

        ctx.fillRect(x, y, LETRA_WIDTH, 2);
    });

    letrasErradas.forEach((letra, index) => {
        const x = 200;
        const y = 50;

        ctx.font = FONT_STYLE;
        ctx.fillText(letra, x + (20 * index), y);
    })
}

const tentarLetra = () => {
    mostrarMensagemErro('');

    try {
        const letra = document.querySelector('#letra').value.toUpperCase();

        document.querySelector('#letra').value = '';

        if (letra.trim() === '')
            throw new Error('Digite uma letra válida!');

        if (isFinite(parseInt(letra)))
            throw new Error('Digite uma letra válida!');

        if (!/^[A-Z]+$/.test(letra))
            throw new Error('Digite uma letra válida!');

        if (letrasTentadas.indexOf(letra) > -1)
            throw new Error('Essa letra já foi tentada!');

        // Adiciona nas letras tentadas
        letrasTentadas.push(letra);

        // Se a letra estiver na palavra escolhida
        if (PALAVRA_ESCOLHIDA.indexOf(letra) > -1)
            letrasCorretas.push(letra);
        else
            letrasErradas.push(letra);

        // Redesenha a forca
        desenharForca(letrasCorretas, letrasErradas);

        // Se todas letras corretas estiverem na palavra certa, mostra vitória
        if (PALAVRA_ESCOLHIDA.split('').every(item => letrasCorretas.includes(item)))
            mostrarGanhouJogo();

        // Se errar sete vezes, mostra derrota
        if (letrasErradas.length >= 7)
            mostrarPerdeuJogo();

        console.log({ letra, letrasTentadas, letrasCorretas, letrasErradas });
    } catch (error) {
        mostrarMensagemErro(error.message)
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', () => desenharForca());
document.querySelector('#confirmar-letra').addEventListener('click', tentarLetra);
