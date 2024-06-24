import { useEffect, useState } from 'react';
import Nav from '../../components/Nav/Nav';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import addUsersToYourMessages from '../../../utils/addUsersToYourMessages';
import toast from 'react-hot-toast';
import useGetProfile from '../../../hooks/useGetProfile';

const Messages = () => {
  const [value, setValue] = useState('');
  const [usersYouChatWith, setUsersYouChatWith] = useState([]);
  const [alike, setAlike] = useState([]);
  const [userYouCurrentlyInChatWith, setUserYouCurrentlyInChatWith] = useState<any[]>([]);
  const currentUser = useGetProfile();

  useEffect(() => {
    setUsersYouChatWith(currentUser?.data?.usersYouChatWith);
  }, [currentUser]);

  const queryClient = useQueryClient();

  const findUser = async () => {
    const data = axios.get('/findUser');
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
    if (allUsersNames?.includes(searchValue)) {
      setAlike(allUsers?.filter((user: any) => user.name === searchValue));
    } else {
      setAlike([]);
    }
  };

  const { mutate } = useMutation((item) => addUsersToYourMessages(item), {
    onSuccess: () => {
      setValue('');
      setAlike([]);
      toast.success('yes');
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });

  const startMessagingWithUser = (user: any) => {
    setUserYouCurrentlyInChatWith((currentUser) => {
      if (userYouCurrentlyInChatWith.length < 1) {
        return [...currentUser, user];
      } else {
        userYouCurrentlyInChatWith.pop();
        return [...currentUser, user];
      }
    });
  };
  console.log(userYouCurrentlyInChatWith.length);
  console.log(userYouCurrentlyInChatWith);

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
                  <div key={index} className="user_search" onClick={() => mutate(item as never)}>
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
                <div
                  key={item._id}
                  className="friends_user"
                  onClick={() => startMessagingWithUser(item)}>
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
        <div className="chat">
          {userYouCurrentlyInChatWith?.map((user: any) => {
            return <div>{user?.name}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Messages;
