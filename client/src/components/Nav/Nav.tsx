import React from 'react';
import { links } from './data';
import NavLinks from './NavLinks';

const Nav = () => {
  return (
    <div className="navigation">
      <nav>
        {links.map((item, index) => {
          return <NavLinks {...item} key={index} />;
        })}
      </nav>
    </div>
  );
};

export default Nav;
