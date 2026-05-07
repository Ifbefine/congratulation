document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const videoScreen = document.getElementById('video-screen');
    const menuScreen = document.getElementById('menu-screen');
    const openBtn = document.getElementById('open-btn');
    const video = document.getElementById('birthday-video');
    const skipBtn = document.getElementById('skip-video');
    const music = document.getElementById('bg-music');

    if (music) music.volume = 0.5;

    function startMusic() {
        if (music) {
            // Сбросим время песни в начало, на всякий случай
            music.currentTime = 0; 
            music.play()
                .then(() => console.log("Музыка играет!"))
                .catch(error => {
                    console.log("Автоплей не сработал. Ждем клика.");
                    // Если всё же заблокировано, включим по любому клику на странице
                    document.addEventListener('click', () => music.play(), { once: true });
                });
        }
    }

    // Твоя умная функция: делает всё сразу
    function activateMenu() {
        videoScreen.classList.add('hidden');
        menuScreen.classList.remove('hidden');
        menuScreen.classList.add('menu-with-photo'); 
        
        // Добавим микро-задержку в 100мс, чтобы видео успело полностью "закрыться"
        setTimeout(startMusic, 100);
    }

    openBtn.addEventListener('click', () => {
        startScreen.classList.add('hidden');
        videoScreen.classList.remove('hidden');
        
        // Магия для мобилок: "заводим двигатель" музыки заранее
        // Мы запускаем её и тут же ставим на паузу. 
        // Браузер запомнит, что юзер разрешил этот звук.
        music.play().then(() => {
            music.pause();
            music.currentTime = 0;
        }).catch(e => console.log("Silent play blocked"));

        video.play().catch(error => console.log("Video blocked"));
    });

    // Изменяем здесь: вызываем activateMenu
    if (skipBtn) {
        skipBtn.addEventListener('click', () => {
            video.pause(); // Сначала стопаем видео
            activateMenu(); // А тут всё остальное (музыка + фото)
        });
    }

    // И здесь: вызываем activateMenu
    video.onended = () => {
        activateMenu();
    };
});

// --- ОСТАЛЬНАЯ ЛОГИКА (КАПИБАРЫ И ТАЙМЕР) ОСТАЕТСЯ БЕЗ ИЗМЕНЕНИЙ ---
const capyPhotos = [
    'jpgKapibara/kapibara1.jpg',
    'jpgKapibara/kapibara2.jpg',
    'jpgKapibara/kapibara3.jpg',
    'jpgKapibara/kapibara4.jpg',
    'jpgKapibara/kapibara5.jpg',
    'jpgKapibara/kapibara6.jpg',
    'jpgKapibara/kapibara7.jpg',
    'jpgKapibara/kapibara8.jpg',
    'jpgKapibara/kapibara9.jpg',
    'jpgKapibara/kapibara10.jpg',
    'jpgKapibara/kapibara11.jpg',
    'jpgKapibara/kapibara12.jpg'
];
let currentCapyIndex = 0;

function showCapybaras() {
    document.getElementById('menu-screen').classList.add('hidden');
    document.getElementById('capybara-screen').classList.remove('hidden');
    updateCapyPhoto();
}

function updateCapyPhoto() {
    const img = document.getElementById('capy-img');
    img.src = capyPhotos[currentCapyIndex];
}

function nextCapy() {
    currentCapyIndex = (currentCapyIndex + 1) % capyPhotos.length;
    updateCapyPhoto();
}

function prevCapy() {
    currentCapyIndex = (currentCapyIndex - 1 + capyPhotos.length) % capyPhotos.length;
    updateCapyPhoto();
}

function backFromCapy() {
    document.getElementById('capybara-screen').classList.add('hidden');
    document.getElementById('menu-screen').classList.remove('hidden');
}

const datingStart = new Date(2025, 8, 1, 0, 0); 
const talkingStart = new Date(2025, 7, 8, 0, 0); 

function updateTimers() {
    const now = new Date();
    function calculateTime(startDate) {
        let diff = now - startDate;
        let days = Math.floor(diff / (1000 * 60 * 60 * 24));
        let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((diff % (1000 * 60)) / 1000);
        return `${days}д ${hours}ч ${minutes}м ${seconds}с`;
    }
    const relEl = document.getElementById('relationship-timer');
    const chatEl = document.getElementById('chat-timer');
    if (relEl) relEl.innerText = calculateTime(datingStart);
    if (chatEl) chatEl.innerText = calculateTime(talkingStart);
}

setInterval(updateTimers, 1000);

function showTime() {
    document.getElementById('menu-screen').classList.add('hidden');
    document.getElementById('time-container').classList.remove('hidden');
}

function backToMenu() {
    document.getElementById('time-container').classList.add('hidden');
    document.getElementById('menu-screen').classList.remove('hidden');
}
// --- ЛОГИКА ИГРЫ ---
let score = 0;
let gameInterval; // Хранит таймер, чтобы можно было его остановить
let isGameRunning = false;

function showGame() {
    document.getElementById('menu-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    resetGame();
    startGame();
}

function resetGame() {
    score = 0;
    document.getElementById('game-score').innerText = score;
    document.getElementById('game-win-message').style.display = 'none';
    document.getElementById('game-capy').style.display = 'none';
    isGameRunning = false;
    clearInterval(gameInterval); // На всякий случай чистим старый таймер
}

function startGame() {
    if (isGameRunning) return;
    isGameRunning = true;
    score = 0;
    document.getElementById('game-score').innerText = score;
    
    // Каждые 1.2 секунды капибара прыгает (можно ускорить)
    gameInterval = setInterval(moveCapy, 1200);
    moveCapy(); // Первый прыжок сразу
}

function moveCapy() {
    const capy = document.getElementById('game-capy');
    const field = document.querySelector('.game-field');
    
    if (score >= 10) {
        endGame();
        return;
    }
    
    // Показываем капибару
    capy.style.display = 'block';

    // Вычисляем случайные координаты внутри поля
    // field.clientWidth/Height - размер поля, 80 - размер капибары
    const x = Math.random() * (field.clientWidth - 80);
    const y = Math.random() * (field.clientHeight - 80);

    capy.style.left = x + 'px';
    capy.style.top = y + 'px';
}

// Привяжем событие клика по капибаре
document.getElementById('game-capy').addEventListener('click', function() {
    if (!isGameRunning || score >= 10) return;

    score++;
    document.getElementById('game-score').innerText = score;
    this.style.display = 'none'; // Капибара "исчезает" при попадании

    if (score === 10) {
        endGame();
    } else {
        // Чтобы она не появилась сразу же в том же месте, сбросим таймер
        clearInterval(gameInterval);
        gameInterval = setInterval(moveCapy, 1000); // Ускоряем прыжки!
        moveCapy();
    }
});

function endGame() {
    isGameRunning = false;
    clearInterval(gameInterval);
    document.getElementById('game-capy').style.display = 'none';
    document.getElementById('game-win-message').style.display = 'block';
}

function backFromGame() {
    resetGame();
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('menu-screen').classList.remove('hidden');
}