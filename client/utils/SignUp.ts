import axios from 'axios';

export default async function SignUp(name: string, email: string, password: string) {
  const postData = {
    name: name,
    email: email,
    password: password,
  };
  const { data } = await axios.post('/signup', postData);
  return data;
}
