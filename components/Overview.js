import * as React from "react";
import { useState } from "react";
import useChosenWord from "../hooks/useChosenWord";
import useChosenWordSimple from "../hooks/useChosenWordSimple";
import Game from "./Game";
import About from "./About";
import { StyleSheet, Button, Text, View, Switch } from "react-native";
const Overview = () => {
  const [wordSet, setWordSet] = useState(false);
  const [word, setWord] = useState(null);
  const [gameInProgress, setGameInProgress] = useState(false);

  const getWord = () => {
    return wordSet ? useChosenWordSimple() : useChosenWord();
  };

  const newGame = () => {
    const newWord = getWord();
    setWord(newWord);
    const gameNow = true;
    setGameInProgress(gameNow);
  };

  const toggleDifficulty = () => setWordSet(previousState => !previousState);

  return (
    <>
      <View style={{ flex: 2 }}></View>
      <View>
        <Text h2 style={{ fontSize: 24, fontFamily: "Roboto-Bold" }}>
          T9rget
        </Text>
      </View>
      <View style={{ flexDirection: "row", margin: 10 }}>
        <Text style={{ fontFamily: "Roboto-Light" }}>
          Word List: {wordSet ? "Easy" : "Hard"}
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={wordSet ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          style={{ marginLeft: 5 }}
          onValueChange={toggleDifficulty}
          value={wordSet}
        />
      </View>
      <View style={{ margin: 10 }}>
        <Button
          type="button"
          color="green"
          className="btn btn-primary"
          title="New Game"
          onPress={newGame}
          style={{ fontFamily: "Roboto-Light" }}
        ></Button>
      </View>
      <View style={{ flex: 12 }}>
        {!gameInProgress ? <About /> : null}
        {gameInProgress ? <Game word={word} easyWordSet={wordSet} /> : null}
      </View>
    </>
  );
};

export default Overview;
