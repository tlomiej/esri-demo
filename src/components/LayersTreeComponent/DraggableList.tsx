import * as React from "react";
import DraggableListItem from "./DraggableListItem";
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import { Item } from "./Interface";
import Layer from "@arcgis/core/layers/Layer";

export type DraggableListProps = {
  items: Layer[];
  onDragEnd: OnDragEndResponder;
  onChangeItem: (item: Layer) => void;
};

const DraggableList = React.memo(
  ({ items, onDragEnd, onChangeItem }: DraggableListProps) => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item, index) => (
                <DraggableListItem
                  item={item}
                  index={index}
                  key={item.id}
                  onChangeItem={(item) => onChangeItem(item)}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
);

export default DraggableList;
