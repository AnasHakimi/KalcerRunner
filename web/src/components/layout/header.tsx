"use client"

import Link from "next/link"
import { Users, Menu, X, LogOut, User, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/context/auth-context"
import { NotificationsPopover } from "@/components/notifications-popover" // Added Import

export function Header() {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const { user, isAuthenticated, login, logout, isLoading } = useAuth()

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <Users className="h-6 w-6 text-primary" />
                        <span className="font-bold inline-block">
                            Kalcer Runner
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                        <Link
                            href="/find-runners"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Find Runners
                        </Link>
                        <Link
                            href="/find-spots"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Find Spots
                        </Link>
                    </nav>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                    {isAuthenticated && user ? (
                        <div className="flex items-center gap-2">
                            <NotificationsPopover /> {/* Added Notifications */}
                            <div className="relative">
                                <Button
                                    variant="ghost"
                                    className="flex items-center gap-2 pl-2 pr-4"
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                >
                                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                        {user.avatar}
                                    </div>
                                    <span className="text-sm font-medium hidden md:inline">{user.name}</span>
                                </Button>

                                {/* User Dropdown */}
                                <AnimatePresence>
                                    {isUserMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute right-0 mt-2 w-48 bg-card border rounded-lg shadow-lg py-1 z-50"
                                        >
                                            <div className="px-4 py-2 border-b">
                                                <p className="text-xs text-muted-foreground">Signed in as</p>
                                                <p className="text-sm font-medium truncate">{user.email}</p>
                                            </div>
                                            <button className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2">
                                                <User className="w-4 h-4" /> Profile
                                            </button>
                                            <Link href="/friends">
                                                <button className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2">
                                                    <Users className="w-4 h-4" /> Friends
                                                </button>
                                            </Link>
                                            <button className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2">
                                                <Settings className="w-4 h-4" /> Settings
                                            </button>
                                            <div className="border-t my-1"></div>
                                            <button
                                                onClick={() => {
                                                    logout()
                                                    setIsUserMenuOpen(false)
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm hover:bg-destructive/10 text-destructive flex items-center gap-2"
                                            >
                                                <LogOut className="w-4 h-4" /> Log Out
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    ) : (
                        <div className="hidden md:flex items-center space-x-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => login()}
                                disabled={isLoading}
                            >
                                {isLoading ? "..." : "Log In"}
                            </Button>
                            <Button
                                size="sm"
                                onClick={() => login()}
                                disabled={isLoading}
                            >
                                Get Started
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
