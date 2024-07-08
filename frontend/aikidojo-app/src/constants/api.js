export const PROTOCOL = 'http://';
export const HOST = 'localhost:8000/';
export const MEDIA = 'media/';
export const MEDIA_PATH = PROTOCOL + HOST + MEDIA;
export const BASE_URL = PROTOCOL + HOST;
export const API_URL = BASE_URL + 'api/v1/';
export const AUTH_URL = BASE_URL + 'auth/';
export const GOOGLE =
  'https://accounts.google.com/o/oauth2/auth?client_id=894302264409-k5524dr53a5rfkhm6r1nogdo7o9t4o1a.apps.googleusercontent.com&redirect_uri=http://localhost:8000/accounts/google/callback/&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar&access_type=offline&state=';
