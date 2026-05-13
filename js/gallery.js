document.addEventListener('DOMContentLoaded', () => {

    const galleryItems = document.querySelectorAll('.photo-gallery');
    const modal = document.querySelector('.modal');
    const modalImage = document.querySelector('.lightbox__image');
    const closeBtn = document.querySelector('.modal__btn-close');

    let currentIndex = 0;

    // массив src
    const images = [...galleryItems].map(item => item.src);

    // открыть
    function openModal(index) {

        currentIndex = index;

        modalImage.src = images[currentIndex];

        modal.classList.add('modal-show');

        document.body.classList.add('hidden-body');
    }

    // закрыть
    function closeModal() {

        modal.classList.remove('modal-show');

        document.body.classList.remove('hidden-body');

        setTimeout(() => {
            modalImage.src = '';
        }, 300);
    }

    // следующее фото
    function nextImage() {

        currentIndex++;

        if (currentIndex >= images.length) {
            currentIndex = 0;
        }

        modalImage.src = images[currentIndex];
    }

    // предыдущее фото
    function prevImage() {

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = images.length - 1;
        }

        modalImage.src = images[currentIndex];
    }

    // клик по фото
    galleryItems.forEach((item, index) => {

        item.addEventListener('click', () => {
            openModal(index);
        });

    });

    // закрыть
    closeBtn.addEventListener('click', closeModal);

    // закрытие по фону
    modal.addEventListener('click', (e) => {

        if (e.target === modal) {
            closeModal();
        }

    });

    // стрелки
    document.querySelector('.lightbox__arrow_right')
        .addEventListener('click', nextImage);

    document.querySelector('.lightbox__arrow_left')
        .addEventListener('click', prevImage);

    // клавиатура
    document.addEventListener('keydown', (e) => {

        if (!modal.classList.contains('modal-show')) return;

        if (e.key === 'Escape') {
            closeModal();
        }

        if (e.key === 'ArrowRight') {
            nextImage();
        }

        if (e.key === 'ArrowLeft') {
            prevImage();
        }

    });

});