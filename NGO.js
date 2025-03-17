// Add smooth scroll behavior
document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".main-nav");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,  // Adjust this value if needed
                behavior: 'smooth'
            });
        }
    });
});

// Carousel functionality
const headings = document.querySelectorAll('.heading');
const descriptions = document.querySelectorAll('.description');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentIndex = 0;
let autoPlayInterval;

function showContent(index) {
    headings.forEach(h => {
        h.classList.remove('active');
        h.style.opacity = '0';
        h.style.transform = 'translateY(20px)';
    });
    descriptions.forEach(d => {
        d.classList.remove('active');
        d.style.opacity = '0';
        d.style.transform = 'translateY(20px)';
    });
    setTimeout(() => {
        headings[index].classList.add('active');
        headings[index].style.opacity = '1';
        headings[index].style.transform = 'translateY(0)';
        descriptions[index].classList.add('active');
        descriptions[index].style.opacity = '1';
        descriptions[index].style.transform = 'translateY(0)';
    }, 300);
}

function nextContent() {
    currentIndex = (currentIndex + 1) % headings.length;
    showContent(currentIndex);
}

function prevContent() {
    currentIndex = (currentIndex - 1 + headings.length) % headings.length;
    showContent(currentIndex);
}

function startAutoPlay() {
    autoPlayInterval = setInterval(nextContent, 7000);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

nextBtn.addEventListener('click', () => {
    stopAutoPlay();
    nextContent();
    startAutoPlay();
});

prevBtn.addEventListener('click', () => {
    stopAutoPlay();
    prevContent();
    startAutoPlay();
});

startAutoPlay();

// Counter animation for stats
const stats = document.querySelectorAll('.stat-number');
const statsSection = document.querySelector('.stats-container');

// ENTER YOUR FIXED NUMBERS HERE
const statFinalValues = {
    'Total Lives Impacted': 100,
    'Total Services': 10,
    'Total Project': 35,
    'Total Volunteer': 50
};

function animateStats() {
    stats.forEach(stat => {
        const label = stat.nextElementSibling.textContent;
        const finalNumber = statFinalValues[label];

        let current = 0;
        const duration = 2000;
        const steps = 60;
        const increment = finalNumber / steps;
        const stepDuration = duration / steps;

        const timer = setInterval(() => {
            if (current < finalNumber) {
                current += increment;
                if (current > finalNumber) current = finalNumber;
                stat.textContent = Math.round(current).toLocaleString();
            } else {
                clearInterval(timer);
            }
        }, stepDuration);
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(statsSection);

// Gallery Carousel Functionality with Slide Animation
const gallerySlides = document.querySelectorAll('.gallery-slide');
const prevSlideBtn = document.querySelector('.prev-slide');
const nextSlideBtn = document.querySelector('.next-slide');
const indicators = document.querySelectorAll('.indicator');
let currentSlideIndex = 1;
let galleryInterval;

// Fixed: Removed unwanted empty placeholders and "background 2 3"
const galleryImages = [
    '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg',
    '37.jpg', '36.jpg', '35.jpg', '34.jpg', '33.jpg',
    '32.jpg', '31.jpg', '30.jpg', '29.jpg', '28.jpg',
    '27.jpg', '26.jpg', '25.jpg', '24.jpg', '23.jpg',
    '22.jpg', '21.jpg', '20.jpg', '19.jpg', '18.jpg',
    '17.jpg', '16.jpg', '15.jpg', '14.jpg', '13.jpg',
    '12.jpg', '11.jpg', '10.jpg', '9.jpg'
];

function updateGallerySlides() {
    gallerySlides.forEach(slide => {
        slide.style.transition = 'transform 0.5s ease-in-out';
    });

    const prevIndex = (currentSlideIndex - 1 + galleryImages.length) % galleryImages.length;
    const nextIndex = (currentSlideIndex + 1) % galleryImages.length;

    gallerySlides[0].querySelector('img').src = galleryImages[prevIndex];
    gallerySlides[1].querySelector('img').src = galleryImages[currentSlideIndex];
    gallerySlides[2].querySelector('img').src = galleryImages[nextIndex];

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlideIndex);
    });
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % galleryImages.length;
    updateGallerySlides();
}

function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + galleryImages.length) % galleryImages.length;
    updateGallerySlides();
}

function startGalleryAutoplay() {
    galleryInterval = setInterval(nextSlide, 5000);
}

function stopGalleryAutoplay() {
    clearInterval(galleryInterval);
}

prevSlideBtn.addEventListener('click', () => {
    stopGalleryAutoplay();
    prevSlide();
    startGalleryAutoplay();
});

nextSlideBtn.addEventListener('click', () => {
    stopGalleryAutoplay();
    nextSlide();
    startGalleryAutoplay();
});

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        stopGalleryAutoplay();
        currentSlideIndex = index;
        updateGallerySlides();
        startGalleryAutoplay();
    });
});

updateGallerySlides();
startGalleryAutoplay();
