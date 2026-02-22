import * as yup from "yup";

export const petSchema = yup.object().shape({
  petName: yup
    .string()
    .trim()
    .required("Pet name is required")
    .min(2, "Name must be at least 2 characters"),
  breed: yup
    .string()
    .trim()
    .required("Breed is required")
    .min(2, "Breed must be at least 2 characters"),
  age: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : Number(originalValue)
    )
    .typeError("Age must be a number")
    .required("Age is required")
    .positive("Age must be positive")
    .integer("Age must be a whole number"),
  price: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : Number(originalValue)
    )
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be positive"),
});