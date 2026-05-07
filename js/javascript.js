document.addEventListener('DOMContentLoaded', () => {
    // 1. Объявляем все переменные
    const startScreen = document.getElementById('start-screen');
    const videoScreen = document.getElementById('video-screen');
    const menuScreen = document.getElementById('menu-screen');
    const openBtn = document.getElementById('open-btn');
    const video = document.getElementById('birthday-video');
    const skipBtn = document.getElementById('skip-video');
    const music = document.getElementById('bg-music');

    // Настройка громкости
    if (music) music.volume = 0.5;

    // Функция для запуска музыки
    function startMusic() {
        if (music) {
            music.play().catch(error => console.log("Музыка заблокирована браузером"));
        }
    }

    // 2. Клик по кнопке "Открыть"
    openBtn.addEventListener('click', () => {
        startScreen.classList.add('hidden');
        videoScreen.classList.remove('hidden');
        video.play().catch(error => console.log("Видео заблокировано"));
    });

    // 3. Если нажали "Пропустить"
    if (skipBtn) {
        skipBtn.addEventListener('click', () => {
            videoScreen.classList.add('hidden');
            menuScreen.classList.remove('hidden');
            video.pause();
            startMusic(); // Включаем музыку здесь
        });
    }

    // 4. Если видео закончилось само
    video.onended = () => {
        videoScreen.classList.add('hidden');
        menuScreen.classList.remove('hidden');
        startMusic(); // Включаем музыку здесь
    };
});

// --- ОСТАЛЬНАЯ ЛОГИКА (КАПИБАРЫ И ТАЙМЕР) ОСТАЕТСЯ БЕЗ ИЗМЕНЕНИЙ ---
const capyPhotos = [
    'jpgKapibara/kapibara1.jpg',
    'jpgKapibara/kapibara2.jpg',
    'jpgKapibara/kapibara3.jpg',
    'jpgKapibara/kapibara4.jpg',
    'jpgKapibara/kapibara5.jpg',
    'jpgKapibara/kapibara6.jpg'
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

function showPhotos() {
    alert("Раздел с нашими фото в разработке! Почти готово ❤️");
}