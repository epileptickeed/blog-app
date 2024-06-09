import axios from "axios";

export default async function DeleteTweet(id: string, email: string) {
  const tweetData = {
    id: id,
    postUserEmail: email,
  };
  const { data } = await axios.post("/deleteTweet", tweetData);
  return data;
}
