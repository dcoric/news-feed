import { SEARCH_QUERY, NEWS_ID } from './constants';

export const ROOT_ROUTE = '/';
export const TOP_NEWS_ROUTE = '/top-headlines';
export const CATEGORIES_ROUTE = '/categories';
export const SEARCH_ROUTE = '/search';
export const READ_MORE_ROUT = `/read-more/${NEWS_ID}`;

// API ROUTES
export const API_TOP_HEADLINES = 'top-headlines';
export const API_SEARCH_ARTICLE = `everything?q=${SEARCH_QUERY}`;
