const desenharForca = (erros = 0) => {
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

    if (erros >= 7) {
        alert('ENFORCADO! \nA palavra correta era ' + PALAVRA_CHAVE + '! Tente novamente.')
    }
}

const tentarLetra = () => {
    try {
        const letra = document.querySelector('#letra').value.toUpperCase();

        if (letra.trim() === '')
            throw new Error('Digite uma letra válida!');

        if (isFinite(parseInt(letra)))
            throw new Error('Digite uma letra válida!');

        if (letrasTentadas.indexOf(letra) > -1)
            throw new Error('Essa letra já foi tentada!');

        letrasTentadas.push(letra);

        if (PALAVRA_CHAVE.indexOf(letra) > -1)
            letrasCorretas.push(letra);
        else
            letrasErradas.push(letra);

        desenharForca(letrasErradas.length);

        console.log({ PALAVRA_CHAVE, letra, letrasTentadas, letrasCorretas, letrasErradas });
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', desenharForca);
document.querySelector('#confirmar-letra').addEventListener('click', tentarLetra);

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");

const PALAVRA_CHAVE = 'TESTE';
const letrasTentadas = [];
const letrasErradas = [];
const letrasCorretas = [];