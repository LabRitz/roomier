import { create } from 'zustand';

export const homeStore = create((set) => ({
  zipcode: 10016,
  setZipcode: (val) => {
    set({ zipcode: val });
  },
  center: null,
  setCenter: (val) => {
    set({ center: val });
  },
  distance: 1609.344 * 2,
  setDistance: (val) => {
    set({ distance: val });
  },
  priceRange: [3000, 8000],
  setPriceRange: (val) => {
    set({ priceRange: val });
  },
  sqftRange: [200, 1500],
  setSqftRange: (val) => {
    set({ sqftRange: val });
  },
  br: 0,
  setBR: (val) => {
    set({ br: val });
  },
  ba: 1,
  setBA: (val) => {
    set({ ba: val });
  },
  filters: [],
  setFilters: (val) => {
    set({ filters: val });
  },
}));
