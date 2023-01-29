// This component will render the individual movie item

import React from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";

function Movie({ movie }) {
  // This function will be called when user presses on the movie card
  function handleMoviePress(id) {
    // Redirect to the movie details page
    console.log("Movie pressed:", id);
  }

  //   This function will be called when user presses on the genre text
  function handleGenrePress(genre) {
    // Redirect to the genre page
    console.log("Genre pressed:", genre);
  }

  return (
    // Making the movie card pressable so that when user presses on it, it will show redirect to the movie details page
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={handleMoviePress.bind(this, movie.id)}
    >
      <Image
        source={{ uri: movie.image }}
        style={{ width: "100%", height: 180 }}
      />
      <View style={styles.titleContainer}>
        <Text style={[styles.text, styles.title]}>{movie.movieName}</Text>
        <Text style={styles.text}>imdb: {movie.imdb}</Text>
      </View>
      <View style={styles.genre}>
        {movie.genre.map((genre, index) => {
          return (
            // Making the genre text pressable so that when user presses on it, it will show redirect to the genre page
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.genreTextContainer,
                pressed && styles.pressed,
              ]}
              onPress={handleGenrePress.bind(this, genre)}
            >
              <Text style={styles.genreText}>{genre}</Text>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.castContainer}>
          <Text style={{ color: "grey", fontFamily: "Lora-Regular" }}>
            {movie.cast}
          </Text>
        </View>
        <View style={styles.durationContainer}>
          <Text style={{ color: "grey" }}>duration: {movie.length}m</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default Movie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    overflow: "hidden",
    borderRadius: 15,
    backgroundColor: "black",
    paddingBottom: 10,
    elevation: 5,
  },
  text: {
    color: "white",
  },
  pressed: {
    opacity: 0.7,
  },
  title: {
    fontSize: 16,
    fontFamily: "RobotoSlab-Regular",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  genre: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10,
  },
  genreText: {
    color: "white",
    fontSize: 12,
    fontFamily: "RobotoSlab-Regular",
  },
  genreTextContainer: {
    backgroundColor: "#404040",
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 10,
    minWidth: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  durationContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  castContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    width: "70%",
  },
});
