import axios from 'axios';

const API_URL = 'http://localhost:5000/api/loans'; // change if deployed

export const applyForLoan = async (loanData) => {
  try {
    const res = await axios.post($,{API_URL}/apply , loanData);
    return res.data;
  } catch (error) {
    console.error('Error submitting loan:', error);
    throw error;
  }
};