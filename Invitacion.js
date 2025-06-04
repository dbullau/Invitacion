document.addEventListener('DOMContentLoaded', function() {
    // Inicialización de audio
    const audio = new Audio();
    audio.src = "https://cdnjs.cloudflare.com/ajax/libs/ion-sound/3.0.7/sounds/button_click.mp3"; // Música de muestra
    audio.loop = true;
    let musicPlaying = false;
    
    // Referencias a elementos del DOM
    const musicControl = document.getElementById('musicControl');
    const scrollDown = document.getElementById('scrollDown');
    const closeModal = document.querySelectorAll('.close-modal');
    const confirmarAsistenciaModal = document.getElementById('confirmarAsistenciaModal');
    const confirmarAsistenciaBtn = document.getElementById('confirmarAsistenciaBtn');
    
    // Iniciar el contador
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Eventos de clic para reproducir música
    document.body.addEventListener('click', function() {
        if (!musicPlaying) {
            playAudio();
        }
    }, { once: true });
    
    // Event Listeners
    if (musicControl) {
        musicControl.addEventListener('click', toggleAudio);
    }
    
    if (scrollDown) {
        scrollDown.addEventListener('click', smoothScroll);
    }
    
    // Event listeners para botones que quedaron
    document.getElementById('confirmarAsistenciaBtn').addEventListener('click', mostrarConfirmarAsistencia);
    document.getElementById('llegarCeremonia').addEventListener('click', llegarCeremonia);
    document.getElementById('sugerirCancion').addEventListener('click', sugerirCancion);
    document.getElementById('subirFotos').addEventListener('click', subirFotos);
    
    // Cerrar modales
    closeModal.forEach(function(element) {
        element.addEventListener('click', function() {
            confirmarAsistenciaModal.style.display = 'none';
        });
    });
    
    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', function(event) {
        if (event.target === confirmarAsistenciaModal) {
            confirmarAsistenciaModal.style.display = 'none';
        }
    });

    function mostrarConfirmarAsistencia() {
        confirmarAsistenciaModal.style.display = 'flex';
    }
    
    // Event listener para animaciones al hacer scroll
    window.addEventListener('scroll', checkScroll);
    
    // Verificar animaciones al cargar la página
    checkScroll();
    
    // Funciones
    
    // Función para reproducir/pausar audio
    function playAudio() {
        audio.play().then(() => {
            musicPlaying = true;
            musicControl.innerHTML = '&#10074;&#10074;'; // Icono de pausa
        }).catch(err => {
            console.log("Reproducción automática bloqueada por el navegador:", err);
        });
    }
    
    function toggleAudio() {
        if (audio.paused) {
            audio.play();
            musicControl.innerHTML = '&#10074;&#10074;'; // Icono de pausa
        } else {
            audio.pause();
            musicControl.innerHTML = '&#9658;'; // Icono de play
        }
    }
    
    // Función para desplazamiento suave
    function smoothScroll() {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    }
    
    // Función del contador actualizada
    function updateCountdown() {
        const weddingDate = new Date("July 6, 2025 17:00:00").getTime();
        const now = new Date().getTime();
        const timeLeft = weddingDate - now;
        
        // Calcular días, horas, minutos y segundos
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // Actualizar elementos HTML
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }
    
    // Formato de fecha para calendario
    function formatDateForCalendar(date) {
        return date.toISOString().replace(/-|:|\.\d+/g, '');
    }
    
    // Funciones para los botones que quedaron
    function llegarCeremonia() {
        // URL de Google Maps para la ubicación de la ceremonia
        const ubicacionCeremonia = "https://maps.google.com/?q=Parroquia+de+la+Medalla+Milagrosa";
        window.open(ubicacionCeremonia, '_blank');
    }
    
    function sugerirCancion() {
        // Abrir formulario para sugerir canciones
        window.open("https://forms.gle/tuFormularioDeCanciones", '_blank');
    }
    
    function subirFotos() {
        // Abrir Google Drive para subir fotos
        window.open("https://drive.google.com/drive/folders/tuCarpetaDeGoogleDrive", '_blank');
    }
    
    // Sistema de animaciones al hacer scroll
    function checkScroll() {
        const animatedElements = document.querySelectorAll('.section-animate');
        const triggerPoint = window.innerHeight * 0.85;

        animatedElements.forEach(function(element) {
            const positionFromTop = element.getBoundingClientRect().top;
            
            if (positionFromTop - triggerPoint < 0) {
                const animation = element.getAttribute('data-animation');
                element.classList.add('animate');
                
                // Aplicar animación específica usando Animate.css
                if (animation) {
                    element.classList.add('animate__animated', `animate__${animation}`);
                }
            }
        });
    }

    // Ajustes para mejorar experiencia táctil en móviles
    function addTouchSupport() {
        // Convertir hover a efectos táctiles
        const touchableElements = document.querySelectorAll('.gallery-item, .button, .icon');
        
        touchableElements.forEach(function(element) {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            }, {passive: true});
            
            element.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            }, {passive: true});
        });
        
        // Solucionar problemas de desplazamiento en iOS
        document.addEventListener('gesturestart', function(e) {
            e.preventDefault();
        }, {passive: false});
    }
    
    // Verificar si es dispositivo móvil
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    // Ajustar alturas para móviles
    function adjustHeightsForMobile() {
        if (isMobile()) {
            // Ajustar altura de la sección de bienvenida para que sea visible completa
            const welcomeSection = document.querySelector('.welcome');
            if (welcomeSection) {
                welcomeSection.style.minHeight = window.innerHeight + 'px';
            }
            
            // Activar soporte táctil optimizado
            addTouchSupport();
            
            // Optimización para secciones en dispositivos móviles
            const sections = document.querySelectorAll('section:not(.welcome)');
            sections.forEach(function(section) {
                section.style.minHeight = 'auto';
            });
        }
    }
    
    // Ejecutar ajustes para dispositivos móviles
    adjustHeightsForMobile();
    
    // Reajustar cuando cambia la orientación
    window.addEventListener('resize', adjustHeightsForMobile);
    window.addEventListener('orientationchange', adjustHeightsForMobile);
    
    // Prevenir el zoom no deseado en formularios en iOS
    document.addEventListener('touchmove', function(event) {
        if (event.scale !== 1) {
            event.preventDefault();
        }
    }, { passive: false });
    
    // Mejor manejo del audio en móviles
    if (isMobile()) {
        // Para iOS que necesita interacción del usuario para reproducir audio
        document.addEventListener('touchstart', function() {
            if (!musicPlaying) {
                audio.load(); // Pre-cargar audio para iOS
            }
        }, { once: true, passive: true });
    }
});

// Función para agendar fecha (si quieres mantenerla)
function agendarFecha() {
    const startDate = new Date("July 6, 2025 17:00:00");
    const endDate = new Date("July 6, 2025 23:00:00");
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda&dates=${formatDateForCalendar(startDate)}/${formatDateForCalendar(endDate)}&details=Ceremonia%20de%20boda&location=Parroquia%20de%20la%20Medalla%20Milagrosa`;
    
    window.open(googleCalendarUrl, '_blank');
}