import create from 'zustand';

export const appStore = create((set) => ({
  // DUMMY VALUES
  // TODO: set up userinfo in app store
  setting: true,
  setSetting: (val) => {
    set({ setting: val });
  },
}));
