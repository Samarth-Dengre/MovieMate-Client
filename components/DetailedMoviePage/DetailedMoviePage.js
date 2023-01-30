import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import WebView from "react-native-webview";
function DetailedMoviePage({ movie }) {
  const navigation = useNavigation();

  // Destructure the movie object
  const {
    id,
    movieName,
    description,
    genre,
    year,
    imdb,
    length,
    cast,
    language,
    link,
  } = movie;

  function handleGenrePress(genre) {
    // Redirect to the genre page
    navigation.navigate("Genre", { genre });
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 250,
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* This webview shows the video */}
        <WebView
          style={{ width: "100%", height: 500, backgroundColor: "black" }}
          source={{
            html: `<iframe width="100%" height="100%" src=${link} title=${movieName}></iframe>`,
          }}
        />
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.genreContainer}>
          {genre.map((genre, index) => {
            return (
              <Pressable
                key={index}
                style={({ pressed }) => [
                  styles.genre,
                  pressed && styles.pressed,
                ]}
                onPress={handleGenrePress.bind(this, genre)}
              >
                <Text style={styles.genreText}>{genre}</Text>
              </Pressable>
            );
          })}
        </View>
        <View style={styles.generalContainer}>
          <Text style={styles.greyColor}>Year: {year}</Text>
          <Text style={styles.greyColor}>IMDB: {imdb}</Text>
          <Text style={styles.greyColor}>Duration: {length}m</Text>
        </View>
      </View>
      <Text style={[styles.text, styles.description]}>{description}</Text>
      <View style={[styles.detailsContainer, styles.bottomContainer]}>
        <Text
          style={[
            styles.greyColor,
            { width: "60%", fontFamily: "Lora-Regular" },
          ]}
        >
          Cast: {cast}
        </Text>
        <Text style={styles.greyColor}>Language: {language}</Text>
      </View>
    </View>
  );
}

export default DetailedMoviePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: "white",
  },
  description: {
    color: "white",
    fontFamily: "Lora-Regular",
    fontSize: 15,
    margin: 10,
  },
  detailsContainer: {
    padding: 10,
    overflow: "hidden",
    borderRadius: 15,
    backgroundColor: "black",
    borderRadius: 15,
    marginVertical: 10,
    elevation: 4,
    margin: 5,
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "space-evenly",
    elevation: 5,
  },
  genreText: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "RobotoSlab-Regular",
  },
  genre: {
    backgroundColor: "beige",
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 10,
    minWidth: 100,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  pressed: {
    opacity: 0.7,
  },
  generalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  greyColor: {
    color: "#b3b3b3",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    flexWrap: "wrap",
  },
});
