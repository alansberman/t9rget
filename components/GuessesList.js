import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Item,
  SafeAreaView,
  ScrollView
} from "react-native";
const GuessesList = ({ correctWords }) => {
  return (
    <>
      <View className="row">
        <View className="col-12 g-0">
          {correctWords.length > 0 ? (
            <Text h5>Found words ({correctWords.length}):</Text>
          ) : null}
          <SafeAreaView>
            <ScrollView>
              {correctWords.map((item, index) => (
                <View key={index}>
                  <Text> - {item}</Text>
                </View>
              ))}
            </ScrollView>
          </SafeAreaView>
        </View>
      </View>
    </>
  );
};

export default GuessesList;
