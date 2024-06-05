import { links } from './data';
import NavLinks from './NavLinks';

const Nav = () => {
  return (
    <div className="navigation">
      <img src="/icons/Vector.png" className="logo" alt="Logo" />
      <nav>
        {links.map((item, index) => {
          return <NavLinks {...item} key={index} />;
        })}
      </nav>
    </div>
  );
};

export default Nav;
