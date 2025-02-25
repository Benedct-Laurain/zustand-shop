import { create, StateCreator } from "zustand"
import { createJSONStorage, devtools, persist } from "zustand/middleware"
import authLogger from "./authLogger"
import customSessionStorage from "./storageAuth"


interface Address {
    firstline: string,
    postcode: string,
    city: string
}

interface User {
    id: number, 
    firstname: string,
    lastname: string, 
    email: string,
    address?: Address
}

interface AuthState {
    isAuthenticated: boolean,
    token?: string,
    user?: User
}

interface AuthActions {
    login: (email: string, password: string) => Promise<void>,
    logout: () => void
}

const authStore: StateCreator<AuthState & AuthActions, [["zustand/devtools", never]]> = (set, get) => ({
    isAuthenticated: false,
    token: undefined,
    user: undefined,
    login: async (email: string, password: string) => {

    },
    logout: () => {

    }
})

const useAuthStore = create<AuthState & AuthActions>()(
    persist(
        authLogger(
            devtools(authStore)
        ),
        {
            name: 'auth-storage', // unique name
            storage: createJSONStorage(() => customSessionStorage),
            // onRehydrateStorage: (state) => {
            //   console.log('hydration starts')
            //   return (state, error) => {
            //     if (error) {
            //       console.log('hydration error:', error)
            //     } else {
            //       console.log('hydration finished')
            //     }
            //   }
            // }
          },
    )
);

export default useAuthStore;