import Notiflix from 'notiflix';
import NewsApi from './newsApi';
import { markup } from './functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import simpleLightbox from 'simplelightbox';

const searchForm = document.querySelector('.search-form');
const container = document.querySelector('.gallery');
const target = document.querySelector('.js-guard');

const newApi = new NewsApi();

searchForm.addEventListener('submit', handleSubmit);
let gallery = new SimpleLightbox('.gallery a');

function startFetch() {
  const resp = newApi.fetch();
  resp
    .then(data => {
      console.log();
      container.insertAdjacentHTML('beforeend', markup(data.data.hits));
      observer.observe(target);
      const totalHits = data.data.totalHits;
      if (totalHits > 0) {
        Notiflix.Notify.success(`"Hooray! We found ${totalHits} images."`);
      }
      gallery.refresh();
    })
    .catch(er => {
      Notiflix.Notify.failure('Error fetching data');
    });
}

let options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};
let observer = new IntersectionObserver(onLoad, options);

function onLoad(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const resp = newApi.fetch();
      resp.then(data => {
        container.insertAdjacentHTML('beforeend', markup(data.data.hits));
        if (data.data.total === data.data.totalHits) {
          observer.unobserve(target);
        }
      });
    }
  });
}

function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  newApi.query = form.elements.searchQuery.value;
  newApi.resetPage();
  container.innerHTML = '';

  if (newApi.query.trim().length === 0) {
    return Notiflix.Notify.info('You need to enter certain data');
  }
  try {
    startFetch();
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {}
}
