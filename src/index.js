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

async function startFetch() {
  const resp = await newApi.fetch();
  container.insertAdjacentHTML('beforeend', markup(resp.data.hits));
  console.log(resp);
  const totalHits = resp.data.totalHits;
  if (totalHits > 0) {
    Notiflix.Notify.success(`"Hooray! We found ${totalHits} images."`);
  }
  gallery.refresh();

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
      container.insertAdjacentHTML('beforeend', markup(resp.data.hits));
    }
    
  });
}

async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  newApi.query = form.elements.searchQuery.value;
  newApi.resetPage();
  container.innerHTML = '';

  if (newApi.query === '') {
    return Notiflix.Notify.warning('Please fill the field!');
  }
  try {
   startFetch();
    observer.observe(target);
    // if (newApi.page * 40 >= totalHits) {
    //   observer.unobserve(target);
    // }
    // if(resp.data.hits === resp.data.totalHits){
    //   observer.unobserve(target)
    // }
   
    
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {}
}


