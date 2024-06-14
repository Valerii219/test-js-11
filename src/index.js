import Notiflix from 'notiflix';
import NewsApi from './newsApi';

const searchForm = document.querySelector('.search-form');
const container = document.querySelector('.gallery');
const btn = document.querySelector('.btn');

const newApi = new NewsApi();

searchForm.addEventListener('submit', handleSubmit);
btn.addEventListener('click', loadBtn);

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
  } catch (error) {}
}

async function loadBtn() {
  try {
    const resp = await newApi.fetch();
    container.insertAdjacentHTML('beforeend', markup(resp.data.hits));
  } catch (error) {}
}

function markup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" width='250'/>
    <div class="info">
      <p class="info-item">
        <b class = "bb">Likes:<span class = span-opt>${likes}<span/></b>
      </p>
      <p class="info-item">
        <b class = "bb">Views:<span class = span-opt>${views}<span/></b>
      </p>
      <p class="info-item">
        <b class = "bb">Comments:<span class = span-opt>${comments}<span/></b>
      </p>
      <p class="info-item">
        <b class = "bb">Downloads:<span class = span-opt>${downloads}<span/></b>
      </p>
    </div>
  </div>`
    )
    .join('');
}
