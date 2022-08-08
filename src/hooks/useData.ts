import { useEffect, useReducer } from 'react';

import { USE_DATE_INITIAL_STATE } from '../constants/use-data.initial-state';
import { ActionType } from '../typings/enums/ActionType.enum';
import { Action } from '../typings/types/Action.type';
import { UseDateReturnType } from '../typings/types/UseData.type';

const reducer =
  <T>() =>
  (state: UseDateReturnType<T>, action: Action): UseDateReturnType<T> => {
    switch (action.type) {
      case ActionType.START:
        return {
          data: null,
          error: '',
          loading: true,
        };
      case ActionType.SET:
        return {
          data: action.payload,
          error: '',
          loading: false,
        };

      case ActionType.ERROR:
        return {
          data: null,
          error: action.payload,
          loading: false,
        };
      default:
        return state;
    }
  };

export const useData = <T>(url: string): UseDateReturnType<T> => {
  const [ctx, dispatch] = useReducer(reducer<T>(), USE_DATE_INITIAL_STATE);

  const fetchData = async () => {
    try {
      const data = await fetch(url).then((res) => res.json());
      dispatch({ type: ActionType.SET, payload: data });
    } catch {
      dispatch({ type: ActionType.ERROR, payload: 'Error while getting the data :(' });
    }
  };

  useEffect(() => {
    dispatch({ type: ActionType.START });
    fetchData();
  }, [url]);

  return ctx;
};
