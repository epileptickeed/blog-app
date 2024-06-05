import axios from 'axios';

export default async function CreateTweet(text: string) {
  const postData = {
    text: text,
    date: new Date().toLocaleDateString(),
  };
  const { data } = await axios.post('/tweet', postData);
  return data;
}
