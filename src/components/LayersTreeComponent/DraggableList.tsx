import * as React from "react";
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import DraggableListItem from "./DraggableListItem";
import { Item } from "./Intefrace";

export type DraggableListProps = {
  items: Item[];
  onDragEnd: OnDragEndResponder;
  onChangeItem: (item: Item) => void;
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
