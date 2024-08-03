import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import ApplicationsIcon from "calcite-ui-icons-react/ApplicationsIcon";
import { Draggable } from "react-beautiful-dnd";

import ViewHideIcon from "calcite-ui-icons-react/ViewHideIcon";
import ViewMixedIcon from "calcite-ui-icons-react/ViewMixedIcon";

import Layer from "@arcgis/core/layers/Layer";
import { Item } from "./Intefrace";
import style from "./LayerTreeComponent.module.css";

export type DraggableListItemProps = {
  item: Item;
  index: number;
  onChangeItem: (item: Item) => void;
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
                onClick={() => {
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
