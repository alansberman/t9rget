// thanks to https://stackoverflow.com/questions/3943772/how-do-i-shuffle-the-characters-in-a-string-in-javascript
const shuffleWord = word => {
  if (word) {
    let w = word.split("");

    for (let i = w.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let tmp = w[i];
      w[i] = w[j];
      w[j] = tmp;
    }
    return w;
  }
};

const possibleWords = (shuffledWord, wordList) => {
  // thanks to https://stackoverflow.com/questions/5667888/counting-the-occurrences-frequency-of-array-elements

  const targetWordCharCounts = shuffledWord.reduce(function (acc, curr) {
    return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
  }, {});

  let eligibleWords = wordList
    .filter(
      item =>
        item.includes(shuffledWord[4]) &&
        item.split("").every(char => shuffledWord.includes(char))
    )
    .filter(item => {
      const wordCharCounts = getWordCharCounts(item);

      for (const [key, value] of Object.entries(wordCharCounts)) {
        if (value > targetWordCharCounts[key]) {
          return false;
        }
      }
      return true;
    });

  return eligibleWords;
};

const getWordCharCounts = word => {
  if (word) {
    return word.split("").reduce(function (acc, curr) {
      return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
    }, {});
  }
};

const isValidGuess = (guess, word, wordList, correctWords, centre) => {
  if (guess.length < 4 || guess.length > 10) {
    return [false, "Words must be between 4 and 9 letters long"];
  }

  if (!guess.includes(centre)) {
    return [false, "Words must contain the centre letter"];
  }

  for (let character of guess) {
    if (!word.includes(character)) {
      return [false, "Words must only contain letters in the grid"];
    }
  }

  const guessCharCounts = getWordCharCounts(guess);
  const targetWordCharCounts = getWordCharCounts(word);

  for (const [key, value] of Object.entries(guessCharCounts)) {
    if (value > targetWordCharCounts[key]) {
      return [
        false,
        "Words cannot have more instances of a letter than in the grid"
      ];
    }
  }

  if (wordList.indexOf(guess) === -1) {
    return [false, `${guess} is not a valid word`];
  }

  if (correctWords.indexOf(guess) !== -1) {
    return false;
  }

  if (guess.length === 9) {
    return [true, "Congratulations! You got a 9-letter word!"];
  }

  return true;
};

module.exports = {
  possibleWords,
  shuffleWord,
  isValidGuess,
  getWordCharCounts
};
