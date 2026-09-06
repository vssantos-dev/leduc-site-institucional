const itensDaGaleria = document.querySelectorAll('.catalogo-galeria-item');
const modalPublicacao = document.querySelector('#publicacao-modal');
const fecharPublicacao = document.querySelector('.publicacao-modal-fechar');
const anteriorPublicacao = document.querySelector('.publicacao-modal-anterior');
const proximaPublicacao = document.querySelector('.publicacao-modal-proxima');
const imagemPublicacao = modalPublicacao.querySelector('.publicacao-modal-imagem img');
const tituloPublicacao = modalPublicacao.querySelector('#publicacao-titulo');
const descricaoPublicacao = modalPublicacao.querySelector('.publicacao-modal-texto p');
let ultimoItemDaGaleria;

function fecharVisualizacao() {
    modalPublicacao.classList.remove('visivel');
    modalPublicacao.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('publicacao-aberta');
    ultimoItemDaGaleria?.focus();
}

function abrirVisualizacao(item) {
    const imagem = item.querySelector('img');

    ultimoItemDaGaleria = item;
    imagemPublicacao.src = imagem.src;
    imagemPublicacao.alt = imagem.alt;
    tituloPublicacao.textContent = item.dataset.titulo;
    descricaoPublicacao.textContent = item.dataset.descricao;
    modalPublicacao.classList.add('visivel');
    modalPublicacao.setAttribute('aria-hidden', 'false');
    document.body.classList.add('publicacao-aberta');
    fecharPublicacao.focus();
}

function abrirProximaImagem() {
    const indiceAtual = [...itensDaGaleria].indexOf(ultimoItemDaGaleria);
    const proximoIndice = (indiceAtual + 1) % itensDaGaleria.length;

    abrirVisualizacao(itensDaGaleria[proximoIndice]);
}

function abrirImagemAnterior() {
    const indiceAtual = [...itensDaGaleria].indexOf(ultimoItemDaGaleria);
    const indiceAnterior = (indiceAtual - 1 + itensDaGaleria.length) % itensDaGaleria.length;

    abrirVisualizacao(itensDaGaleria[indiceAnterior]);
}

itensDaGaleria.forEach((item) => {
    item.addEventListener('click', () => abrirVisualizacao(item));
    item.addEventListener('keydown', (evento) => {
        if (evento.key === 'Enter' || evento.key === ' ') {
            evento.preventDefault();
            abrirVisualizacao(item);
        }
    });
});

fecharPublicacao.addEventListener('click', fecharVisualizacao);
anteriorPublicacao.addEventListener('click', abrirImagemAnterior);
proximaPublicacao.addEventListener('click', abrirProximaImagem);

modalPublicacao.addEventListener('click', (evento) => {
    if (evento.target === modalPublicacao) fecharVisualizacao();
});

document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && modalPublicacao.classList.contains('visivel')) {
        fecharVisualizacao();
    }

    if (evento.key === 'ArrowRight' && modalPublicacao.classList.contains('visivel')) {
        abrirProximaImagem();
    }

    if (evento.key === 'ArrowLeft' && modalPublicacao.classList.contains('visivel')) {
        abrirImagemAnterior();
    }
});
