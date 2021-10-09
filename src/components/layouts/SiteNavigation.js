import { useState } from 'react';
import useResize from '../hooks/useResize';
import Header from './Header';
import Sidebar from './Sidebar';

const SiteNavigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { windowWidth } = useResize();

  const toggleMenu = () => {
    menuOpen ? setMenuOpen(false) : setMenuOpen(true);
  };

  return (
    <div className='SiteNavigation'>
      <Header toggleMenu={toggleMenu} Sidebar={Sidebar} />
      {menuOpen && <Sidebar toggleMenu={toggleMenu} />}
      {window.innerWidth >= 1200 || windowWidth >= 1200 ? <Sidebar /> : null}
    </div>
  );
};

export default SiteNavigation;
