import MapView from "@arcgis/core/views/MapView";
import {
  Collapse,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import WebIcon from "calcite-ui-icons-react/WebIcon";
import React, { useEffect, useState } from "react";
import { projXY } from "../SearchComponents/SearchComponents.helper";
import { findProjectionByName } from "../utils/Projection.helper";
import { BASEEPSG, EPSG } from "./../utils/EPSG";
import style from "./CoordinatesComponent.module.css";

interface CoordinatesComponentProps {
  view: MapView;
}

export const CoordinatesComponent: React.FC<CoordinatesComponentProps> = ({
  view,
}) => {
  const [open, setOpen] = useState<boolean>(false);
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
      <Box
        component="section"
        className={`${style.container} ${open ? "" : style.CollapseElement}`}
      >
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
        <div className={style.EpsgBox}>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            title={epsg}
            onClick={() => {
              setOpen(!open);
            }}
          >
            <WebIcon
              title={epsg}
              onClick={() => {
                setOpen(!open);
              }}
            />
          </IconButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
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
          </Collapse>
        </div>
      </Box>
    </>
  );
};

export default CoordinatesComponent;
