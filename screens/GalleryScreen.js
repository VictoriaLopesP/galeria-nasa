import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import { fetchImages } from "../api/nasaApi";

const GalleryScreen = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAstro, setSelectedAstro] = useState("earth");
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [timeoutReached, setTimeoutReached] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      try {
        const data = await fetchImages(selectedAstro, page);
        if (data && Array.isArray(data)) {
          setImages((prevImages) => [...prevImages, ...data]);
        } else {
          console.warn("Unexpected data format:", data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadImages();
  }, [selectedAstro, page]);

  const handleRefresh = async () => {
    if (refreshing || timeoutReached) return;

    setRefreshing(true);
    setTimeoutReached(false);
    setPage(1);
    setImages([]);

    const timeout = setTimeout(() => {
      setRefreshing(false);
      setTimeoutReached(true);
    }, 3000);

    await loadImages();
    clearTimeout(timeout);

    if (!timeoutReached) {
      setRefreshing(false);
    }
  };

  const handleEndReached = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#00bfff" />
        <Text style={styles.loadingText}>Carregando imagens...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#001f3f" />
      <View style={styles.header}>
        <Text style={styles.title}>Galeria de Imagens da NASA</Text>
        <Text style={styles.subtitle}>
          Explore as maravilhas do espaço e inspire-se com a beleza do universo!
        </Text>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Escolha um astro:</Text>
        <Picker
          selectedValue={selectedAstro}
          style={styles.picker}
          onValueChange={(itemValue) => {
            setSelectedAstro(itemValue);
            setPage(1);
            setImages([]);
          }}
        >
          <Picker.Item label="Terra" value="earth" />
          <Picker.Item label="Lua" value="moon" />
          <Picker.Item label="Sol" value="sun" />
          <Picker.Item label="Marte" value="mars" />
          <Picker.Item label="Júpiter" value="jupiter" />
        </Picker>
      </View>
      <FlatList
        data={images}
        keyExtractor={(item) => item.data[0].nasa_id}
        renderItem={({ item }) => {
          const imageUrl = item.links?.[0]?.href;
          if (!imageUrl) return null;
          return (
            <View style={styles.item}>
              <Image source={{ uri: imageUrl }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.imageTitle}>
                  {item.data[0]?.title || "Sem título"}
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    navigation.navigate("ImageDetail", {
                      imageData: item,
                    })
                  }
                >
                  <Text style={styles.buttonText}>Ver mais</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListFooterComponent={loading && !refreshing ? <ActivityIndicator size="large" color="#00bfff" /> : null}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: "#ffffff",
  },
  header: {
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#004080",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#b0c4de",
    textAlign: "center",
    marginTop: 8,
  },
  pickerContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  pickerLabel: {
    color: "#ffffff",
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    backgroundColor: "#002851",
    borderRadius: 5,
    color: "#ffffff",
  },
  item: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: "#002851",
    borderRadius: 8,
    marginHorizontal: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  imageTitle: {
    fontSize: 16,
    color: "#ffffff",
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default GalleryScreen;
