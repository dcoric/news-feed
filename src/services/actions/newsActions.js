import axiosInstance from '../axios-service';
import { get } from 'lodash';
import { API_TOP_HEADLINES } from '../routes';
import { NEWS_PREVIEW_FETCHED, NEWS_PREVIEW_FETCHING, NEWS_COUNTRY_SOURCE } from '../reducers/types';
import { NEWS_COUNTRY } from '../constants';

export const setCountryNewsSource = (country) => {
  return dispatch => {
    sessionStorage.setItem(NEWS_COUNTRY, country);
    let longName;
    switch (country) {
    case 'GB':
      longName = 'Great Britain';
      break;
    case 'US':
      longName = 'United States';
      break;
    default:
      longName = 'World';
    }
    dispatch({ type: NEWS_COUNTRY_SOURCE, payload: country, longName });
  };
};

export const fetchTopNews = () => {
  return dispatch => {
    dispatch({ type: NEWS_PREVIEW_FETCHING });
    console.log('Calling', NEWS_PREVIEW_FETCHING);
    axiosInstance.get(API_TOP_HEADLINES)
      .then(response => {
        console.log('Response', response);
        dispatch({ type: NEWS_PREVIEW_FETCHED, payload: get(response, 'data.articles') });
      })
      .catch(error => {
        console.error(error.toJSON());
        dispatch({ type: NEWS_PREVIEW_FETCHED, error: error.message });
      });
  };
};
