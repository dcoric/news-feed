export const API_KEY = process.env.REACT_APP_API_KEY;

// Route parameters
export const NEWS_ID = 'NEWS_ID';
export const SEARCH_QUERY = 'SEARCH_QUERY';

// Language settings
export const NEWS_LANGUAGE = 'NEWS_LANGUAGE';
export const NEWS_COUNTRY = 'NEWS_COUNTRY';

// store states
export const INITIAL_STATE = {
  fetching: false,
  fetched: false,
  error: null
};

export const NEUTRAL_STATE = {
  fetching: false,
  fetched: true,
  error: null
};

export const FLOAT = {
  LEFT: 'left',
  RIGHT: 'right'
};
