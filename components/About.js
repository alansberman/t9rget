import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
const About = () => {
  return (
    <View className="row">
      <View className="col">
        <View className="card">
          <View className="card-header">
            <Text>How to Play</Text>
          </View>
          <View className="card-body">
            <Text>
              Find words using the letters of the 3x3 grid
              {"\n"}
              Words must be at least 4 letters long
              {"\n"}
              Words must contain the centre letter
              {"\n"}
              There is at least one 9-letter word
              {"\n"}
              Find as many words as you can, and go for 🥇!
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default About;
