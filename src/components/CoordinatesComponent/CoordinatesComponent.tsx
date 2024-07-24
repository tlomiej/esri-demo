import MapView from "@arcgis/core/views/MapView";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import style from "./CoordinatesComponent.module.css";
import { Select, SelectChangeEvent, MenuItem, Typography, FormControl } from "@mui/material";
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
            <div className={style.item}>
              <Typography variant="body2">λ</Typography>
              <Typography variant="body2">
                {coords.latitude.toFixed(5)}
              </Typography>
            </div>
            <div className={style.item}>
              <Typography variant="body2">φ</Typography>
              <Typography variant="body2">
                {coords.longitude.toFixed(5)}
              </Typography>
            </div>
          </>
        ) : (
          <>
            <div className={style.item}>
              <Typography variant="body2">x:</Typography>
              <Typography variant="body2">
                {coords.latitude.toFixed(2)}
              </Typography>
            </div>
            <div className={style.item}>
              <Typography variant="body2">y:</Typography>
              <Typography variant="body2">
                {coords.longitude.toFixed(2)}
              </Typography>
            </div>
          </>
        )}
        <FormControl size="small">
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
        </FormControl>
      </Box>
    </>
  );
};

export default CoordinatesComponent;
