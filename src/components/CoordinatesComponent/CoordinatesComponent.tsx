import MapView from "@arcgis/core/views/MapView";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import style from "./CoordinatesComponent.module.css";
import { Select, SelectChangeEvent, MenuItem } from "@mui/material";
import { BASEEPSG, EPSG } from "./../utils/EPSG";
import { projXY } from "../SearchComponents/SearchComponents.helper";
import { findProjectionByName } from "../utils/Projection.helper";

interface CoordinatesComponentProps {
  view: MapView;
}

export const CoordinatesComponent: React.FC<CoordinatesComponentProps> = ({
  view,
}) => {
  const [coords, setCoords] = useState({
    latitude: 0,
    longitude: 0,
    epsg: BASEEPSG,
  });
  const [epsg, setEpsg] = useState(BASEEPSG);

  useEffect(() => {
    if (view) {
      const handlePointerMove = (evt: any) => {
        const point = view.toMap({ x: evt.x, y: evt.y });

        const [x, y] = projXY(
          point.latitude,
          point.longitude,
          findProjectionByName(BASEEPSG).def,
          findProjectionByName(epsg).def
        );
        setCoords({ latitude: x, longitude: y, epsg });
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

  useEffect(() => {
    const [x, y] = projXY(
      coords.latitude,
      coords.longitude,
      findProjectionByName(coords.epsg).def,
      findProjectionByName(epsg).def
    );
    setCoords({ latitude: x, longitude: y, epsg });
  }, [epsg]);

  return (
    <>
      <Box component="section" className={style.container}>
        {epsg === BASEEPSG ? (
          <>
            <div>
              <span>λ</span>
              <span>{coords.latitude.toFixed(5)}</span>
            </div>
            <div>
              <span>φ</span>
              <span>{coords.longitude.toFixed(5)}</span>
            </div>
          </>
        ) : (
          <>
            <div>
              <span>x</span>
              <span>{coords.latitude.toFixed(2)}</span>
            </div>
            <div>
              <span>y</span>
              <span>{coords.longitude.toFixed(2)}</span>
            </div>
          </>
        )}

        <Select
          className={style.customSelect}
          title="EPSG"
          defaultValue={epsg}
          value={epsg}
          onChange={handleChange}
        >
          {EPSG.map((e) => {
            return (
              <MenuItem key={e.name} value={e.name}>
                {e.name}
              </MenuItem>
            );
          })}
        </Select>
      </Box>
    </>
  );
};

export default CoordinatesComponent;
