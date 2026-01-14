"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react" // NEW
import { spots, runners } from "@/lib/data"
import { Button } from "@/components/ui/button"
import Map from "@/components/map"
import { ArrowLeft, Clock, Banknote, MapPin, Star, Users, MessageSquarePlus, Calendar as CalendarIcon, Plus } from "lucide-react" // Added Icons
import Link from "next/link"
import { useAuth } from "@/context/auth-context" // NEW
import { toast } from "sonner" // NEW
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog" // NEW
import { Textarea } from "@/components/ui/textarea" // NEW
import { Label } from "@/components/ui/label" // NEW
import { Calendar } from "@/components/ui/calendar" // NEW
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover" // NEW
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" // NEW
import { format } from "date-fns" // NEW
import { Input } from "@/components/ui/input" // NEW
import { cn } from "@/lib/utils" // NEW


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

                    {/* Actions & Reviews */}
                    <div className="space-y-6">
                        <div className="flex gap-3">
                            <Button className="flex-1" size="lg">
                                <MapPin className="mr-2 h-4 w-4" /> Get Directions
                            </Button>
                            <Button variant="outline" size="lg">
                                Share
                            </Button>
                        </div>

                        {/* Reviews Section */}
                        <div className="pt-6 border-t">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Reviews (24)</h3>
                                <ReviewDialog spotName={spot.name} />
                            </div>

                            <div className="space-y-4">
                                <div className="bg-muted/10 p-4 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold text-sm">Alex M.</span>
                                        <div className="flex text-amber-500 text-xs"><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /></div>
                                    </div>
                                    <p className="text-sm text-muted-foreground">Great track for evening runs. Well lit and safe.</p>
                                </div>
                                <div className="bg-muted/10 p-4 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold text-sm">Sarah J.</span>
                                        <div className="flex text-amber-500 text-xs"><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /></div>
                                    </div>
                                    <p className="text-sm text-muted-foreground">Nice scenery but can get crowded on weekends.</p>
                                </div>
                            </div>
                        </div>

                        {/* Run Sessions Section */}
                        <div className="pt-6 border-t font-sans">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold flex items-center gap-2">
                                        <Users className="w-5 h-5 text-primary" />
                                        Run Sessions
                                    </h3>
                                    <p className="text-sm text-muted-foreground">Join others or start a run here.</p>
                                </div>
                                <CreateSessionDialog spotName={spot.name} />
                            </div>

                            {/* Mock Active Sessions */}
                            <div className="space-y-3">
                                <div className="border rounded-xl p-4 bg-card shadow-sm">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="font-semibold">Morning 5K Pace</h4>
                                            <p className="text-xs text-muted-foreground">Hosted by Sarah J.</p>
                                        </div>
                                        <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">Tomorrow, 7:00 AM</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Users className="w-3 h-3" /> 3 runners
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-3 h-3" /> All Levels
                                        </div>
                                    </div>
                                    <Button size="sm" variant="outline" className="w-full mt-3 h-8">Join Session</Button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="h-[300px] md:h-[400px] rounded-xl overflow-hidden border">
                    <Map center={spot.location as [number, number]} markers={mapMarkers} zoom={15} />
                </div>
            </div>
        </div>
    )
}

function ReviewDialog({ spotName }: { spotName: string }) {
    const { isAuthenticated, login } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState("")

    const handleSubmit = () => {
        toast.success("Review submitted! Thank you.")
        setIsOpen(false)
        setComment("")
        setRating(5)
    }

    if (!isAuthenticated) {
        return (
            <Button variant="link" className="text-primary h-auto p-0" onClick={() => {
                toast.error("Please log in to write a review")
                login() // Optional: auto trigger login or just let toast prompt
            }}>
                Write a Review
            </Button>
        )
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="link" className="text-primary h-auto p-0">Write a Review</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Review {spotName}</DialogTitle>
                    <DialogDescription>
                        Share your experience with other runners.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label>Rating</Label>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className="focus:outline-none"
                                >
                                    <Star
                                        className={`w-6 h-6 ${star <= rating ? "fill-amber-500 text-amber-500" : "text-muted-foreground"}`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="comment">Comment</Label>
                        <Textarea
                            id="comment"
                            placeholder="Tell us about the track conditions, lighting, crowd..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit Review</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function CreateSessionDialog({ spotName }: { spotName: string }) {
    const { isAuthenticated, login } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const [date, setDate] = useState<Date>()
    const [time, setTime] = useState("07:00")
    const [level, setLevel] = useState("all")

    const handleSubmit = () => {
        if (!date || !time) {
            toast.error("Please select date and time")
            return
        }
        toast.success("Session created! Runners can now join.")
        setIsOpen(false)
        setDate(undefined)
        setTime("07:00")
    }

    if (!isAuthenticated) {
        return (
            <Button size="sm" onClick={() => {
                toast.error("Please log in to create a session")
                login()
            }}>
                <Plus className="w-4 h-4 mr-2" /> Create Session
            </Button>
        )
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" /> Create Session
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Run Session</DialogTitle>
                    <DialogDescription>
                        Plan a run at {spotName}. Friends and nearby runners will be notified.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label>Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="time">Time</Label>
                        <Input
                            id="time"
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Level</Label>
                        <Select value={level} onValueChange={setLevel}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Levels</SelectItem>
                                <SelectItem value="beginner">Beginner</SelectItem>
                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                <SelectItem value="pro">Pro / Pace</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="desc">Description (Optional)</Label>
                        <Textarea id="desc" placeholder="E.g., Easy 5k pace, coffee afterwards..." />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit}>Create Session</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
