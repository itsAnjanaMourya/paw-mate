import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { petSchema } from "../validation/petSchema";
import { submitPet } from "../services/api";
import usePetsStore from "../store/petsStore";
import { colors } from "../theme/colors";

const PLACEHOLDER_IMAGE =
  "https://images.dog.ceo/breeds/mix/n02107574_1024.jpg";

export default function AddPetScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const addPet = usePetsStore((state) => state.addPet);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(petSchema),
    defaultValues: {
      petName: "",
      breed: "",
      age: "",
      price: "",
    },
  });

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission Required", "Please allow access to your photo library.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setError(null);
    }
  };

  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission Required", "Please allow camera access.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setError(null);
    }
  };

  const clearImage = () => {
    setImage(null);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const payload = {
        petName: data.petName,
        breed: data.breed,
        age: Number(data.age),
        price: Number(data.price),
        image: image || PLACEHOLDER_IMAGE,
      };

      await submitPet(payload);

      const newPet = {
        petName: data.petName,
        breed: data.breed,
        age: String(data.age),
        price: String(data.price),
        image: image || PLACEHOLDER_IMAGE,
      };

      addPet(newPet);

      reset();
      setImage(null);

      Alert.alert(
        "Success",
        "Pet added successfully!",
        [{ text: "OK", onPress: () => navigation.navigate("HomeScreen") }]
      );
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.message ||
        "Failed to submit. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Add New Pet 🐕</Text>
          <Text style={styles.subtitle}>
            Upload a photo and fill in the details
          </Text>

          <View style={styles.imageSection}>
            <View style={styles.imagePreview}>
              {image ? (
                <>
                  <Image source={{ uri: image }} style={styles.image} />
                  <TouchableOpacity
                    style={styles.clearImageBtn}
                    onPress={clearImage}
                  >
                    <Text style={styles.clearImageText}>✕ Remove</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.placeholderText}>No image selected</Text>
                  <Text style={styles.placeholderHint}>
                    Add from camera or gallery
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.imageButtons}>
              <TouchableOpacity style={styles.imageBtn} onPress={pickImage}>
                <Text style={styles.imageBtnText}>📷 Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.imageBtn} onPress={openCamera}>
                <Text style={styles.imageBtnText}>📸 Camera</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.form}>
            <Controller
              control={control}
              name="petName"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Pet Name *</Text>
                  <TextInput
                    placeholder="e.g. Buddy, Luna"
                    placeholderTextColor={colors.textSecondary}
                    style={[styles.input, errors.petName && styles.inputError]}
                    value={value}
                    onChangeText={onChange}
                    autoCapitalize="words"
                  />
                  {errors.petName && (
                    <Text style={styles.errorText}>{errors.petName.message}</Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="breed"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Breed *</Text>
                  <TextInput
                    placeholder="e.g. Golden Retriever"
                    placeholderTextColor={colors.textSecondary}
                    style={[styles.input, errors.breed && styles.inputError]}
                    value={value}
                    onChangeText={onChange}
                    autoCapitalize="words"
                  />
                  {errors.breed && (
                    <Text style={styles.errorText}>{errors.breed.message}</Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="age"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Age (years) *</Text>
                  <TextInput
                    placeholder="e.g. 2"
                    placeholderTextColor={colors.textSecondary}
                    style={[styles.input, errors.age && styles.inputError]}
                    keyboardType="numeric"
                    value={value}
                    onChangeText={onChange}
                  />
                  {errors.age && (
                    <Text style={styles.errorText}>{errors.age.message}</Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="price"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Price (₹) *</Text>
                  <TextInput
                    placeholder="e.g. 350"
                    placeholderTextColor={colors.textSecondary}
                    style={[styles.input, errors.price && styles.inputError]}
                    keyboardType="numeric"
                    value={value}
                    onChangeText={onChange}
                  />
                  {errors.price && (
                    <Text style={styles.errorText}>{errors.price.message}</Text>
                  )}
                </View>
              )}
            />

            {error && (
              <View style={styles.apiError}>
                <Text style={styles.apiErrorText}>{error}</Text>
              </View>
            )}

            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primaryDark} />
                <Text style={styles.loadingText}>Submitting...</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={handleSubmit(onSubmit)}
                activeOpacity={0.8}
              >
                <Text style={styles.submitBtnText}>Submit Pet</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.brown,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  imageSection: {
    marginBottom: 24,
  },
  imagePreview: {
    alignItems: "center",
    marginBottom: 12,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 16,
  },
  imagePlaceholder: {
    width: 180,
    height: 180,
    borderRadius: 16,
    backgroundColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  placeholderHint: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  clearImageBtn: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  clearImageText: {
    color: colors.error,
    fontSize: 14,
  },
  imageButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  imageBtn: {
    backgroundColor: colors.surface,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageBtnText: {
    fontSize: 15,
    color: colors.text,
    fontWeight: "500",
  },
  form: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.background,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
  },
  apiError: {
    backgroundColor: "#F8D7DA",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  apiErrorText: {
    color: colors.error,
    fontSize: 14,
  },
  loadingContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 8,
    color: colors.textSecondary,
    fontSize: 14,
  },
  submitBtn: {
    backgroundColor: colors.primaryDark,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  submitBtnText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});
