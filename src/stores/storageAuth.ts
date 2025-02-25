import { StateStorage } from "zustand/middleware"

const customSessionStorage: StateStorage = {
    getItem: (key): string => {
        // console.log("Hydratation depuis le localStorage");
        return localStorage.getItem(key) || '';
    },
    setItem: (key, newValue): void => {
        // console.log("Enregistrement dans le localStorage");
       localStorage.setItem(key, newValue);
    },
    removeItem: (key): void => {
    //   console.log("Suppression dans le localStorage");
      localStorage.removeItem(key);
    },
}

export default customSessionStorage;