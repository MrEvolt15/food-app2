import axios from 'axios';

const API_URL = 'https://162d-34-169-150-36.ngrok-free.app/predict';

export const predictFruit = async (imageUri) => {
  try {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error predicting fruit:', error);
    throw error;
  }
};