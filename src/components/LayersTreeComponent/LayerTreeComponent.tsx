import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import React from "react";
import { config } from "../../config";
import { Paper } from "@mui/material";
import DraggableList from "./DraggableList";
import { DropResult } from "react-beautiful-dnd";
import style from "./LayerTreeComponent.module.css";
import { Item } from "./Interface";

interface LayerTreeComponentProps {
  view: MapView;
  map: Map;
}

const reorder = (list: Item[], startIndex: number, endIndex: number) => {
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
  const [items, setItems] = React.useState<Item[]>(config.LAYERS.reverse());

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;

    const newItems = reorder(items, source.index, destination.index);
    setItems(newItems);

    //set new place
    reorderMap(map, items[source.index].id, items.length - destination.index - 1);
  };

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
            setItems(newItems);

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
