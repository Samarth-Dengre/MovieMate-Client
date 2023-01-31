import React, { useEffect, useState, useContext } from "react";
import { Text, View } from "react-native";
import { AuthContext } from "../store/authContext";
import axios from "axios";
import { moviesRoute } from "../utils/routes";
import MoviesList from "../components/movies/MoviesList";
import GifLoader from "../components/Loaders/GifLoader";

function FavoritesScreen() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    const favorites = authCtx.user.favorites;
    if (favorites.length === 0) {
      setLoading(false);
      return;
    }

    async function fetchMovies() {
      const { data } = await axios.post(moviesRoute, {
        ids: favorites,
      });
      if (data.status === 200) {
        setMovies(data.movies);
        setLoading(false);
      } else if (data.status === 400) {
        setLoading(false);
        return <ErrorPage />;
      }
    }
    fetchMovies();

    return () => {
      setMovies([]);
    };
  }, [authCtx.user.favorites]);

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <GifLoader />
      ) : movies.length > 0 ? (
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
