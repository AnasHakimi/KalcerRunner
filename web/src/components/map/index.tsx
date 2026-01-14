import dynamic from "next/dynamic"

const Map = dynamic(() => import("./MapComponent"), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-muted animate-pulse flex items-center justify-center">Loading Map...</div>
})

export default Map
