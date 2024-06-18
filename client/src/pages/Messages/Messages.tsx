import { useEffect, useState } from 'react';
import Nav from '../../components/Nav/Nav';
import { useQuery } from 'react-query';
import axios from 'axios';

const Messages = () => {
  const [value, setValue] = useState('');
  const [usersYouChatWith, setUsersYouChatWith] = useState([]);
  const [alike, setAlike] = useState([]);

  const findUser = async () => {
    const data = axios.get('/findUser');
    // console.log(data);
    return data;
  };
  const users = useQuery({
    queryKey: 'users',
    queryFn: findUser,
  });

  const allUsers = users?.data?.data;
  const allUsersNames = allUsers?.map((item: any) => item.name);

  const handleSearch = (e: any) => {
    setValue(e.target.value);
    const searchValue = e.target.value.toLowerCase();
    if (allUsersNames.includes(searchValue)) {
      setAlike(allUsers?.filter((user: any) => user.name === searchValue));
    } else {
      setAlike([]);
    }
  };

  const addUsersToMessages = (item: never) => {
    if (!usersYouChatWith.includes(item)) {
      setUsersYouChatWith((curUsers): any => [...curUsers, item]);
    }
    setValue('');
    setAlike([]);
  };

  return (
    <div className="messages">
      <Nav />
      <div className="messages_inner">
        <div className="dialogues">
          <input
            type="search"
            value={value}
            onChange={(e) => handleSearch(e)}
            placeholder="search"
          />
          <div className="friends">
            {''}
            <div className="searchForUsers">
              {alike?.map((item: any, index) => {
                return (
                  <div
                    key={index}
                    className="user_search"
                    onClick={() => addUsersToMessages(item as never)}>
                    <img src="/profile.png" alt="avatar" width={40} height={40} />
                    <div className="user_info">
                      <div className="user_name">{item.name}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {usersYouChatWith?.map((item: any) => {
              return (
                <div key={item._id} className="friends_user">
                  <img src="/profile.png" alt="avatar" width={40} height={40} />
                  <div className="user_info">
                    <div className="user_name">{item.name}</div>
                    <div className="user_text">user_text</div>
                  </div>
                </div>
              );
            })}
            {''}
          </div>
        </div>
        <div className="chat"></div>
      </div>
    </div>
  );
};

export default Messages;
