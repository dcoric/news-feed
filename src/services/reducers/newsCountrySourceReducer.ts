import { INITIAL_STATE, NEUTRAL_STATE } from '../constants';
import { NEWS_COUNTRY_SOURCE } from './types';

export default function (state = { ...INITIAL_STATE, data: 'GB', longName: 'Great Britain' }, action) {
  switch (action.type) {
  case NEWS_COUNTRY_SOURCE:
    return { ...state, ...NEUTRAL_STATE, error: action.error, data: action.payload, longName: action.longName };
  default:
    return state;
  }
}
