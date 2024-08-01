import Map from "@arcgis/core/Map";
import Layer from "@arcgis/core/layers/Layer";
import MapView from "@arcgis/core/views/MapView";
import { Paper } from "@mui/material";
import React from "react";
import { DropResult } from "react-beautiful-dnd";
import DraggableList from "./DraggableList";
import style from "./LayerTreeComponent.module.css";

interface LayerTreeComponentProps {
  view: MapView;
  map: Map;
}

const reorder = (list: Layer[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const reorderMap = (map: Map, layerId: string, newIndex: number) => {
  const layer = map.findLayerById(layerId);
  map.reorder(layer, newIndex);
};

const LayerTreeComponent: React.FC<LayerTreeComponentProps> = ({
  view,
  map,
}) => {
  const [items, setItems] = React.useState<Layer[]>(
    map.layers
      .filter((layer) => layer.type === "feature")
      .toArray()
      .reverse()
  );

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;

    const newItems = reorder(items, source.index, destination.index);
    setItems(newItems);

    //set new place
    reorderMap(
      map,
      items[source.index].id,
      items.length - destination.index - 1
    );
  };

  const handleLayerChange = (event: {
    added: any[];
    removed: any[];
    moved: any[];
  }) => {
    if (event.moved) {
      console.log("Layer moved: ");
      setItems(
        map.layers
          .filter((layer) => layer.type === "feature")
          .toArray()
          .reverse()
      );
    }
  };

  map.layers.on("change", handleLayerChange);

  return (
    <div>
      <Paper className={style.flexPaper}>
        <DraggableList
          items={items}
          onDragEnd={onDragEnd}
          onChangeItem={(e) => {
            const newItems = items.map((item) =>
              item.id === e.id ? { ...e } : item
            );
            setItems(newItems as Layer[]);

            //visible
            const layer = map.findLayerById(e.id);
            if (layer) {
              layer.visible = !layer.visible;
            }
          }}
        />
      </Paper>
    </div>
  );
};

export default LayerTreeComponent;
