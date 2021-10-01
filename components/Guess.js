import * as React from "react";
import { useEffect, useState } from "react";
import { isValidGuess } from "../helpers/wordFuncs";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  SafeAreaView
} from "react-native";
const Guess = ({ word, wordList, centre, onChildClick, correctWords }) => {
  const [guess, setGuess] = useState("");

  function onGuessKeyPress(event) {
    setGuess(event);
  }

  function handleGuessSubmit(event) {
    event.preventDefault();
    const isValid = isValidGuess(
      guess.toLowerCase(),
      word,
      wordList,
      correctWords,
      centre
    );
    if (Array.isArray(isValid)) {
      if (isValid[0]) {
        onChildClick(guess.toLowerCase(), true, isValid[1]);
      } else {
        onChildClick(guess.toLowerCase(), false, isValid[1]);
      }
    } else if (isValid) {
      onChildClick(guess.toLowerCase(), true, null);
    }
    setGuess("");
  }

  return (
    <>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          placeholder="Guess a word"
          value={guess}
          onChangeText={onGuessKeyPress}
          onSubmitEditing={handleGuessSubmit}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginTop: 5,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    borderColor: "#d3d6d8",
    fontFamily: "Roboto-Light"
  }
});

export default Guess;
