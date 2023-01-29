import React, { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import axios from "axios";
import { moviesRoute } from "../utils/routes";
import MoviesList from "../components/movies/MoviesList";
function MoviesScreen() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching movies from the server, this hook will run when the component is mounted
  useEffect(() => {
    async function fetchMovies() {
      const { data } = await axios.get(moviesRoute);
      if (data.status === 200) {
        setMovies(data.movies);
        setLoading(false);
      } else if (data.status === 400) {
        setLoading(false);
        return <ErrorPage />;
      }
    }
    fetchMovies();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Image source={require("../assets/giphy.gif")} />
      ) : movies.length > 0 ? (
        <MoviesList movies={movies} />
      ) : (
        <Text style={styles.text}>No movies found</Text>
      )}
    </View>
  );
}

export default MoviesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: "white",
  },
});
