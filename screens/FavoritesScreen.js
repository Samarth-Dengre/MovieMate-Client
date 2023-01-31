import React, { useEffect, useState, useContext } from "react";
import { Text, View } from "react-native";
import { AuthContext } from "../store/authContext";
import axios from "axios";
import { moviesRoute } from "../utils/routes";
import MoviesList from "../components/movies/MoviesList";
import ErrorPage from "../components/ErrorPage";
import GifModal from "../components/modals/GifModal";

function FavoritesScreen() {
  const [movies, setMovies] = useState([]); // movies state
  const [loading, setLoading] = useState(true); // loading state to show a loader while fetching movies
  const authCtx = useContext(AuthContext);

  // Fetching movies from the server, this hook will run when the component is mounted and when the favorites array changes
  useEffect(() => {
    const favorites = authCtx.user.favorites; // getting the favorites array from the user object

    // if the favorites array is empty, we don't need to fetch movies from the server
    if (favorites.length === 0) {
      setLoading(false);
      return;
    }

    // fetching movies from the server
    async function fetchMovies() {
      // sending the favorites array to the server to get the movies from the database that match the ids in the favorites array
      const { data } = await axios.post(moviesRoute, {
        ids: favorites,
      });
      if (data.status === 200) {
        // if the movies are found, we set the movies state to the movies array
        setMovies(data.movies);
        setLoading(false); // and we hide the loader
      } else if (data.status === 400) {
        // if the movies are not found, we show an error page
        setLoading(false);
        return <ErrorPage />;
      }
    }
    fetchMovies();

    return () => {
      // this return function will run when the component is unmounted, we use it to clear the movies state
      setMovies([]);
    };
  }, [authCtx.user.favorites]);

  return (
    <View style={{ flex: 1 }}>
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
          <Text style={{ color: "white" }}>No movies found</Text>
        </View>
      )}
    </View>
  );
}

export default FavoritesScreen;
