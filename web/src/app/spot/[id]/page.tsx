"use client"

import { useParams, useRouter } from "next/navigation"
import { spots, runners } from "@/lib/data"
import { Button } from "@/components/ui/button"
import Map from "@/components/map"
import { ArrowLeft, Clock, Banknote, MapPin, Star, Users } from "lucide-react"
import Link from "next/link"

export default function SpotDetailPage() {
    const params = useParams()
    const router = useRouter()
    // Unwrapping params in Next.js 15+ is async usually in server components, 
    // but in client components useParams() returns the params directly or as a hook. 
    // In Next.js 14/15 app router, useParams returns the object.

    const id = Number(params.id)
    const spot = spots.find(s => s.id === id)

    if (!spot) {
        return (
            <div className="container py-10 text-center">
                <h1 className="text-2xl font-bold">Spot not found</h1>
                <Button variant="link" onClick={() => router.back()}>Go Back</Button>
            </div>
        )
    }

    const mapMarkers = [{
        id: spot.id,
        position: spot.location as [number, number],
        title: spot.name,
        description: spot.type
    }]

    return (
        <div className="container py-6 space-y-6">
            <Button variant="ghost" size="sm" asChild className="pl-0 gap-1 text-muted-foreground hover:text-foreground">
                <Link href="/find-spots"><ArrowLeft className="w-4 h-4" /> Back to Spots</Link>
            </Button>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{spot.name}</h1>
                        <div className="flex items-center gap-2 text-muted-foreground mt-2">
                            <MapPin className="w-4 h-4" /> <span>{spot.type}</span>
                            <span className="text-border">|</span>
                            <div className="flex items-center text-amber-500 font-medium">
                                <Star className="w-4 h-4 fill-current mr-1" /> {spot.rating}
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="bg-card p-4 rounded-xl border shadow-sm">
                            <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                <Clock className="w-4 h-4" /> <span className="text-xs font-medium uppercase">Hours</span>
                            </div>
                            <div className="font-semibold">{spot.hours}</div>
                        </div>
                        <div className="bg-card p-4 rounded-xl border shadow-sm">
                            <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                <Banknote className="w-4 h-4" /> <span className="text-xs font-medium uppercase">Fee</span>
                            </div>
                            <div className="font-semibold">{spot.fee}</div>
                        </div>
                    </div>

                    <div className="prose dark:prose-invert">
                        <h3 className="text-lg font-semibold">About</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {spot.description}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <Users className="w-5 h-5 text-primary" /> Active Runners Here
                        </h3>
                        <div className="flex -space-x-3 overflow-hidden">
                            {runners.slice(0, 3).map((r, i) => (
                                <div key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-background bg-secondary flex items-center justify-center text-xs font-bold" title={r.name}>
                                    {r.avatar}
                                </div>
                            ))}
                            <div className="flex h-10 w-10 items-center justify-center rounded-full ring-2 ring-background bg-muted text-xs font-medium text-muted-foreground">
                                +12
                            </div>
                        </div>
                        <Button className="mt-4 w-full md:w-auto">Check In Here</Button>
                    </div>
                </div>

                <div className="h-[400px] rounded-xl overflow-hidden border">
                    <Map center={spot.location as [number, number]} markers={mapMarkers} zoom={15} />
                </div>
            </div>
        </div>
    )
}
