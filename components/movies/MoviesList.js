import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Movie from "./Movie";

function MoviesList({ movies }) {
  return (
    <View style={styles.container}>
      {/* This will show the list of movies */}
      <FlatList
        data={movies}
        keyExtractor={({ id }) => {
          return id;
        }}
        renderItem={({ item }) => {
          return <Movie movie={item} />; // This will render the individual movie item
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
