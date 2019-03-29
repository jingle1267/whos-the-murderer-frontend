// const fetchImagesByUserID = (userID) => {
//   return fetch(`https://cors-anywhere.herokuapp.com/https://guess-the-murderer-backend.herokuapp.com/guess-who/images/`)
//     .then((response) => response.json());
// }

const fetchImages = () => {
  return fetch(`https://cors-anywhere.herokuapp.com/https://guess-the-murderer-backend.herokuapp.com/guess-who/images/`)
    .then((response) => response.json());
}

export default {
  // fetchImagesByID: fetchImagesByID,
  fetchImages: fetchImages
}
