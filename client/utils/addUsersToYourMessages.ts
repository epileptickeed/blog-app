import axios from 'axios';
export default async function addUsersToYourMessages(item: any) {
  const postData = {
    user: item,
  };
  const data = axios.post('/addUsersToYourMessages', postData);
  return data;
}
