import Point from "@arcgis/core/geometry/Point";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import MapView from "@arcgis/core/views/MapView";
import { useCallback } from "react";
import { AddPointToMap } from "../utils/Interface.helper";

const useMapGraphics = (view: MapView, graphicsLayer: GraphicsLayer) => {
  const clearGraphicLayer = useCallback(() => {
    graphicsLayer.removeAll();
  }, [graphicsLayer]);

  const addPointToMap = useCallback(
    (pointDetails: AddPointToMap) => {
      const { x, y, properties, popupTemplate } = pointDetails;

      const point = new Point({
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
    },
    [view, graphicsLayer]
  );

  return {
    clearGraphicLayer,
    addPointToMap,
  };
};

export default useMapGraphics;
