import { create } from 'zustand';

export const defaultFormState = {
  location: {
    street1: '',
    street2: '',
    city: '',
    state: '',
    zipCode: '',
  },
  price: 0,
  utilities: 0,
  br: 0,
  ba: 0,
  sqft: 0,
  date: Date.now(),
  gender: '',
  description: '',
  filters: [],
  condition: '',
  images: [],
};

export const usePostStore = create((set) => ({
  postFormState: defaultFormState,
  setPostFormState: (form) => {
    set({ postFormState: form });
  },
}));
