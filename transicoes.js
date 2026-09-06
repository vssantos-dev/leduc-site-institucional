document.body.classList.add('transicao-entrada');

const navbarPrincipal = document.querySelector('.navbar');

if (navbarPrincipal) {
    const navegacaoPrincipal = navbarPrincipal.querySelector('.navbar-nav');
    const botaoMenuMobile = document.createElement('button');

    botaoMenuMobile.className = 'navbar-menu-mobile';
    botaoMenuMobile.type = 'button';
    botaoMenuMobile.setAttribute('aria-label', 'Abrir menu');
    botaoMenuMobile.setAttribute('aria-expanded', 'false');
    botaoMenuMobile.innerHTML = '<span></span><span></span><span></span>';
    navbarPrincipal.insertBefore(botaoMenuMobile, navegacaoPrincipal);

    botaoMenuMobile.addEventListener('click', () => {
        const menuEstaAberto = navbarPrincipal.classList.toggle('menu-aberto');
        document.body.classList.toggle('menu-mobile-aberto', menuEstaAberto);
        botaoMenuMobile.setAttribute('aria-expanded', String(menuEstaAberto));
        botaoMenuMobile.setAttribute('aria-label', menuEstaAberto ? 'Fechar menu' : 'Abrir menu');
    });

    navegacaoPrincipal.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navbarPrincipal.classList.remove('menu-aberto');
            document.body.classList.remove('menu-mobile-aberto');
            botaoMenuMobile.setAttribute('aria-expanded', 'false');
            botaoMenuMobile.setAttribute('aria-label', 'Abrir menu');
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 760) {
            navbarPrincipal.classList.remove('menu-aberto');
            document.body.classList.remove('menu-mobile-aberto');
            botaoMenuMobile.setAttribute('aria-expanded', 'false');
        }
    });
}

document.querySelectorAll('a[href]').forEach((link) => {
    link.addEventListener('click', (evento) => {
        const destino = new URL(link.href, window.location.href);
        const mesmaPagina = destino.pathname === window.location.pathname;
        const deveAbrirNovaPagina = !mesmaPagina &&
            destino.origin === window.location.origin &&
            !link.hasAttribute('target') &&
            !link.hasAttribute('download');

        if (!deveAbrirNovaPagina) return;

        evento.preventDefault();
        document.body.classList.remove('transicao-entrada');
        document.body.classList.add('transicao-saida');

        window.setTimeout(() => {
            window.location.href = link.href;
        }, 380);
    });
});
