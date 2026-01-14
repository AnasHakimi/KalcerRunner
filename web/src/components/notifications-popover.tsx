"use client"

import { useState } from "react"
import { Bell, Check, Clock, UserPlus, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

// Mock Data
const INITIAL_NOTIFICATIONS = [
    {
        id: "1",
        type: "request",
        title: "New Friend Request",
        message: "David Kim wants to connect with you.",
        time: "2m ago",
        read: false,
    },
    {
        id: "2",
        type: "session",
        title: "Session Reminder",
        message: "Morning 5K Pace starts in 1 hour.",
        time: "1h ago",
        read: false,
    },
    {
        id: "3",
        type: "system",
        title: "Welcome to Kalcer",
        message: "Thanks for joining! Complete your profile.",
        time: "1d ago",
        read: true,
    },
]

export function NotificationsPopover() {
    const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)
    const [isOpen, setIsOpen] = useState(false)

    const unreadCount = notifications.filter((n) => !n.read).length

    const markAsRead = (id: string) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        )
    }

    const markAllAsRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
        toast.success("All notifications marked as read")
    }

    const simulateNotification = () => {
        const newNotif = {
            id: Date.now().toString(),
            type: "session",
            title: "New Session Nearby",
            message: "A new 10K run was created near you.",
            time: "Just now",
            read: false,
        }
        setNotifications((prev) => [newNotif, ...prev])
        toast("New Notification", {
            description: newNotif.message,
            action: {
                label: "View",
                onClick: () => setIsOpen(true),
            },
        })
    }

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive ring-2 ring-background" />
                    )}
                    <span className="sr-only">Notifications</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
                <div className="flex items-center justify-between border-b px-4 py-3">
                    <h4 className="font-semibold">Notifications</h4>
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto text-xs text-muted-foreground hover:text-primary"
                            onClick={markAllAsRead}
                        >
                            Mark all as read
                        </Button>
                    )}
                </div>
                <ScrollArea className="h-[300px]">
                    {notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                            <Bell className="mb-2 h-8 w-8 opacity-20" />
                            <p className="text-sm">No notifications yet</p>
                        </div>
                    ) : (
                        <div className="grid">
                            {notifications.map((notification) => (
                                <button
                                    key={notification.id}
                                    className={cn(
                                        "flex flex-col gap-1 border-b p-4 text-left transition-colors hover:bg-muted/50",
                                        !notification.read && "bg-muted/10"
                                    )}
                                    onClick={() => markAsRead(notification.id)}
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex items-center gap-2 font-medium leading-none">
                                            {notification.type === "request" && (
                                                <UserPlus className="h-3 w-3 text-blue-500" />
                                            )}
                                            {notification.type === "session" && (
                                                <Zap className="h-3 w-3 text-amber-500" />
                                            )}
                                            {notification.type === "system" && (
                                                <Check className="h-3 w-3 text-green-500" />
                                            )}
                                            <span className="text-sm">{notification.title}</span>
                                        </div>
                                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                                            {notification.time}
                                        </span>
                                    </div>
                                    <p className="line-clamp-2 text-xs text-muted-foreground">
                                        {notification.message}
                                    </p>
                                </button>
                            ))}
                        </div>
                    )}
                </ScrollArea>
                <div className="p-2 border-t bg-muted/20">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-xs"
                        onClick={simulateNotification}
                    >
                        Simulate Incoming Notification
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}
