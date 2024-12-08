import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const gardenTipService = {
  getAllTips: async () => {
    try {
      const response = await axios.get(`${API_URL}/garden-tips`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tips:', error);
      throw error;
    }
  },

  addTip: async (tipData) => {
    try {
      const response = await axios.post(`${API_URL}/garden-tips`, tipData);
      return response.data;
    } catch (error) {
      console.error('Error adding tip:', error);
      throw error;
    }
  },

  deleteTip: async (tipId) => {
    try {
      const response = await axios.delete(`${API_URL}/garden-tips/${tipId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting tip:', error);
      throw error;
    }
  }
}; 