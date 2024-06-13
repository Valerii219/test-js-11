import Notiflix from 'notiflix';
import NewsApi from './newsApi';

const searchForm = document.querySelector('.search-form');
const container = document.querySelector('.gallery');
const btn = document.querySelector('.btn');

const newApi = new NewsApi();


searchForm.addEventListener('submit', handleSubmit);

async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;

  newApi.query = form.elements.searchQuery.value;

  if (newApi.query === '') {
    return Notiflix.Notify.warning('Please fill the field!');
  }
    newApi.fetch()
  container.innerHTML = markup(resp.data.hits);
     
}

btn.addEventListener('click',()=>{

  try {
    const resp =  axios(
        `${BASE_URL}/?key=${KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
      ) ;
      container.innerHTML = markup(resp.data.hits);
  } catch (error) {
    console.log(error);
  }
} )

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

