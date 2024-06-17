import { useState } from 'react';
import Nav from '../../components/Nav/Nav';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import axios from 'axios';

const Messages = () => {
  const [value, setValue] = useState('');

  const findUser = async () => {
    const postData = {
      text: value,
    };
    const data = axios.post('/findUser', postData);
    return data;
  };
  const { data } = useMutation(() => findUser(), {
    onSuccess: () => {
      toast.success;
    },
    onError: () => {
      toast.error;
    },
  });

  console.log(data);

  return (
    <div className="messages">
      <Nav />
      <div className="messages_inner">
        <div className="dialogues">
          <input type="search" value={value} onChange={(e) => setValue(e.target.value)} />
          <div className="friends">
            {''}
            <div className="friends_user">
              <img src="/profile.png" alt="avatar" width={40} height={40} />
              <div className="user_info">
                <div className="user_name">user_name</div>
                <div className="user_text">user_text</div>
              </div>
            </div>

            <div className="friends_user">
              <img src="/profile.png" alt="avatar" width={40} height={40} />
              <div className="user_info">
                <div className="user_name">user_name</div>
                <div className="user_text">user_text</div>
              </div>
            </div>
            {''}
          </div>
        </div>
        <div className="chat"></div>
      </div>
    </div>
  );
};

export default Messages;
