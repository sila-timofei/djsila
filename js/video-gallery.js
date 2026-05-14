document.querySelectorAll('.video-item').forEach(item=>{

    item.addEventListener('click',()=>{

        const id = item.dataset.video;

        item.innerHTML = `
            <iframe
                width="100%"
                height="405"
                src="https://rutube.ru/play/embed/${id}/?autoplay=1&skinColor=ffffff"
                frameborder="0"
                allow="autoplay"
                allowfullscreen>
            </iframe>
        `;

    });

});