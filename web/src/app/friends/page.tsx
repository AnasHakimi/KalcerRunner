"use client"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, X, MessageCircle, UserMinus, MapPin } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

// Mock Data
const MOCK_FRIENDS = [
    { id: "1", name: "Sarah Johnson", level: "Pro", avatar: "SJ", location: "Central Park" },
    { id: "2", name: "Mike Chen", level: "Beginner", avatar: "MC", location: "Bay Area" },
    { id: "3", name: "Emma Wilson", level: "Intermediate", avatar: "EW", location: "Downtown" },
]

const MOCK_REQUESTS = [
    { id: "4", name: "David Kim", level: "Pro", avatar: "DK", location: "Uptown", distance: "2km away" },
    { id: "5", name: "Lisa Park", level: "Beginner", avatar: "LP", location: "Westside", distance: "5km away" },
]

export default function FriendsPage() {
    const { isAuthenticated, isLoading } = useAuth()
    const router = useRouter()
    const [friends, setFriends] = useState(MOCK_FRIENDS)
    const [requests, setRequests] = useState(MOCK_REQUESTS)

    if (!isLoading && !isAuthenticated) {
        router.push("/")
        return null
    }

    const handleAccept = (id: string, name: string) => {
        const request = requests.find(r => r.id === id)
        if (request) {
            setFriends(prev => [...prev, request])
            setRequests(prev => prev.filter(r => r.id !== id))
            toast.success(`You are now friends with ${name}!`)
        }
    }

    const handleReject = (id: string) => {
        setRequests(prev => prev.filter(r => r.id !== id))
        toast.info("Friend request removed")
    }

    const handleRemoveFriend = (id: string, name: string) => {
        setFriends(prev => prev.filter(f => f.id !== id))
        toast.success(`${name} removed from friends`)
    }

    return (
        <div className="container max-w-4xl py-10 space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Friends & Connections</h1>
                <p className="text-muted-foreground mt-2">Manage your running squad and pending requests.</p>
            </div>

            <Tabs defaultValue="friends" className="w-full">
                <TabsList className="grid w-full md:w-[400px] grid-cols-2">
                    <TabsTrigger value="friends">My Friends ({friends.length})</TabsTrigger>
                    <TabsTrigger value="requests">Requests ({requests.length})</TabsTrigger>
                </TabsList>

                {/* Friends List Tab */}
                <TabsContent value="friends" className="mt-6 space-y-4">
                    {friends.length === 0 ? (
                        <div className="text-center py-12 border rounded-xl bg-muted/10">
                            <p className="text-muted-foreground">No friends yet. Go find some runners!</p>
                            <Button className="mt-4" onClick={() => router.push("/find-runners")}>Find Runners</Button>
                        </div>
                    ) : (
                        friends.map(friend => (
                            <div key={friend.id} className="flex items-center justify-between p-4 bg-card border rounded-xl shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        {friend.avatar}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-semibold truncate">{friend.name}</h3>
                                        <div className="flex items-center text-xs text-muted-foreground gap-2">
                                            <span className="bg-secondary px-2 py-0.5 rounded-full text-secondary-foreground whitespace-nowrap">{friend.level}</span>
                                            <span className="flex items-center gap-1 truncate"><MapPin className="w-3 h-3 flex-none" /> {friend.location}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button size="sm" variant="ghost">
                                        <MessageCircle className="w-4 h-4 mr-2" /> Message
                                    </Button>
                                    <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleRemoveFriend(friend.id, friend.name)}>
                                        <UserMinus className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </TabsContent>

                {/* Requests Tab */}
                <TabsContent value="requests" className="mt-6 space-y-4">
                    {requests.length === 0 ? (
                        <div className="text-center py-12 border rounded-xl bg-muted/10">
                            <p className="text-muted-foreground">No pending requests.</p>
                        </div>
                    ) : (
                        requests.map(req => (
                            <div key={req.id} className="flex items-center justify-between p-4 bg-card border rounded-xl shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                                        {req.avatar}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-semibold truncate">{req.name}</h3>
                                        <div className="flex items-center text-xs text-muted-foreground gap-2">
                                            <span>{req.level}</span>
                                            <span>•</span>
                                            <span className="truncate">{req.distance}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button size="sm" variant="outline" className="text-destructive border-destructive/20 hover:bg-destructive/10" onClick={() => handleReject(req.id)}>
                                        <X className="w-4 h-4 mr-2" /> Reject
                                    </Button>
                                    <Button size="sm" onClick={() => handleAccept(req.id, req.name)}>
                                        <Check className="w-4 h-4 mr-2" /> Accept
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}
