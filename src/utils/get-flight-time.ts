import { AIRPLANE_SPEED } from '../constants/airplane-speed.constant';

export const getFlightTime = (distance: number) => {
  const time = distance / AIRPLANE_SPEED;
  const hours = Math.floor(time);
  const minutes = Math.floor((time - hours) * 60);

  return { hours, minutes };
};
