document.addEventListener('DOMContentLoaded', () => {

    // =====================
    // GALLERY SHOW MORE
    // =====================

    const galleryItemsWrap = document.querySelectorAll('.gallery .wrap-photo');
    const showMoreItem = document.querySelector('.show-more-item');

    let isExpanded = false;
    const initialCount = 8;

    function applyGalleryState() {
        galleryItemsWrap.forEach((item, index) => {

            // 8-я карточка всегда видна
            if (!isExpanded && item.classList.contains('show-more-item')) {
                item.style.display = 'block';
                return;
            }

            if (isExpanded) {
                item.style.display = 'block';
                return;
            }

            item.style.display = index < initialCount ? 'block' : 'none';
        });
    }

    if (showMoreItem) {
        showMoreItem.addEventListener('click', () => {

            isExpanded = true;
            applyGalleryState();

            // 🔥 УБИРАЕМ OVERLAY (важный момент)
            const overlay = showMoreItem.querySelector('.show-more-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
                overlay.style.pointerEvents = 'none';
            }

        });
    }

    applyGalleryState();


    // =====================
    // LIGHTBOX
    // =====================

    const modal = document.querySelector('.modal');
    const modalImage = document.querySelector('.lightbox__image');
    const closeBtn = document.querySelector('.modal__btn-close');

    let currentIndex = 0;

    function getImages() {
        return [...document.querySelectorAll('.photo-gallery')].map(img => img.src);
    }

    function openModal(index) {
        const images = getImages();

        currentIndex = index;
        modalImage.src = images[currentIndex];

        modal.classList.add('modal-show');
        document.body.classList.add('hidden-body');
    }

    function closeModal() {
        modal.classList.remove('modal-show');
        document.body.classList.remove('hidden-body');

        setTimeout(() => {
            modalImage.src = '';
        }, 300);
    }

    function nextImage() {
        const images = getImages();

        currentIndex = (currentIndex + 1) % images.length;
        modalImage.src = images[currentIndex];
    }

    function prevImage() {
        const images = getImages();

        currentIndex = (currentIndex - 1 + images.length) % images.length;
        modalImage.src = images[currentIndex];
    }

    document.querySelectorAll('.photo-gallery').forEach((item, index) => {
        item.addEventListener('click', () => {
            openModal(index);
        });
    });

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.querySelector('.lightbox__arrow_right')
        .addEventListener('click', nextImage);

    document.querySelector('.lightbox__arrow_left')
        .addEventListener('click', prevImage);

    document.addEventListener('keydown', (e) => {

        if (!modal.classList.contains('modal-show')) return;

        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });

});
