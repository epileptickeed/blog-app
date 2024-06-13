import axios from 'axios';
import defaultAvatar from '../public/profile.png';

export default async function SignUp(name: string, email: string, password: string) {
  const postData = {
    name: name,
    email: email,
    password: password,
    avatar: defaultAvatar,
  };
  const { data } = await axios.post('/signup', postData);
  return data;
}
