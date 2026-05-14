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

            // скрываем overlay мягко
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
        }, 200);
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

    function bindGalleryClicks() {
        document.querySelectorAll('.photo-gallery').forEach((item, index) => {
            item.addEventListener('click', () => {
                openModal(index);
            });
        });
    }

    bindGalleryClicks();


    // =====================
    // CONTROLS
    // =====================

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    const rightArrow = document.querySelector('.lightbox__arrow_right');
    const leftArrow = document.querySelector('.lightbox__arrow_left');

    if (rightArrow) rightArrow.addEventListener('click', nextImage);
    if (leftArrow) leftArrow.addEventListener('click', prevImage);


    document.addEventListener('keydown', (e) => {

        if (!modal || !modal.classList.contains('modal-show')) return;

        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });


    // =====================
    // SWIPE SUPPORT (MOBILE)
    // =====================

    let startX = 0;
    let startY = 0;

    if (modal) {

        modal.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
        }, { passive: true });

        modal.addEventListener('touchend', (e) => {
            const touch = e.changedTouches[0];

            const diffX = touch.clientX - startX;
            const diffY = touch.clientY - startY;

            const absX = Math.abs(diffX);
            const absY = Math.abs(diffY);

            // свайп вправо/влево
            if (absX > absY && absX > 50) {
                if (diffX > 0) {
                    prevImage();
                } else {
                    nextImage();
                }
            }

            // свайп вверх — закрытие
            if (absY > absX && diffY < -60) {
                closeModal();
            }

        }, { passive: true });
    }

});
