import Nav from '../components/Nav/Nav';
import Sidebar from '../components/Sidebar/Sidebar';
import Content from '../components/Content/Content';

const Home = () => {
  return (
    <div className="main_wrapper">
      <Nav />
      <Content />
      <Sidebar />
    </div>
  );
};

export default Home;
