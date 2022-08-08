import { FC } from 'react';
import { LinkProps, NavLink as RouterNavLink } from 'react-router-dom';

const NavLink: FC<LinkProps & React.RefAttributes<HTMLAnchorElement>> = (props) => {
  return (
    <RouterNavLink
      className={({ isActive }) =>
        `${isActive ? 'navbar__links__nav-link--active' : ''} navbar__links__nav-link`
      }
      {...props}
    />
  );
};

export default NavLink;
