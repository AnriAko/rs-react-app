import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://pokeapi.co/api/v2/',
  headers: {
    'Content-Type': 'application/json',
  },
});
