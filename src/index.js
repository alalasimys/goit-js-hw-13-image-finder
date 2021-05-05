import { info, error, Stack } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import 'basiclightbox/dist/basiclightbox.min.css';

import './styles.css';

import pictureCardTmpl from './templates/pictureCardTmpl.hbs';
import PicturesApiServices from './js/apiService';
import onOpenModalImage from './js/components/modal';

const myStack = new Stack({
  dir1: 'down',
  dir2: 'right',
  firstpos1: 30,
  firstpos2: 1050,
});

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  galleryContainer: document.querySelector('.js-gallery-container'),
  // loadMoreBtn: document.querySelector('[data-action="load-more"]'),
  intersectingAnchor: document.querySelector('.intersecting-anchor'),
  spinner: document.querySelector('.lds-roller'),
};

const picturesApiService = new PicturesApiServices();

info({
  title: 'Features on the page',
  text: 'Please note that you can open large version of the image. Enjoy!',
  delay: 4000,
  stack: myStack,
});

refs.searchForm.addEventListener('submit', onSearch);
// refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.galleryContainer.addEventListener('click', onOpenModalImage);

async function onSearch(event) {
  event.preventDefault();

  picturesApiService.query = event.currentTarget.elements.query.value;

  picturesApiService.resetPage();

  const response = await picturesApiService.fetchPictures();

  if (response.length === 0) {
    myStack.close();
    error({
      title: 'Nothing found',
      text: 'Please enter more specific query',
      delay: 4000,
      stack: myStack,
    });
    clearGalleryContainer();
    // refs.loadMoreBtn.classList.add('is-hidden');
    refs.spinner.classList.add('is-hidden');
    return;
  }

  clearGalleryContainer();
  appendPicturesMarkup(response);
  // refs.loadMoreBtn.classList.remove('is-hidden');
  refs.spinner.classList.remove('is-hidden');
}

function appendPicturesMarkup(hits) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', pictureCardTmpl(hits));
}

function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}

/* ---Infinite Scroll */
const onEntry = entries =>
  entries.forEach(async entry => {
    if (entry.isIntersecting && picturesApiService.query !== '') {
      const response = await picturesApiService.fetchPictures();
      appendPicturesMarkup(response);
    }
  });

const options = {
  rootMargin: '150px',
};

const observer = new IntersectionObserver(onEntry, options);

observer.observe(refs.intersectingAnchor);

//---Load More button---
/*
async function onLoadMore() {
  const response = await picturesApiService.fetchPictures();
  appendPicturesMarkup(response);
  scrollTo();
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
*/
