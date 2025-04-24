
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Ship, Plane, Truck } from "lucide-react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const GlobalTradeMap = () => {
  const [mapboxToken, setMapboxToken] = useState('');
  const [isMapReady, setIsMapReady] = useState(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  // Sample shipping route data - this would typically come from your backend
  const routes = [
    {
      type: 'sea',
      coordinates: [
        [-74.006, 40.7128], // New York
        [3.3792, 6.5244],   // Lagos
        [121.4737, 31.2304] // Shanghai
      ]
    },
    {
      type: 'air',
      coordinates: [
        [-118.2437, 34.0522], // Los Angeles
        [139.6917, 35.6895],  // Tokyo
      ]
    }
  ];

  useEffect(() => {
    if (!mapboxToken || !mapContainer.current || map.current) return;

    mapboxgl.accessToken = mapboxToken;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [0, 20],
        zoom: 1.5,
        projection: 'globe'
      });

      map.current.on('style.load', () => {
        if (!map.current) return;

        // Add routes to the map
        routes.forEach((route, index) => {
          const color = route.type === 'sea' ? '#3498db' : '#9b59b6';
          
          map.current?.addSource(`route-${index}`, {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: route.coordinates
              }
            }
          });

          map.current?.addLayer({
            id: `route-${index}`,
            type: 'line',
            source: `route-${index}`,
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': color,
              'line-width': 3,
              'line-dasharray': [2, 2]
            }
          });

          // Add markers for each point
          route.coordinates.forEach((coord) => {
            new mapboxgl.Marker({ color: color })
              .setLngLat(coord)
              .addTo(map.current!);
          });
        });

        // Add atmosphere and fog effects
        map.current.setFog({
          color: 'rgb(255, 255, 255)',
          'high-color': 'rgb(200, 200, 225)',
          'horizon-blend': 0.2
        });

        setIsMapReady(true);
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl());

    } catch (error) {
      console.error('Error initializing map:', error);
    }

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  if (!isMapReady) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Global Trade Map</h3>
        <Card className="border-dashed border-2">
          <CardContent className="p-6">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Please enter your Mapbox public token to view the interactive map.
                You can find this in your Mapbox account dashboard.
              </p>
              <Input
                type="text"
                placeholder="Enter your Mapbox public token"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
              />
              <Button 
                onClick={() => setMapboxToken(mapboxToken)}
                disabled={!mapboxToken}
              >
                Load Map
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Global Trade Map</h3>
      <p className="text-sm text-muted-foreground">
        Interactive map showing your shipping routes, transit points, and logistics network
      </p>
      
      <Card>
        <CardContent className="p-6">
          <div ref={mapContainer} className="w-full h-[400px] rounded-lg" />
          
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="flex flex-col items-center">
              <Ship className="h-8 w-8 text-blue-500 mb-2" />
              <span className="text-sm font-medium">Ocean Routes</span>
            </div>
            <div className="flex flex-col items-center">
              <Plane className="h-8 w-8 text-purple-500 mb-2" />
              <span className="text-sm font-medium">Air Routes</span>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="h-8 w-8 text-green-500 mb-2" />
              <span className="text-sm font-medium">Land Routes</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GlobalTradeMap;
