import axios from 'axios';
import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api';
const KEY = '36861352-2474982a97ff1b570eda1c4c2';

export default class NewsApi {
  constructor() {
    this._query = '';
    this._page = 1;
  }
  fetch() {
    const resp = axios.get(
      `${BASE_URL}/?key=${KEY}&q=${this._query}&image_type=photo&orientation=horizontal&safesearch=true&page=${this._page}&per_page=40`
    );
    this.incrementPage();
    return resp;
  }

  get query() {
    return this._query;
  }

  set query(newQuery) {
    return (this._query = newQuery);
  }
  get page() {
    return this._page;
  }

  set page(newPage) {
    this._page = newPage;
  }

  incrementPage() {
    this._page += 1;
  }

  resetPage() {
    this._page = 1;
  }
}
