
/* ====================================
   JAVASCRIPT PARA FUNCIONALIDADES
   ==================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('🚁 PHS AgroVoo - Site carregado com sucesso!');
    
    // ====================================
    // NAVEGAÇÃO MOBILE (MENU HAMBÚRGUER)
    // ====================================
    
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            console.log('Menu mobile acionado');
        });
    }
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // ====================================
    // HEADER COM SCROLL
    // ====================================
    
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ====================================
    // SCROLL SUAVE PARA ÂNCORAS
    // ====================================
    
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                console.log('Navegação suave para:', targetId);
            }
        });
    });
    
    // ====================================
    // ANIMAÇÃO DE ENTRADA DOS ELEMENTOS
    // ====================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observerCallback = function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const animatedElements = document.querySelectorAll('.servico-card, .sobre-content, .regiao-content, .contato-content');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(40px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
    
    // ====================================
    // LOADING DAS IMAGENS
    // ====================================
    
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.filter = 'brightness(1.1) contrast(1.1)';
        });
        
        if (img.complete) {
            img.style.opacity = '1';
            img.style.filter = 'brightness(1.1) contrast(1.1)';
        }
    });
    
    // ====================================
    // BOTÕES DE CONTATO COM FEEDBACK
    // ====================================
    
    const whatsappBtns = document.querySelectorAll('.contato-btn.whatsapp, .btn-primary');
    whatsappBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('🔥 Clique no WhatsApp - Possível lead!');
            
            // Feedback visual
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Alerta de sucesso
            mostrarAlerta('✅ Redirecionando para WhatsApp...');
        });
    });
    
    const instagramBtns = document.querySelectorAll('.contato-btn.instagram, .btn-secondary');
    instagramBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('📸 Clique no Instagram - Visualização de portfólio');
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            mostrarAlerta('📸 Abrindo Instagram...');
        });
    });
    
    // ====================================
    // DESTACAR LINK ATIVO NA NAVEGAÇÃO
    // ====================================
    
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveNavLink() {
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveNavLink);
    
    // ====================================
    // FUNÇÃO PARA MOSTRAR ALERTAS
    // ====================================
    
    function mostrarAlerta(mensagem) {
        // Remove alertas anteriores
        const alertaAnterior = document.querySelector('.alerta-personalizado');
        if (alertaAnterior) {
            alertaAnterior.remove();
        }
        
        // Cria novo alerta
        const alerta = document.createElement('div');
        alerta.className = 'alerta-personalizado';
        alerta.innerHTML = mensagem;
        alerta.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #f97316, #ea580c);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            font-weight: 600;
            box-shadow: 0 10px 25px rgba(249, 115, 22, 0.4);
            z-index: 9999;
            animation: slideInRight 0.5s ease;
        `;
        
        document.body.appendChild(alerta);
        
        // Remove após 3 segundos
        setTimeout(() => {
            alerta.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => {
                alerta.remove();
            }, 500);
        }, 3000);
    }
    
    // Adiciona CSS das animações dos alertas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ====================================
    // ANALYTICS BÁSICO
    // ====================================
    
    console.log('📊 Informações do usuário:');
    console.log('   • Dispositivo:', window.innerWidth <= 768 ? 'Mobile' : 'Desktop');
    console.log('   • Resolução:', window.innerWidth + 'x' + window.innerHeight);
    console.log('   • Hora de acesso:', new Date().toLocaleString('pt-BR'));
    
    // Rastrear tempo na página
    const inicioTempo = Date.now();
    window.addEventListener('beforeunload', function() {
        const tempoTotal = Math.round((Date.now() - inicioTempo) / 1000);
        console.log(`⏱️ Tempo total na página: ${tempoTotal} segundos`);
    });
    
    // ====================================
    // OTIMIZAÇÃO DE PERFORMANCE
    // ====================================
    
    let ticking = false;
    
    function updateOnScroll() {
        highlightActiveNavLink();
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
    
});

// ====================================
// FUNÇÕES GLOBAIS PARA OS BOTÕES
// ====================================

function abrirWhatsApp(servico) {
    let mensagem = "Olá! Gostaria de solicitar um orçamento para filmagem com drone.";
    
    switch(servico) {
        case 'agronegocio':
            mensagem = "Olá! Gostaria de um orçamento para filmagem com drone no AGRONEGÓCIO.";
            break;
        case 'eventos':
            mensagem = "Olá! Gostaria de um orçamento para filmagem com drone em EVENTOS.";
            break;
        case 'inspecoes':
            mensagem = "Olá! Gostaria de um orçamento para INSPEÇÃO TÉCNICA com drone.";
            break;
    }
    
    const url = `https://wa.me/5562981324813?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
    
    console.log(`🔥 WhatsApp aberto para: ${servico}`);
}

function abrirInstagram() {
    window.open('https://www.instagram.com/phsagrovoo/', '_blank');
    console.log('📸 Instagram aberto');
}

// ====================================
// FUNÇÕES UTILITÁRIAS
// ====================================

function isMobile() {
    return window.innerWidth <= 768;
}

function formatarTelefone(telefone) {
    return telefone.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}

// Scroll suave personalizado
function scrollSuavePara(target, duracao = 1000) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    const targetPosition = targetElement.offsetTop - document.getElementById('header').offsetHeight;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animacao(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duracao);
        window.scrollTo(0, run);
        if (timeElapsed < duracao) requestAnimationFrame(animacao);
    }
    
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animacao);
}

console.log('✅ JavaScript carregado completamente!');
console.log('🚁 Funcionalidades ativas:');
console.log('   ✓ Navegação mobile responsiva');
console.log('   ✓ Scroll suave entre seções');
console.log('   ✓ Animações de entrada');
console.log('   ✓ Header dinâmico');
console.log('   ✓ Links de contato com analytics');
console.log('   ✓ Alertas visuais');
console.log('   ✓ Performance otimizada');
