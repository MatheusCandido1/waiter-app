const BASE_URL = 'http://192.168.0.181:3001';

export const getImageUrl = (imagePath: string) => {
  return `${BASE_URL}/uploads/${imagePath}`;
};
