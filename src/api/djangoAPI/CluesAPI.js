// const fetchImagesByUserID = (userID) => {
//   return fetch(`https://cors-anywhere.herokuapp.com/https://guess-the-murderer-backend.herokuapp.com/guess-who/images/`)
//     .then((response) => response.json());
// }

const fetchClues = () => {
  return fetch(`https://cors-anywhere.herokuapp.com/https://guess-the-murderer-backend.herokuapp.com/guess-who/clues/`)
    .then((response) => response.json());
}

export default {
  // fetchCluesByID: fetchCluesByID,
  fetchClues: fetchClues
}
