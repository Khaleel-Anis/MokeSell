document.addEventListener('DOMContentLoaded', () => {
    const carousels = {
        'trending-products': document.getElementById('trending-products'),
        'sale-products': document.getElementById('sale-products'),
        'recent-products': document.getElementById('recent-products')
    };

    document.querySelectorAll('.scroll-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const direction = button.classList.contains('left') ? -1 : 1;
            const container = button.parentElement.querySelector('.carousel-track');
            container.scrollBy({
                left: direction * 300,
                behavior: 'smooth'
            });
        });
    });
});