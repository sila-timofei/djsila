document.addEventListener('DOMContentLoaded',()=>{

    // =====================
// GALLERY SHOW MORE
// =====================

const galleryItemsWrap=
document.querySelectorAll(
'.gallery .wrap-photo'
);

const showMoreItem=
document.querySelector(
'.show-more-item'
);

let isExpanded=false;

const initialCount=8;


function applyGalleryState(){

galleryItemsWrap.forEach(
(item,index)=>{


if(isExpanded){

item.style.display=
'block';

return;

}


if(index<initialCount){

item.style.display=
'block';

}
else{

item.style.display=
'none';

}


// карточка смотреть ещё
if(
item.classList.contains(
'show-more-item'
)
){

item.style.display=
'block';

}

});

}



if(showMoreItem){

showMoreItem.addEventListener(
'click',
(e)=>{

e.stopPropagation();

isExpanded=true;

applyGalleryState();


const overlay=
showMoreItem.querySelector(
'.show-more-overlay'
);


if(overlay){

overlay.style.opacity='0';

overlay.style.pointerEvents=
'none';

}

});

}


applyGalleryState();

const modal=
document.querySelector('.modal');

const currentImage=
document.querySelector('.current-image');

const nextImage=
document.querySelector('.next-image');

const closeBtn=
document.querySelector('.modal__btn-close');

let currentIndex=0;

let startX=0;

let currentX=0;

let isDragging=false;

let animating=false;

let swipeDirection='next';



function getImages(){

return[
...document.querySelectorAll(
'.photo-gallery'
)

].map(img=>img.src)

}



const imageCache={};

function preload(src){

if(imageCache[src])return;

const img=new Image();

img.src=src;

imageCache[src]=img;

}



function preloadNearby(){

const images=getImages();

const next=
(currentIndex+1)
%
images.length;

const prev=
(
currentIndex-1+
images.length
)
%
images.length;


preload(
images[next]
);

preload(
images[prev]
);

}



function openModal(index){

const images=
getImages();

currentIndex=index;

currentImage.src=
images[index];

modal.classList.add(
'modal-show'
);


document.body.style.overflow=
'hidden';

document.documentElement.style.overflow=
'hidden';


preloadNearby();

}



function closeModal(){

modal.classList.remove(
'modal-show'
);


document.body.style.overflow='';

document.documentElement.style.overflow='';


setTimeout(()=>{

currentImage.src='';

nextImage.src='';

},300);

}



function prepareNext(direction){

const images=
getImages();


let index;


if(direction==='next'){

index=
(currentIndex+1)
%
images.length;

nextImage.style.transform=
'translateX(100vw)';

}

else{

index=
(
currentIndex-1+
images.length
)
%
images.length;

nextImage.style.transform=
'translateX(-100vw)';

}


nextImage.src=
images[index];

return index;

}



document
.querySelectorAll(
'.photo-gallery'
)
.forEach(
(item,index)=>{

item.addEventListener(
'click',
()=>{

openModal(
index
);

}

);

}
);



function finishSwipe(direction){

if(animating)return;

animating=true;


const images=
getImages();


let newIndex=
prepareNext(
direction
);


requestAnimationFrame(()=>{


if(
direction==='next'
){

currentImage.style.transform=
'translateX(-100vw)';

}

else{

currentImage.style.transform=
'translateX(100vw)';

}


nextImage.style.transform=
'translateX(0)';


});


setTimeout(()=>{


currentImage.src=
images[newIndex];

currentImage.style.transition=
'none';

nextImage.style.transition=
'none';


currentImage.style.transform=
'translateX(0)';

nextImage.style.transform=
'translateX(120vw)';


currentImage.offsetHeight;


currentImage.style.transition=
'transform .35s cubic-bezier(.22,.61,.36,1)';

nextImage.style.transition=
'transform .35s cubic-bezier(.22,.61,.36,1)';


currentIndex=
newIndex;

preloadNearby();

animating=false;

},350);

}



document
.querySelector(
'.lightbox__arrow_right'
)
.addEventListener(
'click',
()=>{

finishSwipe(
'next'
)

}
);


document
.querySelector(
'.lightbox__arrow_left'
)
.addEventListener(
'click',
()=>{

finishSwipe(
'prev'
)

}
);



closeBtn.addEventListener(
'click',
closeModal
);



document.addEventListener(
'keydown',
e=>{

if(
!modal.classList.contains(
'modal-show'
)
)return;


if(
e.key==='Escape'
)
closeModal();


if(
e.key==='ArrowRight'
)
finishSwipe(
'next'
);


if(
e.key==='ArrowLeft'
)
finishSwipe(
'prev'
);


}
);



currentImage.addEventListener(
'touchstart',
e=>{

startX=
e.touches[0]
.clientX;

currentX=0;

isDragging=true;

}
);



currentImage.addEventListener(
'touchmove',
e=>{


if(
!isDragging
)return;


currentX=
e.touches[0]
.clientX
-
startX;



if(currentX<0){

swipeDirection=
'next';

prepareNext(
'next'
);

}
else{

swipeDirection=
'prev';

prepareNext(
'prev'
);

}



currentImage.style.transition=
'none';

nextImage.style.transition=
'none';



currentImage.style.transform=
`translateX(${currentX}px)`;


if(
swipeDirection==='next'
){

nextImage.style.transform=
`
translateX(
${window.innerWidth+currentX}px
)
`;

}

else{

nextImage.style.transform=
`
translateX(
${-window.innerWidth+currentX}px
)
`;

}



},
{passive:true}
);




currentImage.addEventListener(
'touchend',
()=>{


isDragging=false;


currentImage.style.transition=
'transform .35s cubic-bezier(.22,.61,.36,1)';

nextImage.style.transition=
'transform .35s cubic-bezier(.22,.61,.36,1)';



if(
Math.abs(
currentX
)
>
80
){

finishSwipe(
swipeDirection
);

return;

}



currentImage.style.transform=
'translateX(0)';


if(
swipeDirection==='next'
){

nextImage.style.transform=
'translateX(100vw)';

}
else{

nextImage.style.transform=
'translateX(-100vw)';

}


});

});
