import { create } from "zustand";

type ProfilePicState = {
  profilePic: string;
  setProfilePic: (profilePic: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

export const useProfilePicStore = create<ProfilePicState>((set) => ({
  profilePic: "",
  setProfilePic: (profilePic) => set({ profilePic }),
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
