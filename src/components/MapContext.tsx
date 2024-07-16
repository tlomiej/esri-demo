import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import Map from "@arcgis/core/Map";
import esriConfig from "@arcgis/core/config";
import MapView from "@arcgis/core/views/MapView";
import { config } from "../config";

interface MapContextType {
  map: Map | null;
  view: MapView | null;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a MapProvider");
  }
  return context;
};

interface MapProviderProps {
  children: ReactNode;
}

export const MapProvider: React.FC<MapProviderProps> = ({ children }) => {
  const [map, setMap] = useState<Map | null>(null);
  const [view, setView] = useState<MapView | null>(null);
  const mapDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapDiv.current) {
      esriConfig.apiKey = config.ESRI_API_KEY;

      const map = new Map({
        basemap: "arcgis/topographic",
      });

      const view = new MapView({
        map: map,
        zoom: config.INIT_ZOOM,
        container: mapDiv.current,
        extent: config.EXTEND,
      });

      setMap(map);
      setView(view);
    }
  }, []);

  return (
    <MapContext.Provider value={{ map, view }}>
      <div ref={mapDiv} style={{ height: "100vh", width: "100%" }}></div>
      {children}
    </MapContext.Provider>
  );
};
