// Основной скрипт для сайта AMATORY

document.addEventListener('DOMContentLoaded', function() {
    console.log('AMATORY сайт загружен 🤘');
    
    // ===================
    // ИНИЦИАЛИЗАЦИЯ
    // ===================
    
    // Фиксированное меню при скролле
    const header = document.getElementById('header');
    const mainMenu = document.querySelector('.main-menu');
    const menuToggle = document.getElementById('menuToggle');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 30px rgba(139, 0, 0, 0.5)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.8)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });
    
    // Мобильное меню
    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', function() {
            mainMenu.classList.toggle('active');
            menuToggle.innerHTML = mainMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Закрытие меню при клике на ссылку
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 992) {
                    mainMenu.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    }
    
    // ===================
    // КНОПКА "НАВЕРХ"
    // ===================
    
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===================
    // АНИМАЦИИ КНОПОК
    // ===================
    
    // Эффект рассеивания при клике
    function createParticles(x, y) {
        const colors = ['#8b0000', '#b30000', '#ff0000', '#c0c0c0'];
        const particleCount = 12;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 100 + 50;
            const tx = Math.cos(angle) * speed;
            const ty = Math.sin(angle) * speed;
            
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 600);
        }
    }
    
    // Добавляем эффект частиц к метал-кнопкам
    const metalButtons = document.querySelectorAll('.metal-btn, .metal-btn-small, .play-btn');
    metalButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            createParticles(x, y);
            
            // Звуковой эффект (если нужно)
            playMetalSound();
        });
    });
    
    // ===================
    // ТАЙМЕР ОБРАТНОГО ОТСЧЁТА
    // ===================
    
    function updateCountdown() {
        const targetDate = new Date('2026-02-15T19:00:00').getTime();
        const now = new Date().getTime();
        const timeLeft = targetDate - now;
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');
            
            if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
            if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
            if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
            if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
        }
    }
    
    if (document.getElementById('tourCountdown')) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    // ===================
    // ЭФФЕКТЫ ПРИ НАВЕДЕНИИ
    // ===================
    
    // Эффект свечения для заголовков
    const glowingElements = document.querySelectorAll('.hero-title, .band-name, .highlight');
    glowingElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.classList.add('glow-text');
        });
        
        el.addEventListener('mouseleave', function() {
            this.classList.remove('glow-text');
        });
    });
    
    // Эффект трещин для карточек
    const crackElements = document.querySelectorAll('.news-card, .concert-item');
    crackElements.forEach(el => {
        el.classList.add('crack-overlay');
    });
    
    // ===================
    // МОДАЛЬНЫЕ ОКНА
    // ===================
    
    function createModal(title, content) {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        
        const modal = document.createElement('div');
        modal.className = 'modal-content';
        modal.innerHTML = `
            <button class="modal-close"><i class="fas fa-times"></i></button>
            <h3>${title}</h3>
            <div class="modal-body">${content}</div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Показываем модальное окно
        setTimeout(() => {
            overlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }, 10);
        
        // Закрытие модального окна
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            overlay.style.display = 'none';
            document.body.style.overflow = 'auto';
            setTimeout(() => overlay.remove(), 300);
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.style.display = 'none';
                document.body.style.overflow = 'auto';
                setTimeout(() => overlay.remove(), 300);
            }
        });
    }
    
    // Пример модального окна для билетов
    const ticketButtons = document.querySelectorAll('.concert-item .metal-btn');
    ticketButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const concertTitle = this.closest('.concert-item').querySelector('h3').textContent;
            createModal(
                `Билеты на концерт: ${concertTitle}`,
                `<div class="metal-form">
                    <p>Выберите количество билетов:</p>
                    <div class="form-group">
                        <label class="form-label">Количество:</label>
                        <select class="form-input">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Email для отправки:</label>
                        <input type="email" class="form-input" placeholder="your@email.com">
                    </div>
                    <button class="metal-btn" style="width: 100%; margin-top: 20px;">Купить билеты</button>
                </div>`
            );
        });
    });
    
    // ===================
    // ПАРАЛЛАКС ЭФФЕКТ
    // ===================
    
    function initParallax() {
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.3;
                heroImage.style.transform = `translateY(${rate}px)`;
            });
        }
    }
    
    initParallax();
    
    // ===================
    // ДОПОЛНИТЕЛЬНЫЕ ЭФФЕКТЫ
    // ===================
    
    // Случайное мигание элементов
    function randomBlink() {
        const elements = document.querySelectorAll('.news-card, .track-item, .grid-item');
        if (elements.length > 0) {
            const randomElement = elements[Math.floor(Math.random() * elements.length)];
            randomElement.classList.add('blink');
            
            setTimeout(() => {
                randomElement.classList.remove('blink');
            }, 1000);
        }
    }
    
    setInterval(randomBlink, 5000);
    
    // Эффект загрузки для изображений
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('fade-in');
        });
        
        // Если изображение уже загружено
        if (img.complete) {
            img.classList.add('fade-in');
        }
    });
    
    // ===================
    // ФОРМА ПОДПИСКИ
    // ===================
    
    const subscribeForms = document.querySelectorAll('.subscribe');
    subscribeForms.forEach(form => {
        const input = form.querySelector('input[type="email"]');
        const button = form.querySelector('button');
        
        if (input && button) {
            button.addEventListener('click', function() {
                const email = input.value.trim();
                
                if (validateEmail(email)) {
                    // Симуляция отправки
                    input.value = '';
                    input.placeholder = 'Спасибо за подписку! 🤘';
                    button.textContent = '✓';
                    button.disabled = true;
                    
                    setTimeout(() => {
                        input.placeholder = 'Ваш email';
                        button.textContent = 'OK';
                        button.disabled = false;
                    }, 3000);
                } else {
                    input.classList.add('vibrate');
                    setTimeout(() => input.classList.remove('vibrate'), 300);
                }
            });
            
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    button.click();
                }
            });
        }
    });
    
    // Валидация email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // ===================
    // СИМУЛЯЦИЯ ЗВУКОВЫХ ЭФФЕКТОВ
    // ===================
    
    function playMetalSound() {
        // Создаем звуковой эффект через Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(80, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.2);
        } catch (e) {
            console.log('Web Audio API не поддерживается');
        }
    }
    
    // ===================
    // АНИМАЦИЯ ГИТАРЫ В ФУТЕРЕ
    // ===================
    
    const guitarIcon = document.querySelector('.guitar-animation i');
    if (guitarIcon) {
        let strumCount = 0;
        
        guitarIcon.addEventListener('click', function() {
            strumCount++;
            
            // Усиливаем анимацию при клике
            this.style.animation = 'none';
            void this.offsetWidth; // Перезапуск анимации
            this.style.animation = `guitarStrum ${0.5 / strumCount}s ${strumCount}`;
            
            // Сброс счетчика через 5 секунд
            setTimeout(() => {
                strumCount = 0;
                this.style.animation = 'guitarStrum 3s infinite';
            }, 5000);
        });
    }
    
    // ===================
    // ЭФФЕКТ ПЕРЕМЕЩЕНИЯ ФОНА
    // ===================
    
    let mouseX = 0, mouseY = 0;
    let bgX = 50, bgY = 50;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = (e.clientX / window.innerWidth) * 100;
        mouseY = (e.clientY / window.innerHeight) * 100;
    });
    
    function updateBackgroundPosition() {
        bgX += (mouseX - bgX) * 0.05;
        bgY += (mouseY - bgY) * 0.05;
        
        document.body.style.backgroundPosition = `${bgX}% ${bgY}%`;
        requestAnimationFrame(updateBackgroundPosition);
    }
    
    updateBackgroundPosition();
    
    // ===================
    // СОХРАНЕНИЕ ПРЕДПОЧТЕНИЙ
    // ===================
    
    // Тема (светлая/темная) - для будущего расширения
    const themeToggle = document.createElement('div');
    themeToggle.className = 'metal-switch';
    themeToggle.style.position = 'fixed';
    themeToggle.style.bottom = '90px';
    themeToggle.style.right = '30px';
    themeToggle.style.zIndex = '999';
    themeToggle.innerHTML = `
        <input type="checkbox" id="themeSwitch">
        <span class="slider"></span>
    `;
    
    document.body.appendChild(themeToggle);
    
    const themeSwitch = document.getElementById('themeSwitch');
    if (themeSwitch) {
        themeSwitch.checked = localStorage.getItem('amatory-theme') === 'light';
        
        themeSwitch.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('light-theme');
                localStorage.setItem('amatory-theme', 'light');
            } else {
                document.body.classList.remove('light-theme');
                localStorage.setItem('amatory-theme', 'dark');
            }
        });
    }
    
    // ===================
    // АНИМАЦИЯ ПРОГРЕСС-БАРА
    // ===================
    
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('progress');
        progressBars.forEach(bar => {
            const targetValue = parseInt(bar.value);
            let currentValue = 0;
            
            const interval = setInterval(() => {
                if (currentValue >= targetValue) {
                    clearInterval(interval);
                    return;
                }
                
                currentValue++;
                bar.value = currentValue;
            }, 20);
        });
    }
    
    // Запускаем анимацию при загрузке
    setTimeout(animateProgressBars, 1000);
    
    // ===================
    // ДИНАМИЧЕСКОЕ ОБНОВЛЕНИЕ СОДЕРЖИМОГО
    // ===================
    
    // Пример: динамическая загрузка новостей
    function loadNews() {
        const newsContainer = document.querySelector('.news-grid');
        if (!newsContainer) return;
        
        // Здесь мог бы быть fetch запрос к API
        const mockNews = [
            { date: '20.12.2023', title: 'Новый клип в работе', content: 'Группа начала съемки нового клипа' },
            { date: '18.12.2023', title: 'Интервью для Metal Hammer', content: 'Эксклюзивное интервью выйдет в январе' }
        ];
        
        // Обновляем каждые 30 секунд (для демонстрации)
        setInterval(() => {
            if (Math.random() > 0.7) { // 30% шанс на обновление
                const randomNews = mockNews[Math.floor(Math.random() * mockNews.length)];
                const newsCards = newsContainer.querySelectorAll('.news-card');
                if (newsCards.length > 0) {
                    const randomCard = newsCards[Math.floor(Math.random() * newsCards.length)];
                    randomCard.querySelector('.news-date').textContent = randomNews.date;
                    randomCard.querySelector('h3').textContent = randomNews.title;
                    randomCard.querySelector('p').textContent = randomNews.content;
                    
                    // Эффект обновления
                    randomCard.style.background = 'rgba(139, 0, 0, 0.2)';
                    setTimeout(() => {
                        randomCard.style.background = '';
                    }, 1000);
                }
            }
        }, 30000);
    }
    
    loadNews();
    
    // ===================
    // КОНЕЦ ИНИЦИАЛИЗАЦИИ
    // ===================

    console.log('Все скрипты инициализированы. Добро пожаловать на сайт AMATORY! 🎸');
});

// Глобальные функции
window.AmatorySite = {
    playTrack: function(trackIndex) {
        // Если аудиоплеер инициализирован
        if (window.audioPlayer) {
            window.audioPlayer.playTrack(trackIndex);
        }
    },
    
    showNotification: function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `metal-notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(26, 26, 26, 0.95);
            border: 1px solid #8b0000;
            color: #e0e0e0;
            padding: 15px 25px;
            border-radius: 5px;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 5px 15px rgba(0,0,0,0.5);
        `;
        
        document.body.appendChild(notification);
        
        // Показываем
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Убираем через 5 секунд
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
};

// Полифиллы для старых браузеров
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || 
                                Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

// Отслеживание ошибок
window.addEventListener('error', function(e) {
    console.error('Ошибка на сайте AMATORY:', e.error);
});
