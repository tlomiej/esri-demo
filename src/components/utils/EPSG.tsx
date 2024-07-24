export const BASEEPSG = "EPSG:4326";

export const EPSG2180 =
  "+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +units=m +no_defs";
export const EPSG4326 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";



export const EPSG = [
  {
    name: "EPSG:2180",
    def: EPSG2180,
  },
  {
    name: "EPSG:4326",
    def: EPSG4326,
  },
  {
    name: "EPSG:2176",
    def: "+proj=tmerc +lat_0=0 +lon_0=15 +k=0.999923 +x_0=5500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
  },
  {
    name: "EPSG:2177",
    def: "+proj=tmerc +lat_0=0 +lon_0=18 +k=0.999923 +x_0=6500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
  },
  {
    name: "EPSG:2178",
    def: "+proj=tmerc +lat_0=0 +lon_0=21 +k=0.999923 +x_0=7500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
  },
  {
    name: "EPSG:2179",
    def: "+proj=tmerc +lat_0=0 +lon_0=24 +k=0.999923 +x_0=8500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
  },
];
