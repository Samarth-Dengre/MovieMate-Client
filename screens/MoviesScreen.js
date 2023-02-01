import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import axios from "axios";
import { moviesRoute } from "../utils/routes";
import MoviesList from "../components/movies/MoviesList";
import GifModal from "../components/modals/GifModal";
import ErrorPage from "../components/ErrorPage";
function MoviesScreen() {
  const [movies, setMovies] = useState([]); // movies state
  const [loading, setLoading] = useState(true); // loading state to show a loader while fetching movies

  // Fetching movies from the server, this hook will run when the component is mounted
  useEffect(() => {
    // fetching movies from the server
    async function fetchMovies() {
      try {
        // sending request to the server to get all the movies
        const { data } = await axios.get(moviesRoute);
        if (data.status === 200) {
          // if the movies are found, we set the movies state to the movies array
          setMovies(data.movies);
          setLoading(false);
        } else if (data.status === 400) {
          // if the movies are not found, we show an error page
          setLoading(false);
          return <ErrorPage />;
        }
      } catch (error) {
        setLoading(false);
        return <ErrorPage />;
      }
    }
    fetchMovies();
  }, []);

  return (
    <View style={styles.container}>
      {/* showing the loader while fetching movies */}
      <GifModal visible={loading} />

      {/* if the movies state is not empty, we show the movies list, otherwise we show a message */}
      {movies.length > 0 ? (
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

export default MoviesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: "white",
  },
});
