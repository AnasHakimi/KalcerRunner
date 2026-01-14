import Link from "next/link"
import { MapPin, Users, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <Users className="h-6 w-6 text-primary" />
                        <span className="hidden font-bold sm:inline-block">
                            Kalcer Runner
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
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
                <div className="flex flex-1 items-center justify-end space-x-2">
                    <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                        Log In
                    </Button>
                    <Button size="sm">Get Started</Button>
                </div>
            </div>
        </header>
    )
}
