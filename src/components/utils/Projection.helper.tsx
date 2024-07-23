import { EPSG } from "./EPSG";

export const findProjectionByName = (name: string) => {
  return EPSG.find((projection) => projection.name === name) || EPSG[0];
};
