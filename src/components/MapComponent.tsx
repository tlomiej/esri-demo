import Graphic from "@arcgis/core/Graphic";
import Map from "@arcgis/core/Map";
import esriConfig from "@arcgis/core/config";
import Point from "@arcgis/core/geometry/Point";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import MapView from "@arcgis/core/views/MapView";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import Expand from "@arcgis/core/widgets/Expand";
import LayerList from "@arcgis/core/widgets/LayerList";
import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { config } from "../config";
import { AddPointToMap } from "./Interface.helper";
import SearchComponents from "./SearchComponents";

const MapComponent: React.FC = () => {
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

      const clearGraphicLayer = () => {
        graphicsLayer.removeAll();
      };

      const addPointToMap = (pointDetails: AddPointToMap) => {
        const { x, y, properties, popupTemplate } = pointDetails;

        var point = new Point({
          longitude: x,
          latitude: y,
        });

        const pictureMarkerSymbol = new PictureMarkerSymbol({
          url: "/icons/BluePin1LargeB.png",
          width: "24px",
          height: "24px",
        });

        const pointGraphic = new Graphic({
          geometry: point,
          symbol: pictureMarkerSymbol,
          attributes: properties,
          popupTemplate: popupTemplate,
        });

        graphicsLayer.add(pointGraphic);

        view
          .goTo({
            target: point,
            zoom: 21,
          })
          .then(() => {
            view.popup.open({
              location: point,
              features: [pointGraphic],
            });
          });
      };

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
      root.render(
        <SearchComponents
          addPointToMap={addPointToMap}
          clearGraphicLayer={clearGraphicLayer}
        />
      );
    }
  }, []);

  return <div ref={mapDiv} style={{ height: "100vh", width: "100%" }}></div>;
};

export default MapComponent;
