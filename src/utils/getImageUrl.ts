import { BASE_URL } from '../services/axios';

export const getImageUrl = (imagePath: string) => {
  return `${BASE_URL}/uploads/${imagePath}`;
};
