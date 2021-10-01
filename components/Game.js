import * as React from "react";
import { useState, useEffect } from "react";
import { possibleWords, shuffleWord } from "../helpers/wordFuncs";
import useAllWords from "../hooks/useAllWords";
import useAllWordsSimple from "../hooks/useAllWordsSimple";
import Guess from "./Guess";
import GuessesList from "./GuessesList";
import Square from "./Square";
import { StyleSheet, Text, View, FlatList } from "react-native";
import * as Progress from "react-native-progress";

const Game = ({ word, wordSet }) => {
  const wordList = wordSet ? useAllWordsSimple() : useAllWords();

  const [initialLoad, setInitialLoad] = useState(true);
  const [correctWords, setCorrectWords] = useState([]);
  const [shuffledWord, setShuffledWord] = useState(shuffleWord(word));
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [centreLetter, setCentreLetter] = useState(shuffledWord[4]);
  const [bgColorMin, setBgColorMin] = useState(null);
  const [bgColorAvg, setBgColorAvg] = useState(null);
  const [bgColorHigh, setBgColorHigh] = useState(null);
  const [possibleWordList, setPossibleWordList] = useState(
    possibleWords(shuffledWord, wordList)
  );
  const [minScore, setMinScore] = useState(
    Math.floor(possibleWordList.length * 0.2) > 20
      ? 20
      : Math.floor(possibleWordList.length * 0.2)
  );
  const [avgScore, setAvgScore] = useState(
    Math.floor(possibleWordList.length * 0.25) > 30
      ? 30
      : Math.floor(possibleWordList.length * 0.25)
  );
  const [highScore, setHighScore] = useState(
    Math.floor(possibleWordList.length * 0.4) > 40
      ? 40
      : Math.floor(possibleWordList.length * 0.4)
  );

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      setBgColorMin("white");
      setBgColorAvg("white");
      setBgColorHigh("white");
      return;
    }

    const newShuffledWord = shuffleWord(word);
    setShuffledWord(newShuffledWord);
    setPossibleWordList(possibleWords(newShuffledWord, wordList));

    setCentreLetter(newShuffledWord[4]);

    setCorrectWords([]);
    setSuccessMsg(null);
    setError(null);
    setBgColorMin("white");
    setBgColorAvg("white");
    setBgColorHigh("white");
  }, [word]);

  useEffect(() => {
    if (correctWords.length >= minScore) {
      setBgColorMin("#C1E1C1");
    } else {
      setBgColorMin("white");
    }
    if (correctWords.length >= avgScore) {
      setBgColorAvg("#C1E1C1");
    } else {
      setBgColorAvg("white");
    }
    if (correctWords.length >= highScore) {
      setBgColorHigh("#C1E1C1");
    } else {
      setBgColorHigh("white");
    }
  }, [correctWords]);

  useEffect(() => {
    setMinScore(
      Math.floor(possibleWordList.length * 0.2) > 20
        ? 20
        : Math.floor(possibleWordList.length * 0.2)
    );
    setAvgScore(
      Math.floor(possibleWordList.length * 0.25) > 30
        ? 30
        : Math.floor(possibleWordList.length * 0.25)
    );
    setHighScore(
      Math.floor(possibleWordList.length * 0.4) > 40
        ? 40
        : Math.floor(possibleWordList.length * 0.4)
    );
  }, [possibleWordList]);

  function updateCorrectWordList(word, passed, message) {
    if (passed) {
      setCorrectWords([word, ...correctWords]);
      if (message) {
        setSuccessMsg(message);
      } else {
        setSuccessMsg(null);
      }
      setError(null);
    } else {
      setError(message);
      setSuccessMsg(null);
    }
  }

  const renderItem = ({ item, index }) => (
    <Square isCenterLetter={index === 4} letter={item} />
  );
  return (
    <>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <FlatList
          numColumns={3}
          data={shuffledWord}
          renderItem={renderItem}
          keyExtractor={item => item}
        />

        <Guess
          word={word}
          wordList={possibleWordList}
          centre={centreLetter}
          onChildClick={updateCorrectWordList}
          correctWords={correctWords}
        />

        {error ? (
          <View style={styles.error}>
            <Text style={{ fontFamily: "Roboto-Light" }}>{error}</Text>
          </View>
        ) : null}
        {successMsg ? (
          <View style={styles.success}>
            <Text style={{ fontFamily: "Roboto-Light" }}>{successMsg}</Text>
          </View>
        ) : null}

        <View
          style={{
            flexDirection: "row",
            margin: 10
          }}
        >
          <View
            style={{
              textAlign: "center",
              backgroundColor: `${bgColorMin}`,
              borderColor: "#d3d6d8",
              borderWidth: 1
            }}
          >
            <Text style={{ fontFamily: "Roboto-Light" }}>
              {" "}
              🥉 {minScore} words{" "}
            </Text>
          </View>

          <View
            style={{
              textAlign: "center",
              backgroundColor: `${bgColorAvg}`,
              borderColor: "#d3d6d8",
              borderWidth: 1
            }}
          >
            <Text style={{ fontFamily: "Roboto-Light" }}>
              {" "}
              🥈 {avgScore} words{" "}
            </Text>
          </View>

          <View
            style={{
              textAlign: "center",
              backgroundColor: `${bgColorHigh}`,
              borderColor: "#d3d6d8",
              borderWidth: 1
            }}
          >
            <Text style={{ fontFamily: "Roboto-Light" }}>
              {" "}
              🥇 {highScore} words{" "}
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            marginTop: 10,
            marginBottom: 10,
            flexDirection: "row"
          }}
        >
          {correctWords.length > 0 ? (
            <>
              <Progress.Bar
                progress={correctWords.length / minScore}
                width={200}
                color="#C1E1C1"
                height={60}
              >
                <Text
                  style={{
                    position: "absolute",
                    flex: 0,
                    fontFamily: "Roboto-Light"
                  }}
                >
                  Progress
                </Text>
              </Progress.Bar>
            </>
          ) : null}
        </View>

        <View style={{ flex: 6, marginTop: 25 }}>
          {correctWords.length > 0 ? (
            <GuessesList correctWords={correctWords} />
          ) : null}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  error: {
    height: 60,
    borderWidth: 1,
    margin: 10,
    padding: 5,
    backgroundColor: "#f8d7da",
    borderColor: "#f5c2c7",
    textAlign: "center",
    justifyContent: "center"
  },
  success: {
    height: 40,
    borderWidth: 1,
    margin: 10,
    padding: 5,
    backgroundColor: "#d1e7dd",
    borderColor: "#badbcc",
    textAlign: "center",
    justifyContent: "center"
  }
});

export default Game;
