const BASE_URL = "https://images-api.nasa.gov";

export const fetchImages = async (query = "earth", page = 1) => {
    try {
        const url = `${BASE_URL}/search?q=${query}&page=${page}`;
        console.log("Requesting URL:", url);

        const response = await fetch(url);

        if (!response.ok) {
            console.error("Failed to fetch data. Status:", response.status);
            throw new Error("Failed to fetch images");
        }

        const data = await response.json();
        console.log("API Response:", data);

        return data.collection?.items || []; 
    } catch (error) {
        console.error("Error fetching images:", error.message);
        throw error;
    }
};
