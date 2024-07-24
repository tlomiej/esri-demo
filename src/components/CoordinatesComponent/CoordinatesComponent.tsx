import MapView from "@arcgis/core/views/MapView";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import style from "./CoordinatesComponent.module.css";
import { Select, SelectChangeEvent, MenuItem } from "@mui/material";
import { EPSG } from "./../utils/EPSG";
import { projXY } from "../SearchComponents/SearchComponents.helper";
import { findProjectionByName } from "../utils/Projection.helper";

interface CoordinatesComponentProps {
  view: MapView;
}

export const CoordinatesComponent: React.FC<CoordinatesComponentProps> = ({
  view,
}) => {
  const BASEEPSG = "EPSG: 4326";
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });
  const [epsg, setEpsg] = useState(BASEEPSG);

  useEffect(() => {
    if (view) {
      console.log(epsg);
      const handlePointerMove = (evt: any) => {
        const point = view.toMap({ x: evt.x, y: evt.y });

        const [x, y] = projXY(
          point.latitude,
          point.longitude,
          findProjectionByName(BASEEPSG).def,
          findProjectionByName(epsg).def
        );
        setCoords({ latitude: x, longitude: y });
      };

      const handle = view.on("pointer-move", handlePointerMove);

      return () => {
        handle.remove();
      };
    }
  }, [epsg, view]);

  const handleChange = (event: SelectChangeEvent) => {
    setEpsg(event.target.value as string);
  };

  return (
    <>
      <Box component="section" className={style.container}>
        <div className={style.ItemLeft}>{coords.latitude.toFixed(5)}</div>
        <div className={style.ItemLeft}>{coords.longitude.toFixed(5)}</div>

        <Select
          title="EPSG"
          defaultValue={epsg}
          value={epsg}
          onChange={handleChange}
        >
          {EPSG.map((e) => {
            return <MenuItem value={e.name}>{e.name}</MenuItem>;
          })}
        </Select>
      </Box>
    </>
  );
};

export default CoordinatesComponent;
