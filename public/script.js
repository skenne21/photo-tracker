

const createPhotos = event => {
  event.preventDefault();
  const title = $('.title').val()
  const url = $('.url').val()
  const photo = {
    title, 
    url
  }
  setPhoto(photo);
  setInputs()
}

const setInputs = () => {
  $('.title').val(" ");
  $('.url').val(" ");
}

const setPhoto = async (photo) => {
  console.log(photo)
  try {
    const response = await fetch('/api/v1/photos', {
      method: 'POST',
      body: JSON.stringify(photo),
      headers: { 'Content-Type': 'application/json' }
    });
    await fetchPhotos();
  } catch ( error ) {
    console.log(error);
  }
}

const fetchPhotos = async () => {
  try {
    const response = await fetch('/api/v1/photos');
    const photos = await response.json();
    await appendPhotos(photos);
  } catch (error) {
    console.log(error)
  }
}

const appendPhotos = (photos) => {
  console.log(photos)
  $('.show_photos').empty();
  console.log(photos)
  const createdPhotos = photos.map(photo => {
    return (`
      <article>
        <h3>Title:${photo.title}</h3>
        <img src="${photo.url}"/>
        <button class="delete">X</button>
      </article>
    `)
  })
  $('.show_photos').append(createdPhotos)
}

$('.add_photos').on('click', createPhotos);