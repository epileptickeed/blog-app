import axios from "axios";

export default async function LikeTweet(id: string, email: string) {
  const postData = {
    id: id,
    postEmail: email,
  };
  const { data } = await axios.post("/submitLike", postData);
  return data;
}
