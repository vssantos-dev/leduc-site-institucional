const botoesDeDetalhe = document.querySelectorAll('.servico-detalhe, .treinamento-detalhe');
const modal = document.querySelector('#servico-modal');
const painelModal = modal.querySelector('.modal-painel');
const fecharModal = modal.querySelector('.modal-fechar');
const imagemModal = modal.querySelector('.modal-imagem');
const tituloModal = modal.querySelector('#modal-titulo');
const resumoModal = modal.querySelector('.modal-resumo');
const detalhesModal = modal.querySelector('.modal-detalhes');
let ultimoBotaoClicado;

function fecharDetalhes() {
    modal.classList.remove('visivel');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-aberto');

    if (ultimoBotaoClicado) {
        ultimoBotaoClicado.setAttribute('aria-expanded', 'false');
        ultimoBotaoClicado.focus();
    }
}

botoesDeDetalhe.forEach((botao) => {
    botao.addEventListener('click', () => {
        const card = botao.closest('.servico-card, .treinamento-card');
        const imagemDoCard = card.querySelector('img');

        ultimoBotaoClicado = botao;
        botao.setAttribute('aria-expanded', 'true');
        imagemModal.src = imagemDoCard.src;
        imagemModal.alt = imagemDoCard.alt;
        tituloModal.textContent = card.querySelector('h3').textContent;
        resumoModal.textContent = card.querySelector(':scope > p').textContent;
        detalhesModal.innerHTML = card.querySelector('.servico-detalhes, .treinamento-detalhes').innerHTML;

        modal.classList.add('visivel');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-aberto');
        fecharModal.focus();
    });
});

fecharModal.addEventListener('click', fecharDetalhes);

modal.addEventListener('click', (evento) => {
    if (evento.target === modal) {
        fecharDetalhes();
    }
});

document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && modal.classList.contains('visivel')) {
        fecharDetalhes();
    }
});

const fotosGaleria = [...document.querySelectorAll('.galeria-foto')];
const botaoAnterior = document.querySelector('.galeria-anterior');
const botaoProxima = document.querySelector('.galeria-proxima');
let primeiraFotoVisivel = 0;

function atualizarGaleria() {
    fotosGaleria.forEach((foto, indice) => {
        const posicao = (indice - primeiraFotoVisivel + fotosGaleria.length) % fotosGaleria.length;

        foto.classList.remove('posicao-0', 'posicao-1', 'posicao-2', 'fora-da-galeria');
        foto.classList.add(posicao < 3 ? `posicao-${posicao}` : 'fora-da-galeria');
        foto.setAttribute('aria-hidden', String(posicao >= 3));
    });
}

botaoProxima.addEventListener('click', () => {
    primeiraFotoVisivel = (primeiraFotoVisivel + 1) % fotosGaleria.length;
    atualizarGaleria();
});

botaoAnterior.addEventListener('click', () => {
    primeiraFotoVisivel = (primeiraFotoVisivel - 1 + fotosGaleria.length) % fotosGaleria.length;
    atualizarGaleria();
});

atualizarGaleria();

const linksInternos = document.querySelectorAll('a[href^="#"]');

linksInternos.forEach((link) => {
    link.addEventListener('click', (evento) => {
        if (link.matches('.navbar-orcamento, .inicio-botao, .modal-detalhes a')) {
            return;
        }

        const destino = document.querySelector(link.getAttribute('href'));

        if (!destino) return;

        evento.preventDefault();

        const inicio = window.scrollY;
        const fim = destino.getBoundingClientRect().top + inicio - 86;
        const duracao = 1100;
        const inicioDaAnimacao = performance.now();
        const suavizar = (progresso) => 1 - Math.pow(1 - progresso, 4);

        function rolar(agora) {
            const progresso = Math.min((agora - inicioDaAnimacao) / duracao, 1);
            window.scrollTo(0, inicio + (fim - inicio) * suavizar(progresso));

            if (progresso < 1) {
                requestAnimationFrame(rolar);
            } else {
                history.replaceState(null, '', link.getAttribute('href'));
            }
        }

        requestAnimationFrame(rolar);
    });
});
