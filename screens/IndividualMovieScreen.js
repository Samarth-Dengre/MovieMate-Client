import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";
import { auth, moviesRoute } from "../utils/routes";
import Toast from "react-native-simple-toast";
import ErrorPage from "../components/ErrorPage";
import DetailedMoviePage from "../components/DetailedMoviePage/DetailedMoviePage";
import IconButton from "../components/Buttons/IconButton";
import GifLoader from "../components/Loaders/GifLoader";
import Loader from "../components/Loaders/Loader";
import { AuthContext } from "../store/authContext";
function IndividualMovieScreen({ route, navigation }) {
  const authCtx = useContext(AuthContext);
  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(true);
  const [addingToFavorites, setAddingToFavorites] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  async function addToFavoritesHandler() {
    // Add movie to favorites
    try {
      setAddingToFavorites(true);
      const { data } = await axios.patch(auth, {
        movieId: route.params.id,
        user: authCtx.user,
      });
      setAddingToFavorites(false);
      if (data.status === 200) {
        Toast.showWithGravity(data.message, Toast.SHORT, Toast.TOP);
        authCtx.authenticate(data.user);
        if (data.user.favorites.includes(route.params.id)) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      } else if (data.status === 400) {
        Toast.showWithGravity(data.message, Toast.SHORT, Toast.TOP);
      }
    } catch (error) {
      setAddingToFavorites(false);
      return <ErrorPage />;
    }
  }

  useEffect(() => {
    setIsFavorite(authCtx.user.favorites.includes(route.params.id));

    navigation.setOptions({
      title: route.params.title,
      headerRight: () => (
        <View style={{ marginRight: 10 }}>
          <IconButton
            name={isFavorite ? "heart" : "heart-outline"}
            size={30}
            color="white"
            onPress={addToFavoritesHandler}
          />
        </View>
      ),
    });

    // Fetch movie from the server
    async function fetchMovie() {
      try {
        const { data } = await axios.get(`${moviesRoute}/${route.params.id}`);
        setLoading(false);
        if (data.status === 200) {
          setMovie(data.movie);
        } else if (data.status === 400) {
          Toast.showWithGravity(data.message, Toast.SHORT, Toast.TOP);
          return <ErrorPage />;
        }
      } catch (error) {
        setLoading(false);
        Toast.showWithGravity(error.message, Toast.SHORT, Toast.TOP);
        return <ErrorPage />;
      }
    }
    fetchMovie();

    return () => {
      setMovie(null);
      setAddingToFavorites(false);
      setLoading(true);
    };
  }, [route.params, navigation, authCtx.user, isFavorite]);

  return (
    <View style={styles.container}>
      {addingToFavorites && <Loader />}
      {loading ? (
        <GifLoader />
      ) : movie ? (
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
