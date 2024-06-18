import React from 'react';
import useGetProfile from '../../../hooks/useGetProfile';

const NavUserProfile = () => {
  const { data, isError, isLoading } = useGetProfile();

  if (isError) {
    return <div>Something went wrong</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // console.log(data);

  if (data.error) {
    return <></>;
  }
  return (
    <div className="user_profile">
      <div className="user_profile_picture">{data?.avatar}</div>
      <div className="user_name">{data?.name}</div>
      <div className="user_email">@{data?.email}</div>
    </div>
  );
};

export default NavUserProfile;
