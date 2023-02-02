import React, { useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, BackHandler } from "react-native";
import axios from "axios";
import { moviesRoute } from "../utils/routes";
import MoviesList from "../components/movies/MoviesList";
import Toast from "react-native-simple-toast";
import ErrorPage from "../components/ErrorPage";
import GifModal from "../components/modals/GifModal";

function GenreScreen({ navigation, route }) {
  // adding event listeners to the back button to navigate to the previous screen
  useLayoutEffect(() => {
    const backAction = () => {
      navigation.navigate("Home");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  });

  const [movies, setMovies] = useState(); // movies array
  const [loading, setLoading] = useState(true); // loading state to show loader when fetching movies from the server

  // Set the title of the screen to the genre name passed from the previous screen and fetch movies from the server when the component is mounted
  useLayoutEffect(() => {
    // Set the title of the screen to the genre name passed from the previous screen
    navigation.setOptions({
      title: route.params.genre,
    });

    // Fetch movies from the server
    const fetchMovies = async () => {
      try {
        // Fetch movies from the server and set the movies state to the movies array
        const { data } = await axios.get(
          `${moviesRoute}/${route.params.genre}`
        );
        setLoading(false);
        if (data.status === 200) {
          // if the movies are found, we set the movies state to the movies array
          setMovies(data.movies);
        } else if (data.status === 400) {
          // if the movies are not found, we show an error page
          Toast.showWithGravity(data.message, Toast.SHORT, Toast.TOP);
        }
      } catch (error) {
        setLoading(false);
        Toast.showWithGravity(error.message, Toast.SHORT, Toast.TOP); // if there is an error, we show an error page and a toast message with the error message from the server
        return <ErrorPage />;
      }
    };

    fetchMovies();
    return () => {
      setMovies(); // clean up the movies state
      setLoading(true); // clean up the loading state
    };
  }, [route.params.genre]); // run the hook when the route changes

  return (
    <View style={styles.container}>
      {/* showing the loader while fetching movies */}
      <GifModal visible={loading} />

      {/* if the movies state is not empty, we show the movies list, otherwise we show a message */}
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
