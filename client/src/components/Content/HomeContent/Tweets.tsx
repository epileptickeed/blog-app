import axios from 'axios';
import useGetProfile from '../../../../hooks/useGetProfile';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

const Tweets = () => {
  const { data, isLoading, isError } = useGetProfile();

  const [postId, setPostId] = useState('');
  const [postEmail, setPostEmail] = useState('');

  const submitLike = (id: string, email: string) => {
    setPostId(id);
    setPostEmail(email);
  };

  async function Like(id: string, email: string) {
    const postData = {
      id: id,
      postEmail: email,
    };
    const { data } = await axios.post('/submitLike', postData);
    return data;
  }
  const { data: likes, mutate } = useMutation(() => Like(postId, postEmail), {
    onSuccess: () => {
      toast.success('Liked!');
    },
    onError: () => {
      toast.error('Problim');
    },
  });

  useEffect(() => {
    if (postId && postEmail) {
      mutate();
    }
  }, [postId, postEmail, mutate]);

  // console.log(mutate);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Ooops something went wrong</div>;

  const posts = data?.posts;
  if (!posts) {
    return <div>You need to login first, to see your tweets</div>;
  }
  const recentPosts = [...posts].reverse();

  return (
    <div className="tweets_inner">
      {data.error ? (
        <div>You need to login first, to see your tweets</div>
      ) : (
        recentPosts?.map((item: any) => {
          return (
            <div key={item.id} className="posted_tweet">
              <div className="posted_tweet_info">
                <div className="posted_tweet_user_info">
                  {item.name}
                  {item.avatar}
                  <br />
                  {item.email}
                </div>
                {item.date}
              </div>
              <div className="posted_tweet_text">{item.text}</div>
              <div className="posted_tweet_actions">
                <div className="posted_tweet_actions_like">
                  {item.likes}
                  <button onClick={() => submitLike(item.id, item.email)}>like</button>
                </div>
                <button>comment</button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Tweets;
