document.addEventListener('DOMContentLoaded', () => {

    const params = new URLSearchParams(window.location.search);

    const id = params.get('id');

    const data = playlists[id];

    if (!data) return;

    // TITLE
    document.title = data.title;

    // MAIN TITLE
    document.querySelector('.main-title').textContent = data.title;

    // TEXT
    document.querySelector('.text').textContent = data.text;

    // BUTTON
    document.querySelector('.btn-next').href = data.categoryLink;

    // PHOTO
    document.querySelector('.photo').style.backgroundImage =
        `url(${data.image})`;

    // PLAYLIST
    document.querySelector('.playlist').innerHTML = data.iframe;

});