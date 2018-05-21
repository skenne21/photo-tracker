const enableButton = () => {
  const title = $('.title').val();
  const url = $('.url').val();
  if ( title && url) {
    $('.add_photos').attr('disabled', false);
  } 
}

const createPhotos = event => {
  event.preventDefault();
  const title = $('.title').val();
  const url = $('.url').val();
  const photo = {
    title, 
    url
  };
  runPhotos(photo);
}

const runPhotos = photo => {
  postPhoto(photo);
  resetForm();
}

const resetForm = () => {
  $('.title').val(" ");
  $('.url').val(" ");
  $('.add_photos').attr('disabled', true);
}

const postPhoto = async (photo) => {
  const responseObject = {
    method: 'POST',
    body: JSON.stringify(photo),
    headers: { 'Content-Type': 'application/json' }
  };

  try {
    const response = await fetch('/api/v1/photos', responseObject);
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
    console.log(error);
  }
}

const appendPhotos = photos => {
  $('.show_photos').empty();
  const createdPhotos = photos.map(photo => {
    return (`
      <article class="photo" id="${photo.id}">
        <h3>Title: ${photo.title}</h3>
        <img src="${photo.url}"/>
        <button class="delete"></button>
      </article>
    `);
  });
  $('.show_photos').append(createdPhotos);
}

const removePhoto = event => {
  const closestArticle = $(event.target).closest('article')
  const id = closestArticle[0].id
  deletePhoto(id);
  $(closestArticle).remove();
}

const deletePhoto = async (id) => {
  const responseObject = {
    method: 'DELETE',
    body: JSON.stringify({id}),
    headers: { 'Content-Type': 'application/json' }
  };

  try {
    await fetch(`api/v1/photos/${id}`, responseObject)
  } catch (error) {
    console.log(error)
  }
}


$('input').on('keyup', enableButton);
$('.add_photos').on('click', createPhotos);
$('.show_photos').on('click', '.delete', removePhoto);
$(document).ready(() => {
  fetchPhotos();
});