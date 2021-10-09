import { NavLink } from 'react-router-dom';

const Sidebar = ({ toggleMenu }) => {
  return (
    <nav className='Sidebar'>
      <div className='sidebar__nav-links'>
        <NavLink className='link-item' exact={true} activeClassName='is-active' to='/' onClick={toggleMenu}>
          <span className='material-icons'>home</span>
          <span>Home</span>
        </NavLink>
        <NavLink className='link-item' activeClassName='is-active' to='/artists' onClick={toggleMenu}>
          <span className='material-icons'>people</span>
          <span>Artists</span>
        </NavLink>
        <NavLink className='link-item' activeClassName='is-active' to='/articles' onClick={toggleMenu}>
          <span className='material-icons'>description</span>
          <span>Articles</span>
        </NavLink>
        <NavLink className='link-item' activeClassName='is-active' to='/search' onClick={toggleMenu}>
          <span className='material-icons'>search</span>
          <span>Search</span>
        </NavLink>
        <NavLink className='link-item' activeClassName='is-active' to='/likes' onClick={toggleMenu}>
          <span className='material-icons'>favorite_border</span>
          <span>Likes</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Sidebar;
