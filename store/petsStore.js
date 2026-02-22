import { create } from "zustand";

const usePetsStore = create((set) => ({
  pets: [
    {
      id: "1",
      petName: "Buddy",
      breed: "Yorkshire Terrier",
      age: "2",
      price: "500",
      image:
        "https://images.dog.ceo/breeds/terrier-yorkshire/n02094433_7702.jpg",
    },
  ],

  addPet: (pet) =>
    set((state) => ({
      pets: [
        ...state.pets,
        {
          ...pet,
          id: Date.now().toString(),
        },
      ],
    })),

  removePet: (id) =>
    set((state) => ({
      pets: state.pets.filter((pet) => pet.id !== id),
    })),
}));

export default usePetsStore;
