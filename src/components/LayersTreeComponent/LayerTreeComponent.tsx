import MapView from "@arcgis/core/views/MapView";
import React from "react";

interface LayerTreeComponentProps {
  view: MapView;
}
const LayerTreeComponent: React.FC<LayerTreeComponentProps> = ({ view }) => {
  return <div>Layer tree component init</div>;
};

export default LayerTreeComponent;
