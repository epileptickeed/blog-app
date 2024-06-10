import { useDispatch, useSelector } from 'react-redux';
import { tweetSelector } from '../../../../redux/tweetSlice/selector';
import { setIsEditVisible, setTweetInfo } from '../../../../redux/tweetSlice/slice';
import { useMutation, useQueryClient } from 'react-query';
import EditTweet from '../../../../utils/EditTweet';
import toast from 'react-hot-toast';
import { useEffect, useRef } from 'react';

const Edit = () => {
  const dispatch = useDispatch();
  const { tweetInfo } = useSelector(tweetSelector);

  const queryClient = useQueryClient();

  const editingTweet = useMutation((item) => EditTweet(item), {
    onSuccess: () => {
      toast.success('Edited!');
      dispatch(setIsEditVisible(false));
      queryClient.invalidateQueries();
    },
    onError: (error: any) => {
      if (error.response && error.response.status === 500) {
        toast.error('Oops, something went wrong: ' + error.response.data.error);
      } else if (error.response && error.response.status === 404) {
        toast.error('Error: ' + error.response.data.error);
      } else {
        toast.error('An error occurred');
      }
    },
  });

  const textarea = useRef<HTMLTextAreaElement>(null);
  const textareaValue = textarea.current?.value;
  useEffect(() => {
    const handler = () => {
      if (textarea.current!.value.length > 0) {
        let scheight = textarea.current!.scrollHeight;
        textarea.current!.style.height = `${scheight}px`;
      } else {
        textarea.current!.style.height = '100px';
      }
    };
    textarea.current!.addEventListener('keyup', handler);
  }, [textareaValue]);

  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!container.current?.contains(event.target as Node)) {
        dispatch(setIsEditVisible(false));
      }
    };

    window.addEventListener('mousedown', handler);
  }, []);

  return (
    <div className="edit_tweet_popup_inner" ref={container}>
      {tweetInfo?.name}
      {tweetInfo?.date}
      <textarea
        value={tweetInfo?.text}
        ref={textarea}
        maxLength={500}
        onChange={(e) => {
          if (tweetInfo) {
            dispatch(setTweetInfo({ ...tweetInfo, text: e.target.value }));
          }
        }}
        className="edit_tweet_popup_text"
      />
      <button onClick={() => editingTweet.mutate(tweetInfo)}>Submit Edit</button>
    </div>
  );
};

export default Edit;
