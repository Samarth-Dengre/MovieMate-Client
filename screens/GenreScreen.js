import React, { useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";
import { moviesRoute } from "../utils/routes";
import MoviesList from "../components/movies/MoviesList";
import Toast from "react-native-simple-toast";
import ErrorPage from "../components/ErrorPage";

function GenreScreen({ navigation, route }) {
  const [movies, setMovies] = useState();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.genre,
    });

    // Fetch movies from the server
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get(
          `${moviesRoute}/${route.params.genre}`
        );
        if (data.status === 200) {
          setMovies(data.movies);
        } else if (data.status === 400) {
          Toast.showWithGravity(data.message, Toast.SHORT, Toast.TOP);
        }
      } catch (error) {
        Toast.showWithGravity(error.message, Toast.SHORT, Toast.TOP);
        return <ErrorPage />;
      }
    };

    fetchMovies();
  }, [route]);

  return (
    <View style={styles.container}>
      {movies ? (
        <MoviesList movies={movies} />
      ) : (
        <Text style={styles.text}>No movies found</Text>
      )}
    </View>
  );
}

export default GenreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: "white",
  },
});
