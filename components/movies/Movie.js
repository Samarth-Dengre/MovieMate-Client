// This component will render the individual movie item

import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";

function Movie({ movie }) {
  const navigation = useNavigation();

  // This function will be called when user presses on the movie card
  function handleMoviePress(id) {
    // Redirect to the movie details page
    navigation.navigate("Individual", { id, title: movie.movieName });
  }

  //   This function will be called when user presses on the genre text
  function handleGenrePress(genre) {
    // Redirect to the genre page
    navigation.navigate("Genre", { genre });
  }

  return (
    // Making the movie card pressable so that when user presses on it, it will show redirect to the movie details page
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={handleMoviePress.bind(this, movie.id)}
    >
      {/* This will show the image of the movie */}
      <Image
        source={{ uri: movie.image }}
        style={{ width: "100%", height: 180 }}
      />

      {/* This will show the title and imdb of the movie */}
      <View style={styles.titleContainer}>
        <Text style={[styles.text, styles.title]}>{movie.movieName}</Text>
        <Text style={styles.text}>imdb: {movie.imdb}</Text>
      </View>

      {/* This will show the genre of the movie */}
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

      {/* This will show the cast and duration of the movie */}
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
  // This will style the movie card container
  container: {
    flex: 1,
    margin: 15,
    overflow: "hidden",
    borderRadius: 15,
    backgroundColor: "black",
    paddingBottom: 10,
    elevation: 5,
  },
  // This will change the text color to white
  text: {
    color: "white",
  },
  // This will change the opacity of the thing when user presses on it
  pressed: {
    opacity: 0.7,
  },
  // This will style the title of the movie
  title: {
    fontSize: 16,
    fontFamily: "RobotoSlab-Regular",
  },

  // This will style the title and imdb container
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },

  // This will style the genre container
  genre: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10,
  },

  // This will style the genre text
  genreText: {
    color: "white",
    fontSize: 12,
    fontFamily: "RobotoSlab-Regular",
  },

  // This will style the genre text container
  genreTextContainer: {
    backgroundColor: "#404040",
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 10,
    minWidth: 100,
    alignItems: "center",
    justifyContent: "center",
  },

  // This will style the duration container
  durationContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
  },

  // This will style the cast and duration container
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },

  // This will style the cast container
  castContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    width: "70%",
  },
});
