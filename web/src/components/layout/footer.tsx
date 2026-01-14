import { Users, Github, Twitter, Mail, Heart } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Footer() {
    return (
        <footer className="border-t bg-background/50 backdrop-blur-xl">
            <div className="container py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <Users className="h-6 w-6 text-primary" />
                            <span className="font-bold text-lg">Kalcer Runner</span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                            A community-driven platform to help you find running partners and discover the best tracks in your city.
                        </p>
                        <div className="flex items-center gap-2 pt-2">
                            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                                <Github className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                                <Twitter className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                                <Mail className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-sm">Discover</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/find-runners" className="hover:text-primary transition-colors">Find Runners</Link>
                            </li>
                            <li>
                                <Link href="/find-spots" className="hover:text-primary transition-colors">Find Spots</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">About Us</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Community */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-sm">Community</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">Guidelines</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">Safety Tips</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">Add a Spot</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-sm">Legal</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Kalcer Runner.</p>
                    <div className="flex items-center gap-1">
                        <span> Built for runners, by runners.</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
