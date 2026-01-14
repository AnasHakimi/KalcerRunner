"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, MapPin, Trophy } from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 xl:py-48 bg-background relative overflow-hidden">
        {/* Background gradient decoration */}
        <div className="absolute top-0 right-0 -z-10 h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-primary/10 blur-3xl opacity-50 md:opacity-100" />
        <div className="absolute bottom-0 left-0 -z-10 h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-blue-500/10 blur-3xl opacity-50 md:opacity-100" />

        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                Run Faster, <span className="text-primary">Together.</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl">
                Find running partners nearby, discover new tracks, and level up your cardio game.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link href="/find-runners" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto rounded-full px-8 h-12 text-base">Find Runners</Button>
              </Link>
              <Link href="/find-spots" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-8 h-12 text-base">Discover Spots</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 md:py-24 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 sm:px-10 md:gap-16 md:grid-cols-3 text-center">
            <div className="flex flex-col items-center space-y-4 p-4 rounded-2xl md:hover:bg-background/50 transition-colors">
              <div className="bg-primary/10 p-4 rounded-full">
                <Users className="h-8 w-8 md:h-10 md:w-10 text-primary" />
              </div>
              <h2 className="text-xl font-bold">Find Friends</h2>
              <p className="text-muted-foreground">
                Connect with runners in your area who match your pace and schedule.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-4 rounded-2xl md:hover:bg-background/50 transition-colors">
              <div className="bg-primary/10 p-4 rounded-full">
                <MapPin className="h-8 w-8 md:h-10 md:w-10 text-primary" />
              </div>
              <h2 className="text-xl font-bold">Discover Tracks</h2>
              <p className="text-muted-foreground">
                Find the best parks and tracks with details on fees, parking, and opening hours.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-4 rounded-2xl md:hover:bg-background/50 transition-colors">
              <div className="bg-primary/10 p-4 rounded-full">
                <Trophy className="h-8 w-8 md:h-10 md:w-10 text-primary" />
              </div>
              <h2 className="text-xl font-bold">Track Progress</h2>
              <p className="text-muted-foreground">
                Join events and challenge yourself with the community.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
