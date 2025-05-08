import {isAndroid} from './helpers';

export const BASE_URL = isAndroid
  ? 'http://10.0.2.2:3000'
  : 'http://localhost:3000';
