"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface User {
    id: string
    name: string
    email: string
    avatar: string
    isPro?: boolean
}

interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    login: () => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate checking local storage or session on mount
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 500)
        return () => clearTimeout(timer)
    }, [])

    const login = () => {
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            setUser({
                id: "mock-user-1",
                name: "Anas Hakimi",
                email: "runner@kalcer.com",
                avatar: "AH",
                isPro: true
            })
            setIsLoading(false)
        }, 800)
    }

    const logout = () => {
        setIsLoading(true)
        setTimeout(() => {
            setUser(null)
            setIsLoading(false)
        }, 500)
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            isLoading,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
