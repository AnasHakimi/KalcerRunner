"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, MapPin, Trophy } from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background relative overflow-hidden">
        {/* Background gradient decoration */}
        <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />

        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-2"
            >
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Run Faster, <span className="text-primary">Together.</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Find running partners nearby, discover new tracks, and level up your cardio game.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="space-x-4"
            >
              <Link href="/find-runners">
                <Button size="lg" className="rounded-full px-8">Find Runners</Button>
              </Link>
              <Link href="/find-spots">
                <Button variant="outline" size="lg" className="rounded-full px-8">Discover Spots</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-3 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-xl font-bold">Find Friends</h2>
              <p className="text-muted-foreground">
                Connect with runners in your area who match your pace and schedule.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <MapPin className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-xl font-bold">Discover Tracks</h2>
              <p className="text-muted-foreground">
                Find the best parks and tracks with details on fees, parking, and opening hours.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <Trophy className="h-10 w-10 text-primary" />
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
