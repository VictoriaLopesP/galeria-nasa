import React from "react";
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView } from "react-native";

const ImageDetailScreen = ({ route }) => {
  const { imageData } = route.params;
  const imageUrl = imageData.links?.[0]?.href || "";
  const title = imageData.data[0]?.title || "Sem título";
  const description = imageData.data[0]?.description || "Sem descrição disponível";
  const author = imageData.data[0]?.copyright || "Autor desconhecido";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>Autor: {author}</Text>
        <Text style={styles.description}>{description}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    color: "#ffffff",
    marginTop: 20,
    fontWeight: "bold",
  },
  author: {
    fontSize: 18,
    color: "#b0c4de",
    marginTop: 10,
    fontStyle: "italic",
  },
  description: {
    fontSize: 16,
    color: "#b0c4de",
    marginTop: 15,
    textAlign: "justify",
  },
});

export default ImageDetailScreen;
