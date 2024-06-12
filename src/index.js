import axios from 'axios';
import Notiflix from 'notiflix';

const searchForm = document.querySelector('.search-form');
const container = document.querySelector('.gallery')

const BASE_URL = 'https://pixabay.com/api';
const KEY = '36861352-2474982a97ff1b570eda1c4c2';
let page = 1;

searchForm.addEventListener('submit', handleSubmit);

async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const inputValue = form.elements.searchQuery.value;

  if (inputValue === '') {
    return Notiflix.Notify.warning('Please fill the field!');
  }
  try {
    const resp = await axios(
        `${BASE_URL}/?key=${KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
      ) ;
      container.innerHTML = markup(resp.data.hits);
  } catch (error) {
    console.log(error);
  }
    
     
     
}

function markup(arr) {
  return arr.map(
      ({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) =>
        `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes:${likes}</b>
    </p>
    <p class="info-item">
      <b>Views:${views}</b>
    </p>
    <p class="info-item">
      <b>Comments:${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads:${downloads}</b>
    </p>
  </div>
</div>`
    )
    .join('');
}

