import useGetProfile from '../../../hooks/useGetProfile';
import Nav from '../../components/Nav/Nav';

const Profile = () => {
  const { data } = useGetProfile();
  console.log(data);

  return (
    <div className="profile">
      <Nav />
      <div className="profile_info">
        hello this is my profile
        <p>
          {data?.name}
          <span>{`<--Your name`}</span>
        </p>
      </div>
    </div>
  );
};

export default Profile;
