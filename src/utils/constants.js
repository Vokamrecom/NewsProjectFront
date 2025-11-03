/**
 * Константы приложения
 */

export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5243/api',
  TIMEOUT: 30000,
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
};

export const NEWS = {
  LATEST_COUNT: 5,
  MAX_TITLE_LENGTH: 200,
  MAX_SUBTITLE_LENGTH: 500,
  MAX_IMAGE_URL_LENGTH: 500,
};

export const LANGUAGES = {
  RU: 'ru',
  EN: 'en',
};

export const ROUTES = {
  HOME: '/',
  NEWS: '/news',
  ADMIN: '/admin',
  LOGIN: '/login',
};

