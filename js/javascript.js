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
            music.play().catch(error => console.log("Музыка заблокирована"));
        }
    }

    // Твоя умная функция: делает всё сразу
    function activateMenu() {
        videoScreen.classList.add('hidden');
        menuScreen.classList.remove('hidden');
        
        // Добавляем класс с твоим фото для фона меню
        menuScreen.classList.add('menu-with-photo'); 
        
        startMusic();
    }

    openBtn.addEventListener('click', () => {
        startScreen.classList.add('hidden');
        videoScreen.classList.remove('hidden');
        video.play().catch(error => console.log("Видео заблокировано"));
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

function showPhotos() {
    alert("Раздел с нашими фото в разработке! Почти готово ❤️");
}