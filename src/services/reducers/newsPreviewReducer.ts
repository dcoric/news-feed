import { INITIAL_STATE, NEUTRAL_STATE } from '../constants';
import { NEWS_PREVIEW_FETCHED, NEWS_PREVIEW_FETCHING } from './types';

const newsPreviewReducer = (state = { ...INITIAL_STATE }, action) => {
  switch (action.type) {
  case NEWS_PREVIEW_FETCHING:
    return { ...state, ...NEUTRAL_STATE, fetching: true };
  case NEWS_PREVIEW_FETCHED:
    return { ...state, ...NEUTRAL_STATE, error: action.error, data: action.payload };
  default:
    return state;
  }
};

export default newsPreviewReducer;
