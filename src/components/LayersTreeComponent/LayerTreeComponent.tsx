import MapView from "@arcgis/core/views/MapView";
import React from "react";
import { config } from "../../config";

interface LayerTreeComponentProps {
  view: MapView;
}
const LayerTreeComponent: React.FC<LayerTreeComponentProps> = ({ view }) => {
  return (
    <div>
      {config.LAYERS.map((layer) => {
        return <div>{layer.title}</div>;
      })}
      Layer tree component init
    </div>
  );
};

export default LayerTreeComponent;
