import React from "react";
import { Draggable } from "react-beautiful-dnd";
import ApplicationsIcon from "calcite-ui-icons-react/ApplicationsIcon";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
} from "@mui/material";

import ViewHideIcon from "calcite-ui-icons-react/ViewHideIcon";
import ViewMixedIcon from "calcite-ui-icons-react/ViewMixedIcon";

import style from "./LayerTreeComponent.module.css";
import Layer from "@arcgis/core/layers/Layer";

export type DraggableListItemProps = {
  item: Layer;
  index: number;
  onChangeItem: (item: Layer) => void;
};

const DraggableListItem = ({
  item,
  index,
  onChangeItem,
}: DraggableListItemProps) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(
        provided: { innerRef: any; draggableProps: any; dragHandleProps: any },
        snapshot: { isDragging: any }
      ) => (
        <ListItem
          secondaryAction={
            <>
              <IconButton
                edge="end"
                aria-label="visible"
                onClick={(e) => {
                  item.visible = !item.visible;
                  onChangeItem(item);
                }}
              >
                {item.visible ? <ViewMixedIcon /> : <ViewHideIcon />}
              </IconButton>
            </>
          }
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
          <ListItemText primary={item.title} />
        </ListItem>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
