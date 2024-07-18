import { IconButton, Toolbar } from "@mui/material";
import React from "react";
import LayerBasemapIcon from "calcite-ui-icons-react/LayerBasemapIcon";
import ApplicationsIcon from "calcite-ui-icons-react/ApplicationsIcon";
import Extent from "@arcgis/core/geometry/Extent";
import { config } from "../../config";

interface ToolbarComponentProps {
  view: any;
}

export const ToolbarComponent: React.FC<ToolbarComponentProps> = ({ view }) => {
  return (
    <>
      <Toolbar>
        <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
          title="Start extent"
          onClick={() => {
            const extent = new Extent(config.EXTEND);
            view.goTo(extent);
          }}
        >
          <ApplicationsIcon />
        </IconButton>
       {/*  <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="open drawer"
        >
          <ApplicationsIcon />
        </IconButton>
        <IconButton
          size="small"
          edge="end"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        >
          <LayerBasemapIcon />
        </IconButton> */}
      </Toolbar>
    </>
  );
};

export default ToolbarComponent;
