import { AirPort } from '../typings/types/Airport.type';

export const getDistance = (
  { lat: lat1, lon: lon1 }: AirPort,
  { lat: lat2, lon: lon2 }: AirPort,
) => {
  const cord1 = {
    lat: Number(lat1),
    lon: Number(lon1),
  };
  const cord2 = {
    lat: Number(lat2),
    lon: Number(lon2),
  };

  if (cord1.lat == cord2.lat && cord1.lon == cord2.lon) {
    return { miles: 0, kilometers: 0 };
  }

  const radlat1 = (Math.PI * cord1.lat) / 180;
  const radlat2 = (Math.PI * cord2.lat) / 180;

  const theta = cord1.lon - cord2.lon;
  const radtheta = (Math.PI * theta) / 180;

  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

  if (dist > 1) {
    dist = 1;
  }

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;

  return { miles: dist, kilometers: dist * 1.609344 };
};
