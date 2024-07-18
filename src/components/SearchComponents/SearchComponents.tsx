import {
  Button,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import React, { Key, useEffect, useReducer, useState } from "react";
import { config } from "../../config";
import useMapGraphics from "../hooks/useMapGraphics";
import {
  AddressResult,
  ErrorMsg,
  ReducerState,
} from "../utils/Interface.helper";
import {
  formatAddressName,
  formatString,
  projXY,
} from "./SearchComponents.helper";
import styles from "./SearchComponents.module.css";
import MapView from "@arcgis/core/views/MapView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

type ReducerAction = "FETCH_START" | "FETCH_FAILED" | "FETCH_SUCCESS";

function dataFetchReducer(
  state: any,
  action: { type: ReducerAction; data?: any; error?: string }
) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        data: action.data,
        loading: false,
        search: true,
        error: action.error ?? null,
      };
    case "FETCH_FAILED":
      return {
        ...state,
        data: {},
        loading: false,
        error: action.error,
      };

    default:
      break;
  }
}

interface SearchComponentProps {
  view: MapView;
  graphicsLayer: GraphicsLayer;
}

const SearchComponents: React.FC<SearchComponentProps> = ({
  view,
  graphicsLayer,
}) => {
  const { clearGraphicLayer, addPointToMap } = useMapGraphics(
    view,
    graphicsLayer
  );
  const [searchText, setSearchText] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<Key>(-1);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    loading: false,
    error: null,
    data: {},
    search: false,
  } as ReducerState);

  const zoomToPoint = (
    x: string,
    y: string,
    addressData: Record<string, any>
  ) => {
    const [longitude, latitude] = projXY(parseFloat(x), parseFloat(y));
    addPointToMap({
      x: longitude,
      y: latitude,
      properties: addressData,
      popupTemplate: config.ADDRESS_POPUPTEMPLATE,
    });
  };

  useEffect(() => {
    if (!(state.data && state.data.results)) return;

    const objKeys = Object.keys(state.data.results);
    if (objKeys.length) {
      const [key] = objKeys;
      const fistObj = state.data.results[key];
      setSelectedIndex(0);
      zoomToPoint(fistObj.x, fistObj.y, fistObj);
    }
  }, [state.data]);

  useEffect(() => {
    if (!state.loading) return;
    clearGraphicLayer();
  }, [state.loading]);

  const getDataFromUrl = async () => {
    dispatch({ type: "FETCH_START" });

    if (searchText.length === 0) {
      dispatch({ type: "FETCH_FAILED", error: ErrorMsg.NO_SEARCH_TECH });
      return;
    }

    try {
      await fetch(
        config.SEARCH_URL + `&location=${encodeURIComponent(searchText)}`
      )
        .then((response) => response.json())
        .then((res) => {
          dispatch({
            type: "FETCH_SUCCESS",
            data: res,
            ...(res.results == null ? { error: ErrorMsg.NO_RESULT } : {}),
          });
        });
    } catch (error) {
      dispatch({ type: "FETCH_FAILED", error: ErrorMsg.API });
    }
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    getDataFromUrl();
  };

  return (
    <div className={styles.ComponentsBox}>
      <div
        className={`${styles.progressContainer} ${
          !state.loading ? styles.hidden : ""
        }`}
      >
        <LinearProgress />
      </div>
      <div className={styles.SearchBox}>
        <form onSubmit={handleSubmit}>
          <TextField
            title="Use pattern: City, street house number"
            className={styles.SearchInput}
            placeholder="Enter address here..."
            id="standard-basic"
            variant="standard"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            className={styles.SearchButton}
            disabled={state.loading}
            type="submit"
            variant="outlined"
          >
            Search
          </Button>
        </form>
      </div>

      {state.loading ? (
        <List>
          <Skeleton animation="wave" height={60} />
          <Skeleton animation="wave" height={60} />
          <Skeleton animation="wave" height={60} />
          <Skeleton animation="wave" height={60} />
        </List>
      ) : (
        <List>
          {state.error && (
            <Typography variant="body2" className={styles.SearchInfo}>
              {state.error}
            </Typography>
          )}
          {state.data &&
            state.data.results &&
            Object.keys(state.data.results).map((k: string, index: Key) => {
              const addressData = state.data.results[k];
              const { city, street, number, x, y, jednostka }: AddressResult =
                addressData;
              return (
                <ListItem
                  className={
                    index === selectedIndex ? styles.SelectedItem : styles.Item
                  }
                  key={index}
                  onClick={(e) => {
                    setSelectedIndex(index);
                    zoomToPoint(x, y, addressData);
                  }}
                >
                  <ListItemText
                    primary={formatAddressName(city, street, number)}
                    secondary={formatString(jednostka)}
                  />
                </ListItem>
              );
            })}
        </List>
      )}
    </div>
  );
};

export default SearchComponents;
