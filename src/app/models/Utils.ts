export interface GeoInfo {
  country?: string;
}

export interface Locations {
  entity: string;
  percentage: string;
  country?: string;
  geo?: GeoInfo;
  data?: unknown;
}

export interface CountryData {
  [countryName: string]: number;
}


export interface Entities {
  entity: string;
  percentage: string;
}
