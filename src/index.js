import pictureCardTmpl from './templates/pictureCardTmpl.hbs';
import './styles.css';
import PicturesApiServices from './js/apiService';
import LoadMoreBtn from './js/components/load-more-btn';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  galleryContainer: document.querySelector('.js-gallery-container'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};
const picturesApiService = new PicturesApiServices();

console.log(picturesApiService);

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();

  picturesApiService.query = event.currentTarget.elements.query.value;
  picturesApiService.resetPage();
  picturesApiService.fetchPictures().then(hits => {
    clearGalleryContainer();
    appendPicturesMarkup(hits);
  });
}

function onLoadMore() {
  picturesApiService.fetchPictures().then(appendPicturesMarkup);
  //!TO DO скролл на один экран после стилизации галлереи
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function appendPicturesMarkup(hits) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', pictureCardTmpl(hits));
}

function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}
