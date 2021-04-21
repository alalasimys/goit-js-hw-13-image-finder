import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import * as basicLightbox from 'basiclightbox';

import 'basiclightbox/dist/basiclightbox.min.css';

import './styles.css';

import pictureCardTmpl from './templates/pictureCardTmpl.hbs';
import PicturesApiServices from './js/apiService';
// import onOpenModalImage from './js/components/modal';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  galleryContainer: document.querySelector('.js-gallery-container'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const picturesApiService = new PicturesApiServices();

// console.log(picturesApiService);

info({
  title: 'Features on the page',
  text: 'Please note that you can open large version of the image. Enjoy!',
});

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.galleryContainer.addEventListener('click', onOpenModalImage);

function onSearch(event) {
  event.preventDefault();

  picturesApiService.query = event.currentTarget.elements.query.value;
  picturesApiService.resetPage();
  picturesApiService
    .fetchPictures()
    .then(hits => {
      // if (picturesApiService.query !== hits.tags) {
      //   return error({
      //     title: 'Oh No!',
      //     text: 'Something terrible happened.',
      //   });
      // }
      clearGalleryContainer();
      appendPicturesMarkup(hits);
      refs.loadMoreBtn.classList.remove('is-hidden');
    })
    .catch(console.log());
}

function onLoadMore() {
  picturesApiService.fetchPictures().then(appendPicturesMarkup).then(scrollTo);
}

function scrollTo() {
  let scrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight,
  );
  window.scrollTo({
    top: scrollHeight,
    behavior: 'smooth',
  });
}

function appendPicturesMarkup(hits) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', pictureCardTmpl(hits));
}

function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}

function onOpenModalImage(event) {
  // const isImgEl = event.target.classList.contains('gallery__image');
  // if (!isImgEl) {
  //   return;
  // }
  const i = basicLightbox.create(
    `
  <img width="1400" height="900" src="https://pixabay.com/get/gdd7a3812de1e405b3568493998f14b2f4ac2a6b2c30f8bba9c3cdb022816a7adc73e9e7c61c2d59f9dbef43a2ca0c28e_640.jpg">
`,
  );
  i.show();
}
