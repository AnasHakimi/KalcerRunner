"use client"

import Map from "@/components/map"
import { Button } from "@/components/ui/button"
import { runners } from "@/lib/data"
import { UserPlus, MapPin, Gauge } from "lucide-react"

export default function FindRunnersPage() {
    const mapMarkers = runners.map(r => ({
        id: r.id,
        position: r.location as [number, number],
        title: r.name,
        description: `${r.pace} | ${r.distance}`
    }))

    return (
        <div className="flex h-[calc(100vh-3.5rem)] flex-col lg:flex-row">
            {/* Sidebar / List View */}
            <div className="w-full lg:w-1/3 p-4 overflow-auto border-r bg-muted/10 h-1/2 lg:h-full">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold">Runner Finder</h1>
                    <p className="text-muted-foreground">Find buddies near you.</p>
                </div>
                <div className="space-y-4">
                    {runners.map((runner) => (
                        <div key={runner.id} className="bg-card text-card-foreground p-4 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                        {runner.avatar}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{runner.name}</h3>
                                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                                            <MapPin className="w-3 h-3" /> 0.5km away
                                        </div>
                                    </div>
                                </div>
                                <Button size="sm" variant="outline" className="h-8 w-8 p-0 rounded-full">
                                    <UserPlus className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                                <div className="bg-secondary p-2 rounded-md flex items-center gap-2">
                                    <Gauge className="w-4 h-4 text-primary" />
                                    <span>{runner.pace}</span>
                                </div>
                                <div className="bg-secondary p-2 rounded-md flex items-center gap-2">
                                    <span className="font-medium text-xs uppercase tracking-wide">Target</span>
                                    <span>{runner.distance}</span>
                                </div>
                            </div>
                            <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                                {runner.bio}
                            </p>
                            <Button className="w-full mt-4" size="sm">Connect</Button>
                        </div>
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
