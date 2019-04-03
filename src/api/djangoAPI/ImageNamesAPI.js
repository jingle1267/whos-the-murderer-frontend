// const fetchImagesByUserID = (userID) => {
//   return fetch(`https://cors-anywhere.herokuapp.com/https://guess-the-murderer-backend.herokuapp.com/guess-who/images/`)
//     .then((response) => response.json());
// }

const fetchImages = () => {
  return fetch(`https://cors-anywhere.herokuapp.com/https://guess-the-murderer-backend.herokuapp.com/guess-who/images/`)
    .then((response) => response.json());
}


const addImage = (imageName) => {
  return fetch('https://cors-anywhere.herokuapp.com/https://guess-the-murderer-backend.herokuapp.com/guess-who/images/', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(imageName)
  })
}

// const deleteImage = (imageName) => {
//   return fetch(`https://cors-anywhere.herokuapp.com/https://guess-the-murderer-backend.herokuapp.com/guess-who/images/${imageName}/`, {
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     method: 'DELETE'
//   })
// }

export default {
  addImage: addImage,
  fetchImages: fetchImages
}
