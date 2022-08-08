import { AirPort } from '../typings/types/Airport.type';

export const findAirport = (airports: AirPort[] | null, code: string) => {
  if (airports) return airports.find((airport) => airport.code === code);
  return null;
};
