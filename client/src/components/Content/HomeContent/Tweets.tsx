import useGetProfile from '../../../../hooks/useGetProfile';

const Tweets = () => {
  const { data, isLoading, isError } = useGetProfile();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Ooops something went wrong</div>;

  const recentPosts = [...data?.posts].reverse();

  console.log(recentPosts);

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
                </div>
                {item.date}
              </div>
              <div className="posted_tweet_text">{item.text}</div>
              <div className="posted_tweet_actions">
                <button>like</button>
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
