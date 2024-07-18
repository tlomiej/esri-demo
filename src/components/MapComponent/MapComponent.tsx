import Map from "@arcgis/core/Map";
import esriConfig from "@arcgis/core/config";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import MapView from "@arcgis/core/views/MapView";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import Expand from "@arcgis/core/widgets/Expand";
import LayerList from "@arcgis/core/widgets/LayerList";
import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { config } from "../../config";
import SearchComponents from "../SearchComponents/SearchComponents";
import ToolbarComponent from "../ToolbarComponent/ToolbarComponent";

export const MapComponent: React.FC = () => {
  const mapDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapDiv.current) return;

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

    config.LAYERS.map((layer) => map.add(new FeatureLayer(layer)));

    const graphicsLayer = new GraphicsLayer({
      title: "Search",
      listMode: "hide",
    });
    map.add(graphicsLayer);

    const layerList = new LayerList({
      view: view,
    });

    const basemapGallery = new BasemapGallery({
      label: "Basemap",
      view: view,
    });

    const bgExpand = new Expand({
      view: view,
      content: basemapGallery,
      collapseIcon: "add-and-update-features",
      expandTooltip: "Basemaps",
    });

    view.ui.add(bgExpand, "bottom-right");
    view.ui.add(layerList, "top-right");

    const searchExpandDiv = document.createElement("div");
    searchExpandDiv.style.maxHeight = "80vh";
    searchExpandDiv.style.overflowY = "auto";

    view.ui.add(searchExpandDiv, "top-left");

    const root = createRoot(searchExpandDiv);
    root.render(<SearchComponents view={view} graphicsLayer={graphicsLayer} />);

    const toolbarDiv = document.createElement("div");
    view.ui.add(toolbarDiv, "top-right");
    const rootToolbar = createRoot(toolbarDiv);
    rootToolbar.render(<ToolbarComponent view={view}/>);
  }, []);

  return <div ref={mapDiv} style={{ height: "100vh", width: "100%" }}></div>;
};
