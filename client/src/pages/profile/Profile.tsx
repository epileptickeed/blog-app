import { useRef, useState } from 'react';
import useGetProfile from '../../../hooks/useGetProfile';
import Nav from '../../components/Nav/Nav';
import axios from 'axios';

const Profile = () => {
  const { data, isLoading, isError } = useGetProfile();
  // console.log(data);

  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: any) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/uploadAvatar', formData);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong..</div>;
  }

  return (
    <div className="profile">
      <Nav />
      <div className="profile_info">
        hello this is my profile
        <p>
          {data.name}
          <span>{`Your name`}</span>
        </p>
        <p>
          {data.email}
          <span>{`your email`}</span>
        </p>
        <p>
          {/* {image === '' ? ( */}
          <img src={data?.avatar} alt="avatar" width={40} height={40} />
          {/* ) : ( */}
          {/* <img src={image} alt="" width={40} height={40} /> */}
          {/* )} */}
          <span>{`your avatar`}</span>
        </p>
        <button onClick={() => inputFileRef.current!.click()}>Загрузить изображение</button>
        <input ref={inputFileRef} type="file" onChange={(e) => handleFileChange(e)} hidden />
      </div>
    </div>
  );
};

export default Profile;
