import MapView from "@arcgis/core/views/MapView";
import React from "react";
import { config } from "../../config";
import { Paper } from "@mui/material";
import DraggableList from "./DraggableList";
import { DropResult } from "react-beautiful-dnd";
import style from "./LayerTreeComponent.module.css";
import { Item } from "./Interface";

interface LayerTreeComponentProps {
  view: MapView;
}

const reorder = (list: Item[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const LayerTreeComponent: React.FC<LayerTreeComponentProps> = ({ view }) => {
  const [items, setItems] = React.useState<Item[]>(config.LAYERS);

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;

    const newItems = reorder(items, source.index, destination.index);
    setItems(newItems);
  };

  return (
    <div>
      <Paper className={style.flexPaper}>
        <DraggableList items={items} onDragEnd={onDragEnd} />
      </Paper>
    </div>
  );
};

export default LayerTreeComponent;
