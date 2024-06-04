import { Link } from 'react-router-dom';
import { NavLinksType } from './data';

const NavLinks = ({ title, link, icon_first, icon_second }: NavLinksType) => {
  return (
    <Link to={link}>
      <img src={icon_first} alt={title} />
      <span>{title}</span>
    </Link>
  );
};

export default NavLinks;
