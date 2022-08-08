import './ComparisonPage.style.scss';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import FetchState from '../../components/FetchState';
import Select from '../../components/UI/Select';
import { OPTION_INITIAL_STATE } from '../../constants/option.initial-state';
import { useData } from '../../hooks/useData';
import { AirPort } from '../../typings/types/Airport.type';
import { Option } from '../../typings/types/Option.type';
import { findAirport } from '../../utils/find-airport';
import { getDistance } from '../../utils/get-distance';
import { getFlightTime } from '../../utils/get-flight-time';
import { handleChange } from '../../utils/handle-change';

const ComparisonPage = () => {
  const state = useData<AirPort[]>('/airports.json');
  const [searchParams, setSearchParams] = useSearchParams();

  const [originOption, setOriginOption] = useState<Option>(OPTION_INITIAL_STATE);
  const [destinationOption, setDestinationOption] =
    useState<Option>(OPTION_INITIAL_STATE);

  const originAirport = useMemo(() => {
    return findAirport(state.data, originOption.value);
  }, [state.data, originOption.value]);

  const destinationAirport = useMemo(() => {
    return findAirport(state.data, destinationOption.value);
  }, [state.data, destinationOption.value]);

  const distance = useMemo(() => {
    if (!originAirport || !destinationAirport)
      return {
        kilometers: 0,
        miles: 0,
      };

    return getDistance(originAirport, destinationAirport);
  }, [originAirport, destinationAirport]);

  const flightTime = useMemo(() => {
    return getFlightTime(distance.kilometers);
  }, [distance]);

  useEffect(() => {
    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination');
    if (state.loading || !origin || !destination) return;

    const originAirport = findAirport(state.data, origin);
    const destinationAirport = findAirport(state.data, destination);
    if (!originAirport || !destinationAirport) return;

    setOriginOption({
      value: originAirport.code,
      label: `${originAirport.country}: ${originAirport.name} (${originAirport.code})`,
    });

    setDestinationOption({
      value: destinationAirport.code,
      label: `${destinationAirport.country}: ${destinationAirport.name} (${destinationAirport.code})`,
    });
  }, [state.loading]);

  return (
    <div className="comparison page">
      <h1 className="comparison__title">
        Compare Airports&apos; distance destination here!
      </h1>
      <FetchState fetchState={state}>
        {(airports: AirPort[]) => (
          <div className="comparison__content">
            <div className="comparison__content__select-list">
              <div className="comparison__content__select-list__control">
                <h4 className="comparison__content__select-list__control__label">
                  Origin Airport:
                </h4>
                <Select
                  className="comparison__content__select-list__control__select"
                  onChange={handleChange(setOriginOption, setSearchParams, 'origin', {
                    destination: searchParams.get('destination') || '',
                  })}
                  options={airports.map((airport) => {
                    return {
                      value: airport.code,
                      label: `${airport.country}: ${airport.name} (${airport.code})`,
                    };
                  })}
                  value={originOption}
                />
              </div>
              <div className="comparison__content__select-list__control">
                <h4 className="comparison__content__select-list__control__label">
                  Destination Airport:
                </h4>
                <Select
                  className="comparison__content__select-list__control__select"
                  onChange={handleChange(
                    setDestinationOption,
                    setSearchParams,
                    'destination',
                    {
                      origin: searchParams.get('origin') || '',
                    },
                  )}
                  options={airports.map((airport) => {
                    return {
                      value: airport.code,
                      label: `${airport.country}: ${airport.name} (${airport.code})`,
                    };
                  })}
                  value={destinationOption}
                />
              </div>
            </div>
            {originAirport && destinationAirport && (
              <div className="comparison__content__values">
                <h3 className="comparison__content__values__distance">
                  The distance from airport {originAirport.code} to{' '}
                  {destinationAirport.code}
                  {': '}
                  <u>{`${distance.kilometers.toFixed(
                    0,
                  )} kilometers (${distance.miles.toFixed(0)} miles)`}</u>
                </h3>
                <h3 className="comparison__content__values__flight-time">
                  Flight time approx.:{' '}
                  <u>
                    {flightTime.hours} hours and {flightTime.minutes} minutes
                  </u>
                </h3>
              </div>
            )}
          </div>
        )}
      </FetchState>
    </div>
  );
};

export default ComparisonPage;
