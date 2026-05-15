document.addEventListener('DOMContentLoaded', () => {

    // =====================
    // GALLERY SHOW MORE
    // =====================

    const galleryItemsWrap =
        document.querySelectorAll('.gallery .wrap-photo');

    const showMoreItem =
        document.querySelector('.show-more-item');

    let isExpanded=false;

    const initialCount=8;


    function applyGalleryState(){

        galleryItemsWrap.forEach((item,index)=>{

            if(
                !isExpanded &&
                item.classList.contains(
                    'show-more-item'
                )
            ){

                item.style.display='block';
                return;

            }

            if(isExpanded){

                item.style.display='block';
                return;

            }

            item.style.display=
                index<initialCount
                ?'block'
                :'none';

        });

    }


    if(showMoreItem){

        showMoreItem.addEventListener('click',()=>{

            isExpanded=true;

            applyGalleryState();

            const overlay=
                showMoreItem.querySelector(
                    '.show-more-overlay'
                );

            if(overlay){

                overlay.style.opacity='0';

                overlay.style.pointerEvents='none';

            }

        });

    }

    applyGalleryState();



    // =====================
    // LIGHTBOX
    // =====================

    const modal=
        document.querySelector('.modal');

    const currentImage=
        document.querySelector('.current-image');

    const nextImageLayer=
        document.querySelector('.next-image');

    const closeBtn=
        document.querySelector(
            '.modal__btn-close'
        );

    let currentIndex=0;

    let animating=false;



    function getImages(){

        return [...document.querySelectorAll(
            '.photo-gallery'
        )].map(
            img=>img.src
        );

    }



    // =====================
    // PRELOAD
    // =====================

    const imageCache={};

    function preload(src){

        if(imageCache[src]) return;

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



    // начальная предзагрузка

    getImages().forEach(src=>{

        preload(src);

    });





    function openModal(index){

        const images=getImages();

        currentIndex=index;

        currentImage.src=
        images[currentIndex];

        currentImage.style.transform=
        'translateX(0)';

        nextImageLayer.style.transform=
        'translateX(150%)';

        modal.classList.add(
            'modal-show'
        );


        // ЖЕСТКО РУБИМ BODY

        document.body.style.overflow='hidden';

        document.documentElement.style.overflow='hidden';


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

            nextImageLayer.src='';

        },200);

    }



// =====================
// SLIDE
// =====================


function changeImage(direction){

    if(animating)return;

    animating=true;

    const images=getImages();

    let newIndex;


    if(direction==='next'){

        newIndex=
        (currentIndex+1)
        %
        images.length;

        nextImageLayer.style.transform=
        'translateX(150%)';

    }

    else{

        newIndex=
        (
            currentIndex-1+
            images.length
        )
        %
        images.length;

        nextImageLayer.style.transform=
        'translateX(-150%)';

    }



    nextImageLayer.src=
    images[newIndex];



    requestAnimationFrame(()=>{

        requestAnimationFrame(()=>{

            if(direction==='next'){

                currentImage.style.transform=
                'translateX(-100%)';

            }

            else{

                currentImage.style.transform=
                'translateX(100%)';

            }


            nextImageLayer.style.transform=
            'translateX(0)';

        });

    });



    setTimeout(()=>{

        currentImage.src=
        images[newIndex];

        currentImage.style.transition='none';

        currentImage.style.transform=
        'translateX(0)';

        nextImageLayer.style.transition='none';

        nextImageLayer.style.transform=
        'translateX(150%)';



        currentImage.offsetHeight;



        currentImage.style.transition=
        'transform .45s cubic-bezier(.22,.61,.36,1)';

        nextImageLayer.style.transition=
        'transform .45s cubic-bezier(.22,.61,.36,1)';



        currentIndex=newIndex;

        preloadNearby();

        animating=false;

    },450);

}



function nextImage(){

    changeImage(
        'next'
    );

}



function prevImage(){

    changeImage(
        'prev'
    );

}



function bindGalleryClicks(){

document
.querySelectorAll(
'.photo-gallery'
)

.forEach((item,index)=>{

item.addEventListener(
'click',
()=>{

openModal(
index
);

}

);

});

}


bindGalleryClicks();




// =====================
// CONTROLS
// =====================


if(closeBtn){

closeBtn.addEventListener(
'click',
closeModal
);

}



if(modal){

modal.addEventListener(
'click',
(e)=>{

if(
e.target===modal
){

closeModal();

}

});

}



document
.querySelector(
'.lightbox__arrow_right'
)
?.addEventListener(
'click',
nextImage
);


document
.querySelector(
'.lightbox__arrow_left'
)
?.addEventListener(
'click',
prevImage
);



document.addEventListener(
'keydown',
(e)=>{


if(
!modal.classList.contains(
'modal-show'
)
)
return;


if(
e.key==='Escape'
){

closeModal();

}


if(
e.key==='ArrowRight'
){

nextImage();

}


if(
e.key==='ArrowLeft'
){

prevImage();

}

});




// =====================
// SWIPE
// =====================


let startX=0;

let startY=0;

let currentX=0;

let currentY=0;

let isDragging=false;

let axis=null;


if(modal&&currentImage){


currentImage.addEventListener(
'touchstart',
(e)=>{


const touch=
e.touches[0];


startX=
touch.clientX;

startY=
touch.clientY;

currentX=0;

currentY=0;

axis=null;

isDragging=true;

currentImage.style.transition='none';

},
{passive:true}
);



currentImage.addEventListener(
'touchmove',
(e)=>{

if(
!isDragging
)return;


const touch=
e.touches[0];


currentX=
touch.clientX-
startX;

currentY=
touch.clientY-
startY;


if(!axis){

axis=
Math.abs(
currentX
)
>
Math.abs(
currentY
)
?
'x'
:
'y';

}



if(
axis==='x'
){

currentImage.style.transform=
`translateX(${currentX}px)`;

}



if(
axis==='y'
){

currentImage.style.transform=
`translateY(${currentY}px)`;

}


},
{passive:true}
);




currentImage.addEventListener(
'touchend',
()=>{


isDragging=false;


if(
axis==='x'
&&
Math.abs(
currentX
)>80
){

currentX>0
?
prevImage()
:
nextImage();

}



if(
axis==='y'
&&
currentY<-100
){

closeModal();

}


currentImage.style.transition=
'transform .25s ease';

currentImage.style.transform=
'translate(0,0)';

axis=null;


},
{passive:true}
);

}

});
