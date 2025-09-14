import newsPreviewReducer from './newsPreviewReducer';
import { NEWS_PREVIEW_FETCHING, NEWS_PREVIEW_FETCHED } from './types';
import { INITIAL_STATE, NEUTRAL_STATE } from '../constants';

describe('newsPreviewReducer', () => {
  it('should return the initial state', () => {
    expect(newsPreviewReducer(undefined, { type: 'unknown' })).toEqual({
      ...INITIAL_STATE
    });
  });

  it('should handle NEWS_PREVIEW_FETCHING', () => {
    const action = { type: NEWS_PREVIEW_FETCHING };

    const expectedState = {
      ...INITIAL_STATE,
      ...NEUTRAL_STATE,
      fetching: true
    };

    expect(newsPreviewReducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle NEWS_PREVIEW_FETCHED with data', () => {
    const mockArticles = [
      { title: 'Test News 1', url: 'http://example.com/1' },
      { title: 'Test News 2', url: 'http://example.com/2' }
    ];

    const action = {
      type: NEWS_PREVIEW_FETCHED,
      payload: mockArticles
    };

    const expectedState = {
      ...INITIAL_STATE,
      ...NEUTRAL_STATE,
      error: undefined,
      data: mockArticles
    };

    expect(newsPreviewReducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should handle NEWS_PREVIEW_FETCHED with error', () => {
    const action = {
      type: NEWS_PREVIEW_FETCHED,
      error: 'Network error'
    };

    const expectedState = {
      ...INITIAL_STATE,
      ...NEUTRAL_STATE,
      error: 'Network error',
      data: undefined
    };

    expect(newsPreviewReducer(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it('should preserve existing state and apply changes correctly', () => {
    const existingState = {
      ...INITIAL_STATE,
      someOtherProperty: 'preserved'
    };

    const action = { type: NEWS_PREVIEW_FETCHING };

    const result = newsPreviewReducer(existingState, action);

    expect(result).toEqual({
      ...existingState,
      ...NEUTRAL_STATE,
      fetching: true
    });
  });
});