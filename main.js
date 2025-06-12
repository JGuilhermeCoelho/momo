const images = Array.from({ length: 23 }, (_, i) => `assets/${(i + 1).toString().padStart(2, '0')}.jpeg`);
let currentImageIndex = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(images);

const sliderImage = document.querySelector('.slider-image');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

function updateImage() {
    sliderImage.classList.add('fade');
    setTimeout(() => {
        sliderImage.src = images[currentImageIndex];
    }, 350);
}

sliderImage.addEventListener('load', () => {
    sliderImage.classList.remove('fade');
});

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateImage();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateImage();
}

prevButton.addEventListener('click', () => {
    clearInterval(autoSlideInterval);
    prevImage();
    startAutoSlide();
});

nextButton.addEventListener('click', () => {
    clearInterval(autoSlideInterval);
    nextImage();
    startAutoSlide();
});

let autoSlideInterval;

function startAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
    autoSlideInterval = setInterval(nextImage, 5000);
}

updateImage();
startAutoSlide();

const startDate = new Date('2023-02-24T00:00:00-03:00');

function updateCounter() {
    const now = new Date();
    const diff = now - startDate;

    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

setInterval(updateCounter, 1000);
updateCounter();

const scrollBtn = document.querySelector('.scroll-to-message');
const messageSection = document.querySelector('.message-section');
if (scrollBtn && messageSection) {
    scrollBtn.addEventListener('click', () => {
        messageSection.scrollIntoView({ behavior: 'smooth' });
        rainHearts();
    });
}

function rainHearts() {
    const heartColors = ['#ff6b6b', '#ffb6b6', '#fff', '#ff4081', '#ff1744'];
    const numHearts = 60;
    for (let i = 0; i < numHearts; i++) {
        const heart = document.createElement('div');
        heart.className = 'falling-heart';
        heart.innerHTML = '❤';
        heart.style.left = (Math.random() * 140 - 20) + 'vw';
        heart.style.fontSize = (Math.random() * 1.5 + 1.2) + 'rem';
        heart.style.color = heartColors[Math.floor(Math.random() * heartColors.length)];
        heart.style.animationDuration = (Math.random() * 2.5 + 2.5) + 's';
        heart.style.opacity = Math.random() * 0.5 + 0.5;
        heart.style.animationDelay = (Math.random() * 1.5) + 's';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 6000);
    }
}