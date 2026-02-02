document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const galaxyHeart = document.getElementById('galaxyHeart');
    const addStarBtn = document.getElementById('addStarBtn');
    const changeMessageBtn = document.getElementById('changeMessageBtn');
    const starCountElement = document.getElementById('starCount');
    const heartMessage = document.querySelector('.heart-message p');
    
    let starCount = 0;
    let heartPieces = [];
    
    // Mensagens românticas para alternar
    const romanticMessages = [
        "Meu amor por você é infinito como o universo",
        "Cada batida do meu coração sussurra seu nome",
        "Você é a estrela mais brilhante no meu céu",
        "Encontrei meu universo inteiro em você",
        "Amar você é a melhor aventura da minha vida",
        "Nossa história de amor é minha galáxia favorita",
        "Seu sorriso ilumina meu mundo mais que qualquer estrela",
        "Em um universo de possibilidades, eu escolhi você infinitas vezes"
    ];
    
    // Cria o coração com galáxias
    function createGalaxyHeart() {
        // Limpa qualquer conteúdo anterior
        galaxyHeart.innerHTML = '';
        heartPieces = [];
        
        // Coordenadas para formar um coração
        const heartCoordinates = generateHeartCoordinates(50, 200, 200, 0.5);
        
        // Cria as partes do coração
        heartCoordinates.forEach((coord, index) => {
            const piece = document.createElement('div');
            piece.className = 'heart-piece';
            
            // Tamanhos variados para efeito mais orgânico
            const size = 15 + Math.random() * 25;
            
            // Cores com gradientes de rosa e azul
            const colorType = Math.random();
            let gradientColors;
            
            if (colorType < 0.5) {
                // Gradiente rosa
                gradientColors = `radial-gradient(circle, rgba(255,182,193,0.9) 0%, rgba(219,112,147,0.8) 50%, rgba(199,21,133,0.7) 100%)`;
            } else {
                // Gradiente azul
                gradientColors = `radial-gradient(circle, rgba(173,216,230,0.9) 0%, rgba(100,149,237,0.8) 50%, rgba(72,61,139,0.7) 100%)`;
            }
            
            // Aplica estilos
            piece.style.width = `${size}px`;
            piece.style.height = `${size}px`;
            piece.style.left = `${coord.x}px`;
            piece.style.top = `${coord.y}px`;
            piece.style.background = gradientColors;
            piece.style.animationDelay = `${index * 0.05}s`;
            piece.style.boxShadow = `0 0 ${size/2}px ${colorType < 0.5 ? 'rgba(255,182,193,0.9)' : 'rgba(173,216,230,0.9)'}`;
            
            // Adiciona interatividade
            piece.addEventListener('click', function() {
                pulseHeartPiece(this);
            });
            
            galaxyHeart.appendChild(piece);
            heartPieces.push(piece);
        });
        
        // Adiciona algumas "estrelas" extras ao redor do coração
        addFloatingStars();
    }
    
    // Gera coordenadas em forma de coração
    function generateHeartCoordinates(numPoints, centerX, centerY, scale) {
        const points = [];
        
        for (let i = 0; i < numPoints; i++) {
            const t = (i / numPoints) * 2 * Math.PI;
            
            // Fórmula paramétrica para um coração
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
            
            // Ajusta escala e posição
            const scaledX = centerX + x * scale;
            const scaledY = centerY - y * scale; // Invertido para coordenadas de tela
            
            // Adiciona alguma aleatoriedade para um efeito mais orgânico
            const jitterX = (Math.random() - 0.5) * 15;
            const jitterY = (Math.random() - 0.5) * 15;
            
            points.push({
                x: scaledX + jitterX,
                y: scaledY + jitterY
            });
        }
        
        return points;
    }
    
    // Adiciona estrelas flutuantes ao redor do coração
    function addFloatingStars() {
        for (let i = 0; i < 30; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Posição aleatória ao redor do coração
            const angle = Math.random() * 2 * Math.PI;
            const distance = 180 + Math.random() * 100;
            const x = 200 + Math.cos(angle) * distance;
            const y = 200 + Math.sin(angle) * distance;
            
            // Tamanho pequeno
            const size = 1 + Math.random() * 3;
            
            // Estilos
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${x}px`;
            star.style.top = `${y}px`;
            star.style.backgroundColor = Math.random() > 0.5 ? '#ffb6c1' : '#add8e6';
            star.style.opacity = '0.7';
            
            // Animação única para cada estrela
            const duration = 2 + Math.random() * 3;
            const delay = Math.random() * 5;
            star.style.setProperty('--duration', `${duration}s`);
            star.style.setProperty('--delay', `${delay}s`);
            
            galaxyHeart.appendChild(star);
        }
    }
    
    // Efeito de pulsação ao clicar em uma parte do coração
    function pulseHeartPiece(piece) {
        piece.style.transform = 'scale(1.5)';
        piece.style.transition = 'transform 0.3s ease';
        
        // Cria um efeito de partícula
        createParticle(piece);
        
        setTimeout(() => {
            piece.style.transform = 'scale(1)';
        }, 300);
    }
    
    // Cria partículas ao clicar
    function createParticle(sourceElement) {
        const rect = sourceElement.getBoundingClientRect();
        const colors = ['#ff6bcd', '#6ba8ff', '#ffb6c1', '#add8e6'];
        
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '8px';
            particle.style.height = '8px';
            particle.style.borderRadius = '50%';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.left = `${rect.left + rect.width/2}px`;
            particle.style.top = `${rect.top + rect.height/2}px`;
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1000';
            
            document.body.appendChild(particle);
            
            // Animação da partícula
            const angle = Math.random() * 2 * Math.PI;
            const distance = 30 + Math.random() * 50;
            const targetX = Math.cos(angle) * distance;
            const targetY = Math.sin(angle) * distance;
            
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${targetX}px, ${targetY}px) scale(0)`, opacity: 0 }
            ], {
                duration: 800,
                easing: 'ease-out'
            });
            
            // Remove a partícula após a animação
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 800);
        }
    }
    
    // Adiciona uma estrela ao contador
    function addStar() {
        starCount++;
        starCountElement.textContent = starCount;
        
        // Cria uma estrela na tela
        createFallingStar();
        
        // Efeito visual no botão
        addStarBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            addStarBtn.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Cria uma estrela caindo na tela
    function createFallingStar() {
        const star = document.createElement('div');
        star.innerHTML = '<i class="fas fa-star"></i>';
        star.style.position = 'fixed';
        star.style.fontSize = '20px';
        star.style.color = '#FFD700';
        star.style.zIndex = '100';
        star.style.pointerEvents = 'none';
        
        // Posição inicial no topo da tela
        const startX = Math.random() * window.innerWidth;
        star.style.left = `${startX}px`;
        star.style.top = '-30px';
        
        document.body.appendChild(star);
        
        // Animação de queda
        const animation = star.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 30}px) rotate(360deg)`, opacity: 0 }
        ], {
            duration: 2000,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
        });
        
        // Remove a estrela após a animação
        animation.onfinish = () => {
            if (star.parentNode) {
                star.parentNode.removeChild(star);
            }
        };
    }
    
    // Muda a mensagem do coração
    function changeHeartMessage() {
        const currentMessage = heartMessage.textContent;
        let newMessage;
        
        // Garante que a nova mensagem seja diferente da atual
        do {
            newMessage = romanticMessages[Math.floor(Math.random() * romanticMessages.length)];
        } while (newMessage === currentMessage && romanticMessages.length > 1);
        
        // Efeito de fade out/in
        heartMessage.style.opacity = '0';
        heartMessage.style.transition = 'opacity 0.5s';
        
        setTimeout(() => {
            heartMessage.textContent = newMessage;
            heartMessage.style.opacity = '1';
            
            // Efeito visual no botão
            changeMessageBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                changeMessageBtn.style.transform = 'scale(1)';
            }, 200);
        }, 500);
    }
    
    // Adiciona estrelas de fundo à página
    function addBackgroundStars() {
        const container = document.querySelector('.container');
        
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star-bg';
            
            // Posição aleatória
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            // Tamanho muito pequeno
            const size = 0.5 + Math.random() * 1.5;
            
            // Estilos
            star.style.position = 'absolute';
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${x}vw`;
            star.style.top = `${y}vh`;
            star.style.backgroundColor = 'white';
            star.style.borderRadius = '50%';
            star.style.opacity = '0.3';
            star.style.pointerEvents = 'none';
            
            // Animação de brilho
            const duration = 3 + Math.random() * 4;
            const delay = Math.random() * 5;
            star.style.animation = `twinkle ${duration}s infinite ${delay}s`;
            
            container.appendChild(star);
        }
    }
    
    // Event listeners
    addStarBtn.addEventListener('click', addStar);
    changeMessageBtn.addEventListener('click', changeHeartMessage);
    
    // Inicialização
    createGalaxyHeart();
    addBackgroundStars();
    
    // Efeito interativo: faz o coração pulsar ao carregar a página
    setTimeout(() => {
        heartPieces.forEach((piece, index) => {
            setTimeout(() => {
                piece.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    piece.style.transform = 'scale(1)';
                }, 300);
            }, index * 50);
        });
    }, 1000);
    
    // Adiciona efeito de digitação no subtítulo
    const subtitle = document.querySelector('.subtitle');
    const originalText = subtitle.textContent;
    subtitle.textContent = '';
    
    let charIndex = 0;
    function typeWriter() {
        if (charIndex < originalText.length) {
            subtitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Inicia o efeito de digitação após um breve delay
    setTimeout(typeWriter, 1500);
});