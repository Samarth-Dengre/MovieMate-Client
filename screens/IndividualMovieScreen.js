import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";
import { auth, moviesRoute } from "../utils/routes";
import Toast from "react-native-simple-toast";
import ErrorPage from "../components/ErrorPage";
import DetailedMoviePage from "../components/DetailedMoviePage/DetailedMoviePage";
import IconButton from "../components/Buttons/IconButton";
import { AuthContext } from "../store/authContext";
import { Colors } from "../constants/Colors";
import SimpleModal from "../components/modals/SimpleModal";
import GifModal from "../components/modals/GifModal";

function IndividualMovieScreen({ route, navigation }) {
  const authCtx = useContext(AuthContext);
  const [movie, setMovie] = useState(); // Movie object
  const [loading, setLoading] = useState(true); // Loading state when the movie is being fetched
  const [addingToFavorites, setAddingToFavorites] = useState(false); // Loading state when the movie is being added to favorites
  const [isFavorite, setIsFavorite] = useState(false); // State to check if the movie is already in favorites

  // Function to add/remove the movie to favorites
  async function addToFavoritesHandler() {
    // Add movie to favorites
    try {
      setAddingToFavorites(true);
      // Send a patch request to the server to add/remove the movie to favorites
      const { data } = await axios.patch(auth, {
        movieId: route.params.id,
        user: authCtx.user,
      });
      setAddingToFavorites(false);

      // Check if the movie was added/removed to favorites
      if (data.status === 200) {
        Toast.showWithGravity(data.message, Toast.SHORT, Toast.TOP);
        authCtx.authenticate(data.user);
        if (data.user.favorites.includes(route.params.id)) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      } else if (data.status === 400) {
        // If the movie was not added/removed to favorites
        Toast.showWithGravity(data.message, Toast.SHORT, Toast.TOP);
      }
    } catch (error) {
      setAddingToFavorites(false);
      return <ErrorPage />;
    }
  }

  //This hook will execute when the favorite status of the movie changes or when the movie changes Set the header options according to the movie
  useEffect(() => {
    setIsFavorite(authCtx.user.favorites.includes(route.params.id)); // Check if the movie is already in favorites, then set the state
    navigation.setOptions({
      title: route.params.title, // Set the title of the header to the movie title
      headerRight: () => (
        // Setting Header right button(Heart icon)
        <View style={{ marginRight: 10 }}>
          <IconButton
            name={isFavorite ? "heart" : "heart-outline"} // If the movie is already in favorites, show a filled heart, else show an outline heart
            size={30}
            color={isFavorite ? Colors.accent800 : "white"}
            onPress={addToFavoritesHandler}
          />
        </View>
      ),
    });
  }, [route.params, navigation, authCtx.user, isFavorite]); // Re-render the header when the movie is added/removed to favorites

  // This hook will execute when the movie changes
  useEffect(() => {
    // Fetch movie from the server
    async function fetchMovie() {
      try {
        // Send a get request to the server to fetch the movie details from the database using the movie id
        const { data } = await axios.get(`${moviesRoute}/${route.params.id}`);
        setLoading(false);
        if (data.status === 200) {
          // If the movie is found, set the movie state
          setMovie(data.movie);
        } else if (data.status === 400) {
          // If the movie is not found, show an error message
          Toast.showWithGravity(data.message, Toast.SHORT, Toast.TOP);
          return <ErrorPage />; // Return an error page
        }
      } catch (error) {
        setLoading(false);
        Toast.showWithGravity(error.message, Toast.SHORT, Toast.TOP); // Show an error message if the request fails for some reason and return an error page
        return <ErrorPage />;
      }
    }
    fetchMovie();

    return () => {
      // This will execute when the component unmounts, this will reset the states
      setMovie(null);
      setAddingToFavorites(false);
      setLoading(true);
    };
  }, [route.params, navigation]); // Re-render the component when the movie changes

  return (
    <View style={styles.container}>
      {/*   If the movie is being added to favorites, show a loader */}
      <SimpleModal visible={addingToFavorites} />

      {/* If the movie is being fetched, show a loader */}
      <GifModal visible={loading} />

      {/* If the movie array is non-empty, show the movie details, else show no movies found */}
      {movie ? (
        <DetailedMoviePage movie={movie} />
      ) : (
        <View
          style={[
            styles.container,
            {
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Text style={{ color: "white" }}>No movie found</Text>
        </View>
      )}
    </View>
  );
}

export default IndividualMovieScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
});
