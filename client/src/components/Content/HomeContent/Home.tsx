import { useEffect, useRef } from 'react';
import { input_icons } from './data';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../../../../redux/currentUserSlice/selector';

const HomeContent = () => {
  const { currentPosts } = useSelector(currentUserSelector);

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

  const submitTweet = async () => {
    const postData = {
      text: textarea.current?.value,
      date: new Date().toLocaleDateString(),
    };
    console.log(postData);

    try {
      const { data } = await axios.post('/tweet', postData);
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success('Tweeted!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="home_content">
      <div className="tweet_input">
        <div className="tweet_top">
          <img src="/profile.png" alt="your profile picture" />
          <textarea name="" id="tweet_text" placeholder="What's happening" ref={textarea} />
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
          <button onClick={() => submitTweet()} className="submit_tweet">
            Tweet
          </button>
        </div>
      </div>

      <div className="tweets">
        {currentPosts?.map((item, index) => {
          return <div key={index}>{item.text}</div>;
        })}
      </div>
    </div>
  );
};

export default HomeContent;
