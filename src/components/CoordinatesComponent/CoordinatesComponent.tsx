import MapView from "@arcgis/core/views/MapView";
import React, { useEffect, useState } from "react";

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
      X , y<div>{coords.latitude}</div>
      <div>{coords.longitude}</div>
    </>
  );
};

export default CoordinatesComponent;
