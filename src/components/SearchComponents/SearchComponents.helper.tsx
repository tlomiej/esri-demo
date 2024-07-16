import proj4 from "proj4";
import { EPSG2180, EPSG4326 } from "../utils/EPSG";

export const formatString = (input: string): string => {
  return input.replace("{", "").replace("}", "").split(",").join(", ");
};

export const formatAddressName = (
  city: string,
  street?: string,
  number?: string
) => {
  return `${city}${street ? ", " : ""}${street ? street : ""} ${
    number ? number : ""
  }`;
};

export const projXY = (
  x: number,
  y: number,
  fromEPSG: string = EPSG2180,
  toEPSG: string = EPSG4326
) => {
  return proj4(fromEPSG, toEPSG, [x, y]);
};
