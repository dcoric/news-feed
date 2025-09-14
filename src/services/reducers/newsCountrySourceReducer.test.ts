import newsCountrySourceReducer from './newsCountrySourceReducer';
import { NEWS_COUNTRY_SOURCE } from './types';
import { INITIAL_STATE, NEUTRAL_STATE } from '../constants';

describe('newsCountrySourceReducer', () => {
  it('should return the initial state with default country', () => {
    const expectedState = {
      ...INITIAL_STATE,
      data: 'GB',
      longName: 'Great Britain'
    };

    expect(newsCountrySourceReducer(undefined, { type: 'unknown' })).toEqual(expectedState);
  });

  it('should handle NEWS_COUNTRY_SOURCE action', () => {
    const action = {
      type: NEWS_COUNTRY_SOURCE,
      payload: 'US',
      longName: 'United States'
    };

    const expectedState = {
      ...INITIAL_STATE,
      data: 'GB',
      longName: 'Great Britain',
      ...NEUTRAL_STATE,
      error: undefined,
      data: 'US',
      longName: 'United States'
    };

    expect(newsCountrySourceReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle NEWS_COUNTRY_SOURCE with error', () => {
    const action = {
      type: NEWS_COUNTRY_SOURCE,
      payload: 'FR',
      longName: 'World',
      error: 'Some error'
    };

    const expectedState = {
      ...INITIAL_STATE,
      data: 'GB',
      longName: 'Great Britain',
      ...NEUTRAL_STATE,
      error: 'Some error',
      data: 'FR',
      longName: 'World'
    };

    expect(newsCountrySourceReducer(undefined, action)).toEqual(expectedState);
  });

  it('should preserve existing state and apply changes', () => {
    const existingState = {
      ...INITIAL_STATE,
      data: 'GB',
      longName: 'Great Britain',
      someOtherProperty: 'preserved'
    };

    const action = {
      type: NEWS_COUNTRY_SOURCE,
      payload: 'US',
      longName: 'United States'
    };

    const result = newsCountrySourceReducer(existingState, action);

    expect(result).toEqual({
      ...existingState,
      ...NEUTRAL_STATE,
      error: undefined,
      data: 'US',
      longName: 'United States'
    });
  });

  it('should return unchanged state for unknown action types', () => {
    const existingState = {
      ...INITIAL_STATE,
      data: 'US',
      longName: 'United States'
    };

    const unknownAction = { type: 'UNKNOWN_ACTION' };

    expect(newsCountrySourceReducer(existingState, unknownAction)).toBe(existingState);
  });
});