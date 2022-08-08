import './InfoPage.style.scss';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import FetchState from '../../components/FetchState';
import Select from '../../components/UI/Select';
import { AIRPORTS_DATA_LABELS } from '../../constants/airports.data-labels';
import { OPTION_INITIAL_STATE } from '../../constants/option.initial-state';
import { useData } from '../../hooks/useData';
import { AirPort } from '../../typings/types/Airport.type';
import { Option } from '../../typings/types/Option.type';
import { findAirport } from '../../utils/find-airport';
import { handleChange } from '../../utils/handle-change';

const InfoPage = () => {
  const state = useData<AirPort[]>('/airports.json');

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('airport');
    if (state.loading || !code) return;

    const airport = findAirport(state.data, code);
    if (!airport) return;
    setOption({
      value: airport.code,
      label: `${airport.country}: ${airport.name} (${airport.code})`,
    });
  }, [state.loading]);

  const [option, setOption] = useState<Option>(OPTION_INITIAL_STATE);

  const selectedAirport = useMemo(() => {
    return findAirport(state.data, option.value);
  }, [state.data, option]);

  return (
    <div className="info page">
      <h1 className="info__title">Select an Airport to see the full information</h1>
      <FetchState fetchState={state}>
        {(airports: AirPort[]) => (
          <Select
            className="info__select"
            onChange={handleChange(setOption, setSearchParams, 'airport')}
            options={airports.map((airport) => {
              return {
                value: airport.code,
                label: `${airport.country}: ${airport.name} (${airport.code})`,
              };
            })}
            value={option}
          />
        )}
      </FetchState>
      {selectedAirport && (
        <div className="info__airport-info">
          <h3 className="info__airport-info__title">
            Information on selected airport (#{option.value})
          </h3>
          <div className="info__airport-info__data">
            {(Object.keys(selectedAirport) as (keyof AirPort)[]).map((key) => {
              return (
                <div className="info__airport-info__data__item" key={key}>
                  <strong className="info__airport-info__data__item__label">
                    {AIRPORTS_DATA_LABELS[key]}:
                  </strong>
                  <span className="info__airport-info__data__item__value">
                    {selectedAirport[key] || 'N/A'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoPage;
