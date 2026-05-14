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
// SWIPE + DRAG IMAGE (LOCK AXIS)
// =====================

let startX = 0;
let startY = 0;

let currentX = 0;
let currentY = 0;

let isDragging = false;
let axis = null; // x | y

if (modal && modalImage) {

    modalImage.addEventListener('touchstart', (e) => {

        const touch = e.touches[0];

        startX = touch.clientX;
        startY = touch.clientY;

        currentX = 0;
        currentY = 0;

        axis = null;
        isDragging = true;

        modalImage.style.transition = 'none';

    }, { passive: true });


    modalImage.addEventListener('touchmove', (e) => {

        if (!isDragging) return;

        const touch = e.touches[0];

        currentX = touch.clientX - startX;
        currentY = touch.clientY - startY;


        // определяем ось один раз
        if (!axis) {

            if (
                Math.abs(currentX) >
                Math.abs(currentY)
            ) {
                axis = 'x';
            } else {
                axis = 'y';
            }

        }


        // движение только по X
        if (axis === 'x') {

            modalImage.style.transform =
                `translateX(${currentX}px)`;

        }

        // движение только по Y
        if (axis === 'y') {

            modalImage.style.transform =
                `translateY(${currentY}px)`;

        }

    }, { passive: true });


    modalImage.addEventListener('touchend', () => {

        isDragging = false;

        modalImage.style.transition =
            'transform .25s ease';

        const absX = Math.abs(currentX);
        const absY = Math.abs(currentY);


        // перелистывание
        if (
            axis === 'x' &&
            absX > 80
        ) {

            if (currentX > 0) {
                prevImage();
            } else {
                nextImage();
            }

        }

        // закрытие вверх
        if (
            axis === 'y' &&
            currentY < -100
        ) {

            closeModal();
        }


        // возврат
        modalImage.style.transform =
            'translate(0,0)';

        axis = null;

    }, { passive: true });

}

});
