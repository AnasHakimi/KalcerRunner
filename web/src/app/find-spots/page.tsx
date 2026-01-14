"use client"

import Map from "@/components/map"
import { Button } from "@/components/ui/button"
import { spots } from "@/lib/data"
import { MapPin, Clock, Banknote, Star } from "lucide-react"
import Link from "next/link"

export default function FindSpotsPage() {
    const mapMarkers = spots.map(s => ({
        id: s.id,
        position: s.location as [number, number],
        title: s.name,
        description: `${s.type} | ${s.fee}`
    }))

    return (
        <div className="flex h-[calc(100vh-3.5rem)] flex-col lg:flex-row">
            {/* Sidebar / List View */}
            <div className="w-full lg:w-1/3 p-4 overflow-auto border-r bg-muted/10 h-1/2 lg:h-full">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold">Running Spots</h1>
                    <p className="text-muted-foreground">Discover tracks & parks.</p>
                </div>
                <div className="space-y-4">
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
            <div className="w-full lg:w-2/3 h-1/2 lg:h-full relative z-0">
                <Map markers={mapMarkers} className="h-full w-full" zoom={12} />
            </div>
        </div>
    )
}
