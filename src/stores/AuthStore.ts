import { create, StateCreator } from "zustand";
import { devtools } from 'zustand/middleware';

interface Address {
    firstLine: string,
    postCode: string,
    city: string,
};


interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string
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
    login: async (validateEmail: string, password: string) => {

    },
    logout: () => {

    }
})

const useAuthStore = create<AuthState & AuthActions>()(
    devtools(
        authStore
    )
)
export default useAuthStore;
