const fetchImages = () => {
  return fetch(`https://cors-anywhere.herokuapp.com/https://whos-the-murderer-backend.herokuapp.com/guess-who/images/`)
    .then((response) => response.json());
}

const addImage = (imageName) => {
  return fetch('https://cors-anywhere.herokuapp.com/https://whos-the-murderer-backend.herokuapp.com/guess-who/images/', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(imageName)
  })
}

export default {
  addImage: addImage,
  fetchImages: fetchImages
}
