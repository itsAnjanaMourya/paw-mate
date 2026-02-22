import axios from "axios";
import Constants from "expo-constants";

const API_KEY = Constants.expoConfig.extra.reqresApiKey;
export const submitPet = async (data) => {
  const payload = {
    petName: data.petName,
    breed: data.breed,
    age: data.age,
    price: data.price,
    image: data.image,
  };

  const response = await axios.post(
    "https://reqres.in/api/users",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
    }
  );

  return response;
};
export const fetchRandomDog = async () => {
  return axios.get("https://dog.ceo/api/breeds/image/random");
};