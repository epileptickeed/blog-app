import { useEffect, useRef, useState } from 'react';
import { input_icons } from './data';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import Tweets from './Tweets';

import CreateTweet from '../../../../utils/CreateTweet';
import { useNavigate } from 'react-router-dom';

const HomeContent = () => {
  const queryClient = useQueryClient();

  const [textValue, setTextValue] = useState('');

  const textarea = useRef<HTMLTextAreaElement>(null);
  const textareaValue = textarea.current?.value;

  const navigate = useNavigate();

  const {
    mutate,
    data: tweetResult,
    isSuccess,
  } = useMutation(() => CreateTweet(textValue), {
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success('Tweeted');
      setTextValue('');
    },
    onError: (error: any) => {
      if (error.response && error.response.status === 500) {
        toast.error('Oops, something went wrong: ' + error.response.data.error);
        navigate('/login');
      } else if (error.response && error.response.status === 404) {
        toast.error('Error: ' + error.response.data.error);
      } else {
        toast.error('An error occurred');
      }
    },
  });

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

  return (
    <div className="home_content">
      <div className="tweet_input">
        <div className="tweet_top">
          <img src="/profile.png" alt="your profile picture" />
          <textarea
            name=""
            id="tweet_text"
            placeholder="What's happening"
            ref={textarea}
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
        </div>

        <div className="tweet_bottom">
          <div className="icons">
            {input_icons.map((item, index) => {
              return (
                <button key={index}>
                  <img src={item.img} alt={item.alt} />
                </button>
              );
            })}
          </div>
          <button onClick={() => mutate()} className="submit_tweet">
            Tweet
          </button>
        </div>
      </div>

      <div className="tweets">
        <Tweets />
      </div>
    </div>
  );
};

export default HomeContent;
