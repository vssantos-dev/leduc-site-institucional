const botoesDeOrcamento = document.querySelectorAll(
    '.navbar-orcamento, .inicio-botao, .modal-detalhes a, .catalogo-servico-card a'
);

document.body.insertAdjacentHTML('beforeend', `
    <div class="orcamento-modal" id="orcamento-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="orcamento-titulo">
        <div class="orcamento-modal-painel">
            <button class="orcamento-modal-fechar" type="button" aria-label="Fechar orçamento">×</button>
            <img class="orcamento-modal-icone" src="img/vetor/escudo.svg" alt="">
            <span class="orcamento-modal-etiqueta">ATENDIMENTO PERSONALIZADO</span>
            <h2 id="orcamento-titulo">Vamos cuidar da segurança da sua empresa.</h2>
            <p>Fale com nossa equipe e receba uma orientação para encontrar a solução mais adequada à sua operação.</p>
            <div class="orcamento-modal-beneficios">
                <span>✓ Atendimento rápido</span>
                <span>✓ Soluções sob medida</span>
                <span>✓ Equipe especializada</span>
            </div>
            <a class="orcamento-modal-whatsapp" href="https://wa.me/" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.8a8.5 8.5 0 0 1-12.57 7.46L3.5 20.5l1.26-4.27A8.5 8.5 0 1 1 20.5 11.8Z"/><path d="M8.75 7.82c.17-.4.35-.42.64-.42h.55c.17 0 .35.02.42.28l.72 1.72c.07.2.05.35-.04.5l-.3.4c-.1.12-.18.21-.08.42.1.2.43.7.92 1.13.63.56 1.16.74 1.36.82.2.08.32.07.44-.05l.56-.65c.14-.16.28-.13.47-.07l1.78.84c.2.1.34.14.39.22.05.08.05.48-.12.94-.17.47-.98.9-1.35.95-.35.05-.8.07-1.3-.1-.3-.1-.7-.23-1.2-.45-2.08-.9-3.44-3.02-3.55-3.16-.11-.15-.85-1.13-.85-2.16 0-1.04.54-1.55.74-1.77Z"/></svg>
                Falar no WhatsApp <b aria-hidden="true">→</b>
            </a>
            <small>Você será direcionado para iniciar a conversa.</small>
        </div>
    </div>
`);

const modalDeOrcamento = document.querySelector('#orcamento-modal');
const fecharOrcamento = modalDeOrcamento.querySelector('.orcamento-modal-fechar');
let ultimoBotaoDeOrcamento;

function fecharModalDeOrcamento() {
    modalDeOrcamento.classList.remove('visivel');
    modalDeOrcamento.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('orcamento-aberto');
    ultimoBotaoDeOrcamento?.focus();
}

botoesDeOrcamento.forEach((botao) => {
    botao.addEventListener('click', (evento) => {
        evento.preventDefault();
        evento.stopImmediatePropagation();
        ultimoBotaoDeOrcamento = botao;
        modalDeOrcamento.classList.add('visivel');
        modalDeOrcamento.setAttribute('aria-hidden', 'false');
        document.body.classList.add('orcamento-aberto');
        fecharOrcamento.focus();
    });
});

fecharOrcamento.addEventListener('click', fecharModalDeOrcamento);

modalDeOrcamento.addEventListener('click', (evento) => {
    if (evento.target === modalDeOrcamento) fecharModalDeOrcamento();
});

document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && modalDeOrcamento.classList.contains('visivel')) {
        fecharModalDeOrcamento();
    }
});
