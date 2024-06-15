import Notiflix from 'notiflix';
import NewsApi from './newsApi';
import {markup} from './functions'
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
import simpleLightbox from 'simplelightbox';

const searchForm = document.querySelector('.search-form');
const container = document.querySelector('.gallery');
const btn = document.querySelector('.btn');




const newApi = new NewsApi();

searchForm.addEventListener('submit', handleSubmit);
btn.addEventListener('click', loadBtn);

let gallery = new SimpleLightbox('.gallery a');


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
    const resp = await newApi.fetch();
    container.insertAdjacentHTML('beforeend', markup(resp.data.hits));
    gallery.refresh();
    const totalHits = resp.data.totalHits;
   
    if(totalHits > 0){
      Notiflix.Notify.success(`"Hooray! We found ${totalHits} images."`);
    }
    const { height: cardHeight } = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();
 
  
  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
  } catch (error) {}
}

async function loadBtn() {
  try {
    const resp = await newApi.fetch();
    container.insertAdjacentHTML('beforeend', markup(resp.data.hits));
    gallery.refresh();
  } catch (error) {}
}
