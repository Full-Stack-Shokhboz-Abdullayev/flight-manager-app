import './Navbar.style.scss';

import NavLink from './NavLink';
const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar__logo">
        <img className="navbar__logo__img" src="/logo.svg" alt="Logo" />
      </div>
      <nav className="navbar__links">
        <NavLink to={'/'}>Info</NavLink>
        <NavLink to={'/compare'}>Comparison</NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
