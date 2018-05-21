

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
  try {
    const response = await fetch('/api/v1/photos', {
      method: 'POST',
      body: JSON.stringify(photo),
      headers: { 'Content-Type': 'application/json' }
    });
    await fetchPhotos()
  } catch ( error ) {
    console.log(error);
  }
}

const fetchPhotos = () => {
  try {

  } catch (error) {
    console.log(error)
  }
}

$('.add_photos').on('click', createPhotos);