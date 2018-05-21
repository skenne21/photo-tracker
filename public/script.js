

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
    fetchPhotos();
  } catch ( error ) {
    console.log(error);
  }
}

const fetchPhotos = async () => {
  try {
    const response = await fetch('/api/v1/photos');
    const photos = response.json();
    appendPhotos(photos);
  } catch (error) {
    console.log(error)
  }
}

const appendPhotos = (photos) => {
  const parnet = $('.show_photos');
  
}

$('.add_photos').on('click', createPhotos);