
import {galleryItems} from './app.js';
console.log(galleryItems);


const refs = {
    galleryList: document.querySelector('.js-gallery'),
    galleryOriginalImg: document.querySelector('.lightbox__image'),
    lightBox: document.querySelector('.lightbox'),
    lightBoxCloseBtn: document.querySelector('button[data-action="close-lightbox"]'),
    // lightBoxContent: document.querySelector('lightbox__content'), // null, because opacity: 0;
};
console.log('refs', refs);


// ====== 1 ======  creating dynamic markUp from {galleryItems}

const galleryItemsMarkup = galleryItems.map(({ preview, original, description }) => {
    return `<li class="gallery__item">
      <a
        class="gallery__link"
        href=${original}
      >
        <img
          class="gallery__image"
          src=${preview}
          data-source=${original}
          alt=${description}
        />
      </a>
    </li>`;
}).join(''); // —> from map array with markup of <li>-es —> join converts to string
//console.log('galleryItemsMarkup', galleryItemsMarkup);

refs.galleryList.insertAdjacentHTML('beforeend', galleryItemsMarkup);

// ====== 2 ======  creating dynamic markUp from {galleryItems}
refs.galleryList.addEventListener('click', viewOriginalImageOnClick)

function viewOriginalImageOnClick(evt) {
    evt.preventDefault();
    //console.log('evt.target', evt.target); // ul
    //console.log('evt.currentTarget', evt.currentTarget); // element on what click was
    const target = evt.target;

    if (target.nodeName !== 'IMG') {
        return;
    } else {
        console.log('Its IMAGE!!!');
        refs.lightBox.classList.add('is-open');
        const lightboxImage = refs.lightBox.querySelector('.lightbox__image'); 

        lightboxImage.src = target.dataset.source;
        lightboxImage.alt = target.alt;
        //console.log('lightboxImage.src', lightboxImage.src); // current large image 
    }
}

// ====== 3 ======  close btn
refs.lightBoxCloseBtn.addEventListener('click', closeLightbox);
function closeLightbox(evt) {
    console.log('button', evt.target);
    refs.lightBox.classList.remove('is-open');
} 