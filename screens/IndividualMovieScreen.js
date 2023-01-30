import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";
import { moviesRoute } from "../utils/routes";
import Toast from "react-native-simple-toast";
import ErrorPage from "../components/ErrorPage";
import DetailedMoviePage from "../components/DetailedMoviePage/DetailedMoviePage";
import IconButton from "../components/Buttons/IconButton";
function IndividualMovieScreen({ route, navigation }) {
  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(true);
  function addToFavoritesHandler() {
    // Add movie to favorites
    console.log("Add to favorites");
  }

  useEffect(() => {
    navigation.setOptions({
      title: route.params.title,
      headerRight: () => (
        <View style={{ marginRight: 10 }}>
          <IconButton
            name="heart"
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
    };
  }, [route.params]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : movie ? (
        <DetailedMoviePage movie={movie} />
      ) : (
        <Text>No movie found</Text>
      )}
    </View>
  );
}

export default IndividualMovieScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
