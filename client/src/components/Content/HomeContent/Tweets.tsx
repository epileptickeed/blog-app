import useGetProfile from "../../../../hooks/useGetProfile";
import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import DeleteTweet from "../../../../utils/DeleteTweet";
import Like from "../../../../utils/LikeTweet";
import EditTweet from "../../../../utils/EditTweet";
import { useState } from "react";

type Item = {
  id: string;
  email: string;
  text: string;
  name: string;
  avatar: string | null;
  date: string;
  likes: number;
};

const Tweets = () => {
  const { data, isLoading, isError } = useGetProfile();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [tweetInfo, setTweetInfo] = useState<Item[] | any>([]);

  const editPopup = (item: Item[]) => {
    setOpen(true);
    setTweetInfo(item);
  };

  console.log(tweetInfo);

  const likingTweet = useMutation(({ id, email }: Item) => Like(id, email), {
    onSuccess: () => {
      toast.success("Liked!");
    },
    onError: () => {
      toast.error("Problim");
    },
    onSettled: () => {
      queryClient.invalidateQueries();
    },
  });

  const deletingTweet = useMutation(
    ({ id, email }: Item) => DeleteTweet(id, email),
    {
      onSuccess: () => {
        toast.success("Tweet Deleted");
      },
      onError: () => {
        toast.error("Problim");
      },
      onSettled: () => {
        queryClient.invalidateQueries();
      },
    }
  );

  const editingTweet = useMutation((item) => EditTweet(item), {
    onSuccess: () => {},
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Ooops something went wrong</div>;

  const posts = data?.posts;
  if (!posts) {
    return <div>You need to login first, to see your tweets</div>;
  }
  const recentPosts = [...posts].reverse();

  // console.log(recentPosts);

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
                    }
                  >
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
                    }
                  >
                    delete
                  </button>
                </div>
                <div className="posted_tweet_actions_edit">
                  <button onClick={() => editPopup({ ...item } as any)}>
                    edit
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}

      <div className={open ? "edit_tweet_popup" : "notActive"}>
        {tweetInfo?.name}
        {tweetInfo?.date}
        <textarea
          value={tweetInfo?.text}
          onChange={(e) => {
            if (tweetInfo) {
              setTweetInfo({ ...tweetInfo, text: e.target.value });
            }
          }}
          className="edit_tweet_popup_text"
        />
        <button onClick={() => editingTweet.mutate(tweetInfo)}>
          Submit Edit
        </button>
      </div>
    </div>
  );
};

export default Tweets;
