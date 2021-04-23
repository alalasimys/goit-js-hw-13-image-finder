export default class PicturesApiServices {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchPictures() {
    const API_KEY = '21244519-50cd1518df4ac35a1fd6e5fdb';
    const BASE_URL = 'https://pixabay.com/api/';

    const response = await fetch(
      `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`,
    );
    const pics = await response.json();
    this.incrementPage();
    return pics.hits;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
