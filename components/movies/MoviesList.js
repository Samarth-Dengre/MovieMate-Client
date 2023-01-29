import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Movie from "./Movie";

function MoviesList({ movies }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={({ id }) => {
          return id;
        }}
        renderItem={({ item }) => {
          return <Movie movie={item} />;
        }}
      />
    </View>
  );
}

export default MoviesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
