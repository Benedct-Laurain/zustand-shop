import { create, StateCreator } from "zustand"
import { createJSONStorage, devtools, persist } from "zustand/middleware"
import authLogger from "./authLogger"
import customSessionStorage from "./storageAuth"
import AuthService from "../services/AuthService"
import useShopStore from "./ShopStore"
import useProductStore from "./ProductStore"

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
        try {
            const { success, token, user } = await AuthService.loginFromApi(email, password);

            if (success) {
                set({ isAuthenticated: true, token, user }, false, "authStore/login")

                useShopStore.getState().setMessage({
                    messageText: `Bienvenue ${user.firstname}`,
                    type: "info"
                })
            }
        } catch(error : any){
        console.log(error)
        useShopStore.getState().setMessage({
            messageText: error.message,
            type: "error"
        })
        }
    },
    logout: () => {
        set({ isAuthenticated: false, token: undefined, user: undefined }, false, "authStore/logout")
        useShopStore.getState().setMessage({
            messageText: "Bye bye",
            type: "info"
        })
        useProductStore.getState().resetCart()
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