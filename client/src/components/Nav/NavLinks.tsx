import { NavLinksType } from './data';

const NavLinks = ({ title, link, icon_first, icon_second }: NavLinksType) => {
  return (
    <ul>
      <li>
        <img src={icon_first} alt={title} />
      </li>
      <li>{title}</li>
    </ul>
  );
};

export default NavLinks;
