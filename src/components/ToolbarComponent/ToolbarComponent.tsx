import { IconButton, Toolbar } from "@mui/material";
import React from "react";
import UndoIcon from "calcite-ui-icons-react/UndoIcon";
import RedoIcon from "calcite-ui-icons-react/RedoIcon";
import ApplicationsIcon from "calcite-ui-icons-react/ApplicationsIcon";
import Extent from "@arcgis/core/geometry/Extent";
import { config } from "../../config";
import useMapUndoRedo from "../hooks/useMapUndoRedo";

interface ToolbarComponentProps {
  view: any;
}

export const ToolbarComponent: React.FC<ToolbarComponentProps> = ({ view }) => {
  const { undoView, redoView, canUndo, canRedo } = useMapUndoRedo(view);

  return (
    <>
      <Toolbar>
        <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          title="Start extent"
          onClick={() => {
            const extent = new Extent(config.EXTEND);
            view.goTo(extent);
          }}
        >
          <ApplicationsIcon />
        </IconButton>
        <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={undoView}
          disabled={!canUndo}
        >
          <UndoIcon />
        </IconButton>
        <IconButton
          size="small"
          edge="end"
          color="inherit"
          aria-label="open drawer"
          onClick={redoView}
          disabled={!canRedo}
        >
          <RedoIcon />
        </IconButton>
      </Toolbar>
    </>
  );
};

export default ToolbarComponent;
