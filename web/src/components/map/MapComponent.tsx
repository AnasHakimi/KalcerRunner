"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix for default marker icons in Next.js
const iconUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png"
const shadowUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"

const DefaultIcon = L.icon({
    iconUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
})

// @ts-ignore
L.Marker.prototype.options.icon = DefaultIcon

interface MapProps {
    center?: [number, number]
    zoom?: number
    markers?: Array<{
        id: string | number
        position: [number, number]
        title: string
        description?: string
    }>
    className?: string
}

const MapComponent = ({ center = [3.1390, 101.6869], zoom = 13, markers = [], className }: MapProps) => {
    // Center defaults to Kuala Lumpur for demo

    return (
        <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className={className} style={{ height: "100%", width: "100%", zIndex: 0 }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map((marker) => (
                <Marker key={marker.id} position={marker.position}>
                    <Popup>
                        <div className="font-semibold">{marker.title}</div>
                        <div className="text-sm">{marker.description}</div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}

export default MapComponent
