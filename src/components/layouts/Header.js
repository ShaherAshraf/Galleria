import { Link } from 'react-router-dom';
import useResize from '../hooks/useResize';
import logo from '../../assets/images/logo.svg';
import NavArrows from './NavArrows';
import SearchBox from './SearchBox';

const Header = ({ toggleMenu, Sidebar }) => {
  const { windowWidth } = useResize();

  return (
    <header className='Header'>
      <div className='container'>
        <Link to='/'>
          <img src={logo} className='header__logo' alt='site logo' />
        </Link>
        {window.innerWidth >= 1200 || window.windowWidth >= 1200 ? (
          <>
            <NavArrows />
            <SearchBox />
          </>
        ) : null}
        {(window.innerWidth >= 992 && window.innerWidth < 1200) || (windowWidth >= 992 && windowWidth < 1200) ? (
          <Sidebar />
        ) : window.innerWidth < 992 && windowWidth < 992 ? (
          <span className='material-icons menu-icon' onClick={toggleMenu}>
            menu
          </span>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
