import * as React from "react";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
const Square = ({ letter, isCenterLetter }) => {
  const [l] = useState(letter);
  const [center] = useState(isCenterLetter);

  if (center) {
    return (
      <View
        style={{
          height: 50,
          width: 50,
          backgroundColor: "black",
          alignItems: "center",
          borderWidth: 1,
          justifyContent: "center"
        }}
      >
        <Text
          style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
        >
          {l.toUpperCase()}
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        height: 50,
        width: 50,
        backgroundColor: "white",
        alignItems: "center",
        borderWidth: 1,
        justifyContent: "center"
      }}
    >
      <Text style={{ textAlign: "center", fontWeight: "bold" }}>
        {l.toUpperCase()}
      </Text>
    </View>
  );
};

export default Square;
