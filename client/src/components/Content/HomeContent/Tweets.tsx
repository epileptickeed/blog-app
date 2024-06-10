import useGetProfile from '../../../../hooks/useGetProfile';
import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import DeleteTweet from '../../../../utils/DeleteTweet';
import Like from '../../../../utils/LikeTweet';
import Edit from './Edit';
import { Item, setIsEditVisible, setTweetInfo } from '../../../../redux/tweetSlice/slice';
import { useDispatch, useSelector } from 'react-redux';
import { tweetSelector } from '../../../../redux/tweetSlice/selector';

const Tweets = () => {
  const { data, isLoading, isError } = useGetProfile();
  const queryClient = useQueryClient();

  const dispatch = useDispatch();

  const { isEditVisible } = useSelector(tweetSelector);

  const editPopup = (item: Item[]) => {
    dispatch(setIsEditVisible(true));
    dispatch(setTweetInfo(item));
  };

  const likingTweet = useMutation(({ id, email }: Item) => Like(id, email), {
    onSuccess: () => {
      toast.success('Liked!');
    },
    onError: () => {
      toast.error('Problim');
    },
    onSettled: () => {
      queryClient.invalidateQueries();
    },
  });

  const deletingTweet = useMutation(({ id, email }: Item) => DeleteTweet(id, email), {
    onSuccess: () => {
      toast.success('Tweet Deleted');
    },
    onError: () => {
      toast.error('Problim');
    },
    onSettled: () => {
      queryClient.invalidateQueries();
    },
  });

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
        recentPosts?.map((item: Item) => {
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
                  <button
                    onClick={() =>
                      likingTweet.mutate({
                        id: item.id,
                        email: item.email,
                      } as Item)
                    }>
                    like
                  </button>
                </div>
                <button>comment</button>
                <div className="posted_tweet_actions_delete">
                  <button
                    onClick={() =>
                      deletingTweet.mutate({
                        id: item.id,
                        email: item.email,
                      } as Item)
                    }>
                    delete
                  </button>
                </div>
                <div className="posted_tweet_actions_edit">
                  <button onClick={() => editPopup({ ...item } as any)}>edit</button>
                </div>
              </div>
            </div>
          );
        })
      )}

      <div className={isEditVisible ? 'edit_tweet_popup' : 'notActive'}>
        <Edit />
      </div>
    </div>
  );
};

export default Tweets;
