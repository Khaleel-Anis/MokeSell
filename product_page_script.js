document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.image-slider');
    const prevButton = document.querySelector('.slider-button.prev');
    const nextButton = document.querySelector('.slider-button.next');
    const images = document.querySelectorAll('.main-image');
    let currentIndex = 0;

    const showSlide = (index) => {
        const containerWidth = document.querySelector('.image-container').clientWidth;
        slider.style.transform = `translateX(-${index * containerWidth}px)`;
    };

    const updateButtons = () => {
        prevButton.classList.toggle('hidden', currentIndex === 0);
        nextButton.classList.toggle('hidden', currentIndex >= images.length - Math.floor(document.querySelector('.image-container').clientWidth / images[0].clientWidth));
    };

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            showSlide(currentIndex);
            updateButtons();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < images.length - Math.floor(document.querySelector('.image-container').clientWidth / images[0].clientWidth)) {
            currentIndex++;
            showSlide(currentIndex);
            updateButtons();
        }
    });

    window.addEventListener('resize', () => {
        showSlide(currentIndex);
        updateButtons();
    });

    updateButtons();
});

// Smooth Scroll Back to Top Button
document.addEventListener('DOMContentLoaded', () => {
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        backToTopButton.style.opacity = window.scrollY > 300 ? '1' : '0';
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});