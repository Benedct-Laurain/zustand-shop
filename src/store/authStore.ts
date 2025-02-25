import { create, StateCreator } from "zustand"
import { devtools } from "zustand/middleware"


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
    devtools(authStore)
);

export default useAuthStore;