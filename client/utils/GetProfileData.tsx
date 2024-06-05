import axios from 'axios';

export default async function GetProfileData() {
  const { data } = await axios.get('/getProfile');
  return data;
}
