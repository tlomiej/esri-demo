import React from "react";
import { Draggable } from "react-beautiful-dnd";
import ApplicationsIcon from "calcite-ui-icons-react/ApplicationsIcon";
import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";

import style from "./LayerTreeComponent.module.css";

type Item = {
  id: string;
  title: string;
  url: string;
};

export type DraggableListItemProps = {
  item: Item;
  index: number;
};

const DraggableListItem = ({ item, index }: DraggableListItemProps) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(
        provided: { innerRef: any; draggableProps: any; dragHandleProps: any },
        snapshot: { isDragging: any }
      ) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={snapshot.isDragging ? style.draggingListItem : ""}
        >
          <ListItemAvatar>
            <Avatar>
              <ApplicationsIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.title} secondary={item.url} />
        </ListItem>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
