import { useLocation } from 'react-router';
import useResize from '../hooks/useResize';
import NavArrows from './NavArrows';
import DisplayOptions from './DisplayOptions';

const Footer = () => {
  const location = useLocation();
  const { windowWidth } = useResize();

  return window.innerWidth >= 1200 || windowWidth >= 1200 ? null : (
    <footer className='Footer'>
      <div className='container'>
        <NavArrows />
        {(location.pathname === '/' || location.pathname === '/likes') && <DisplayOptions />}
      </div>
    </footer>
  );
};

export default Footer;
