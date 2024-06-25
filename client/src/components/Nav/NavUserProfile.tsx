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
    return <>Something went wrong</>;
  }
  return (
    <div className="user_profile">
      <div className="user_profile_picture">
        <img src={data?.avatar} alt="avatar" width={40} height={40} />
      </div>
      <div className="user_profile_info">
        <div className="user_name">{data?.name}</div>
        <div className="user_email">@{data?.email}</div>
      </div>
    </div>
  );
};

export default NavUserProfile;
