import React, { useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";
import { moviesRoute } from "../utils/routes";
import MoviesList from "../components/movies/MoviesList";
import Toast from "react-native-simple-toast";
import ErrorPage from "../components/ErrorPage";
import GifLoader from "../components/Loaders/GifLoader";

function GenreScreen({ navigation, route }) {
  const [movies, setMovies] = useState();
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
        if (data.status === 200) {
          setMovies(data.movies);
        } else if (data.status === 400) {
          Toast.showWithGravity(data.message, Toast.SHORT, Toast.TOP);
        }
      } catch (error) {
        setLoading(false);
        Toast.showWithGravity(error.message, Toast.SHORT, Toast.TOP);
        return <ErrorPage />;
      }
    };

    fetchMovies();

    // return () => {
    //   setMovies(null);
    // };
  }, [route]);

  if (loading) {
    return <GifLoader />;
  }

  return (
    <View style={styles.container}>
      {movies ? (
        <MoviesList movies={movies} />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.text}>No movies found</Text>
        </View>
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
