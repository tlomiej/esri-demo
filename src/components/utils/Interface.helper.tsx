export interface AddPointToMap {
    x: number,
    y: number,
    properties: Record<string, any>,
    popupTemplate: Record<string, any>
}

export interface AddressResult {
  city: string;
  street?: string;
  number?: string;
  x: string;
  y: string;
  jednostka: string;
}

export enum ErrorMsg {
  API = "API error...",
  NO_RESULT = "Can`t find address...",
  NO_SEARCH_TECH = "Try enter address...",
}

export interface ReducerState {
  loading: boolean;
  error: string | null;
  data: Record<string, any>;
  search: boolean;
}
