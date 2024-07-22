import MapView from "@arcgis/core/views/MapView";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import style from './CoordinatesComponent.module.css'

interface CoordinatesComponentProps {
  view: MapView;
}

export const CoordinatesComponent: React.FC<CoordinatesComponentProps> = ({
  view,
}) => {
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    if (view) {
      const handlePointerMove = (evt: any) => {
        const point = view.toMap({ x: evt.x, y: evt.y });
        setCoords({ latitude: point.latitude, longitude: point.longitude });
      };

      const handle = view.on("pointer-move", handlePointerMove);

      return () => {
        handle.remove();
      };
    }
  }, [view]);

  return (
    <>
      <Box component="section" className={style.container}>
        <div className={style.ItemLeft}>{coords.latitude.toFixed(5)}</div>
        <div>{coords.longitude.toFixed(5)}</div>
      </Box>
    </>
  );
};

export default CoordinatesComponent;
