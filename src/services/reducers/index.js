import { combineReducers } from 'redux';

import newsPreviewReducer from './newsPreviewReducer';
import newsCountrySourceReducer from './newsCountrySourceReducer';

export default combineReducers({
  newsPreviewReducer,
  newsCountrySourceReducer
});
