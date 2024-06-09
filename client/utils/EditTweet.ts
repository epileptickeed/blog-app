import axios from "axios";

export default async function EditTweet(item: any) {
  const postData = {
    text: item.text,
    name: item.name,
    email: item.email,
    id: item.id,
  };
  const { data } = await axios.put(`/editTweet/${item.id}`, postData);
  return data;
}
