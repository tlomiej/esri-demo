import { useCallback, useEffect, useRef, useState } from "react";
import MapView from "@arcgis/core/views/MapView";
import { Extent } from "@arcgis/core/geometry";

const useMapUndoRedo = (view: MapView) => {
  const historyRef = useRef<Extent[]>([]);
  const historyIndexRef = useRef<number>(-1);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const isMove = useRef<boolean>(false);

  useEffect(() => {
    const handleExtentChange = () => {
      if (view && view.stationary) {
        if (isMove.current) {
          isMove.current = false;
          return;
        }
        const currentExtent = view.extent.clone();
        historyRef.current.push(currentExtent);
        historyIndexRef.current++;

        setCanUndo(historyIndexRef.current > 0);
        setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
      }
    };

    if (view) {
      const extentChangeHandle = view.watch("stationary", handleExtentChange);
      return () => {
        extentChangeHandle.remove();
      };
    }
  }, [view]);

  const undoView = useCallback(() => {
    if (canUndo && view) {
      isMove.current = true;
      historyIndexRef.current--;
      const previousExtent = historyRef.current[historyIndexRef.current];
      view.goTo(previousExtent);
      setCanUndo(historyIndexRef.current > 0);
      setCanRedo(true);
    }
  }, [canUndo, view]);

  const redoView = useCallback(() => {
    if (canRedo && view) {
      isMove.current = true;
      historyIndexRef.current++;
      const nextExtent = historyRef.current[historyIndexRef.current];
      view.goTo(nextExtent);
      setCanUndo(true);
      setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
    }
  }, [canRedo, view]);

  return {
    undoView,
    redoView,
    canUndo,
    canRedo,
  };
};

export default useMapUndoRedo;
