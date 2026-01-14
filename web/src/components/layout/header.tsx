"use client"

import Link from "next/link"
import { MapPin, Users, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

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

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                        Log In
                    </Button>
                    <Button size="sm">Get Started</Button>
                </div>

                {/* Mobile Menu Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-b bg-background overflow-hidden"
                    >
                        <div className="container py-4 flex flex-col space-y-4">
                            <nav className="flex flex-col space-y-4">
                                <Link
                                    href="/find-runners"
                                    className="text-sm font-medium transition-colors hover:text-primary"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Find Runners
                                </Link>
                                <Link
                                    href="/find-spots"
                                    className="text-sm font-medium transition-colors hover:text-primary"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Find Spots
                                </Link>
                            </nav>
                            <div className="flex flex-col space-y-2 pt-4 border-t">
                                <Button variant="ghost" size="sm" className="justify-start px-0">
                                    Log In
                                </Button>
                                <Button size="sm">Get Started</Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
