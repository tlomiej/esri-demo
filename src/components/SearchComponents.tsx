import {
  Button,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  TextField,
} from "@mui/material";
import React, { Key, useReducer, useState } from "react";
import styles from "./SearchComponents.module.css";
import { config } from "../config";
import proj4 from "proj4";
import { EPSG2180, EPSG4326 } from "./EPSG";
import { formatAddressName, formatString } from "./SearchComponents.helper";
import { AddPointToMap, AddressResult, ErrorMsg } from "./Interface.helper";

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
  addPointToMap?: (pointDetails: AddPointToMap) => void;
  clearGraphicLayer: () => void;
}

const SearchData: React.FC<SearchComponentProps> = ({
  addPointToMap,
  clearGraphicLayer,
}) => {
  const [searchText, setSearchText] = useState<string>("");

  const [state, dispatch] = useReducer(dataFetchReducer, {
    loading: false,
    error: null,
    data: {},
    search: false,
  });

  const getDataFromUrl = async () => {
    clearGraphicLayer();
    dispatch({ type: "FETCH_START" });
    const url = "https://services.gugik.gov.pl/uug/?request=GetAddress";

    if (searchText.length === 0) {
      dispatch({ type: "FETCH_FAILED", error: ErrorMsg.NO_SEARCH_TECH });
    }
    if (searchText.length === 0) return;

    try {
      await fetch(url + `&location=${encodeURIComponent(searchText)}`)
        .then((response) => response.json())
        .then((res) => {
          const errorMode =
            res.results == null ? { error: ErrorMsg.NO_RESULT } : {};
          dispatch({ type: "FETCH_SUCCESS", data: res, ...errorMode });
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
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
            <div className={styles.SearchInfo}>{state.error}</div>
          )}
          {state.data &&
            state.data.results &&
            Object.keys(state.data.results).map((k: string, index: Key) => {
              const addressData = state.data.results[k];
              const { city, street, number, x, y, jednostka }: AddressResult =
                addressData;
              return (
                <ListItem
                  key={index}
                  onClick={() => {
                    if (!addPointToMap) return;
                    const [longitude, latitude] = proj4(EPSG2180, EPSG4326, [
                      parseFloat(x),
                      parseFloat(y),
                    ]);

                    addPointToMap({
                      x: longitude,
                      y: latitude,
                      properties: addressData,
                      popupTemplate: config.ADDRESS_POPUPTEMPLATE,
                    });
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

export default SearchData;
