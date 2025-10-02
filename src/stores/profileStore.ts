import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import fromZustand  from "zustand-vue";


type ProfileState = {
  access_token: string | null;
  user: null;
  permission: null;
  setAccessToken: (token: string | null) => void;
  setUser: (user: null) => void;
  setPermission: (permissions: null) => void;
  logout: () => void;
  clear: () => void;
};

const zustandProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      access_token: null,
      user: null,
      permission: null,
      setAccessToken: (token) => set({ access_token: token }),
      setUser: (user) => set({ user }),
      setPermission: (permissions) => set({ permission: permissions }),
      logout: () => set({ access_token: null, user: null, permission: null }),
      clear: () => set({ access_token: null, user: null, permission: null }),
    }),
    {
      name: "profile",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);


// This is how you make it usable in Vue:
export const useProfileStore = fromZustand(zustandProfileStore);
