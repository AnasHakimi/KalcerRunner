"use client"

import Map from "@/components/map"
import { Button } from "@/components/ui/button"
import { spots } from "@/lib/data"
import { MapPin, Clock, Banknote, Star, List, Map as MapIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function FindSpotsPage() {
    const [activeTab, setActiveTab] = useState<"list" | "map">("list")

    const mapMarkers = spots.map(s => ({
        id: s.id,
        position: s.location as [number, number],
        title: s.name,
        description: `${s.type} | ${s.fee}`
    }))

    return (
        <div className="flex h-[calc(100vh-3.5rem)] flex-col lg:flex-row relative">
            {/* Mobile Tab Switcher */}
            <div className="lg:hidden absolute bottom-6 left-1/2 -translate-x-1/2 z-30 bg-background/80 backdrop-blur rounded-full shadow-lg border p-1 flex">
                <Button
                    variant={activeTab === "list" ? "default" : "ghost"}
                    size="sm"
                    className="rounded-full px-6"
                    onClick={() => setActiveTab("list")}
                >
                    <List className="w-4 h-4 mr-2" /> List
                </Button>
                <Button
                    variant={activeTab === "map" ? "default" : "ghost"}
                    size="sm"
                    className="rounded-full px-6"
                    onClick={() => setActiveTab("map")}
                >
                    <MapIcon className="w-4 h-4 mr-2" /> Map
                </Button>
            </div>

            {/* Sidebar / List View */}
            <div className={cn(
                "w-full lg:w-1/3 p-4 overflow-auto border-r bg-muted/10 h-full transition-opacity absolute lg:relative",
                activeTab === "list" ? "z-10 opacity-100" : "z-0 opacity-0 lg:opacity-100 lg:z-auto"
            )}>
                <div className="mb-4">
                    <h1 className="text-2xl font-bold">Running Spots</h1>
                    <p className="text-muted-foreground">Discover tracks & parks.</p>
                </div>
                <div className="space-y-4 pb-16 lg:pb-0">
                    {spots.map((spot) => (
                        <Link href={`/spot/${spot.id}`} key={spot.id} className="block group">
                            <div className="bg-card text-card-foreground p-4 rounded-xl border shadow-sm group-hover:border-primary/50 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold group-hover:text-primary transition-colors">{spot.name}</h3>
                                        <p className="text-xs text-muted-foreground">{spot.type}</p>
                                    </div>
                                    <div className="flex items-center text-amber-500 text-xs font-bold gap-1">
                                        <Star className="w-3 h-3 fill-current" /> {spot.rating}
                                    </div>
                                </div>

                                <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" /> {spot.hours}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Banknote className="w-4 h-4" /> {spot.fee}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Map View */}
            <div className={cn(
                "w-full lg:w-2/3 h-full absolute lg:relative z-0",
                activeTab === "map" ? "opacity-100 z-20" : "opacity-0 lg:opacity-100 lg:z-auto pointer-events-none lg:pointer-events-auto"
            )}>
                <Map markers={mapMarkers} className="h-full w-full" zoom={12} />
            </div>
        </div>
    )
}
