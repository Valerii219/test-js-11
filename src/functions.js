export function markup(arr) {
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
      <a href="${largeImageURL}"><img class="img-card"src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
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
  