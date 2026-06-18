import axios from 'axios';
import { serverUrl } from '../App';

export const getCurrentUser = async () => {
  try {
    const result = await axios.get(serverUrl + '/api/user/currentuser', {
      withCredentials: true,
    });
    // dispatch(setUserData(result.data));
    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
};
