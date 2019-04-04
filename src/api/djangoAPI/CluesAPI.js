const fetchClues = () => {
  return fetch(`https://cors-anywhere.herokuapp.com/https://whos-the-murderer-backend.herokuapp.com/guess-who/clues/`)
    .then((response) => response.json());
}

export default {
  fetchClues: fetchClues
}
