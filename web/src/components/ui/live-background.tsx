"use client"

import { motion } from "framer-motion"

export function LiveBackground() {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                className="absolute -top-20 -right-20 h-[300px] w-[300px] md:h-[600px] md:w-[600px] rounded-full bg-primary/20 blur-3xl opacity-40 md:opacity-60 mix-blend-multiply"
            />
            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    x: [0, -100, 0],
                    y: [0, -50, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 2
                }}
                className="absolute -bottom-20 -left-20 h-[300px] w-[300px] md:h-[600px] md:w-[600px] rounded-full bg-blue-500/20 blur-3xl opacity-40 md:opacity-60 mix-blend-multiply"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    x: [0, 50, -50, 0],
                    y: [0, 100, 0],
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 5
                }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[200px] w-[200px] md:h-[500px] md:w-[500px] rounded-full bg-purple-500/20 blur-3xl opacity-30 md:opacity-50 mix-blend-multiply"
            />
        </div>
    )
}
