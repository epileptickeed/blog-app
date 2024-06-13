import { links } from './data';
import NavLinks from './NavLinks';
import NavUserProfile from './NavUserProfile';

const Nav = () => {
  return (
    <div className="navigation">
      <div className="navigation_inner">
        <div>
          <img src="/icons/Vector.png" className="logo" alt="Logo" />
          <nav>
            {links.map((item, index) => {
              return <NavLinks {...item} key={index} />;
            })}
          </nav>
        </div>
        <NavUserProfile />
      </div>
    </div>
  );
};

export default Nav;
