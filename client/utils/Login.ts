import axios from 'axios';

export default async function Login(email: string, password: string) {
  const postData = {
    email: email,
    password: password,
  };
  const { data } = await axios.post('/login', postData);
  return data;
}
