import { AirPort } from '../typings/types/Airport.type';

export const AIRPORTS_DATA_LABELS: Record<keyof AirPort, string> = {
  code: 'Code',
  lat: 'Latitude',
  lon: 'Longitude',
  name: 'Name',
  city: 'City',
  state: 'State',
  country: 'Country',
  woeid: 'WOEID',
  tz: 'Timezone',
  phone: 'Phone',
  type: 'Type',
  email: 'Email',
  url: 'URL',
  runway_length: 'Runway Length',
  elev: 'Elevation',
  icao: 'ICAO',
  direct_flights: 'Direct Flights',
  carriers: 'Carriers',
};
