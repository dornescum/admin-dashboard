export interface GeoInfo {
  country?: string;
  city?: string;
  timezone?: string;
  eu?: string;
  range?: string;
  region?: string;
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


export interface DeviceOSInfo {
  device_os: string;
  percentage: string;
}

export interface DeviceBrowserInfo {
  device_browser: string;
  percentage: string;
}

export interface JobOccurrence {
  jobs: string;
  occurrence_count: number;
}

export interface DeviceTypeInfo {
  device_type: string;
  percentage: string;
}
