import { useHistory } from 'react-router';

const NavArrows = () => {
  const history = useHistory();

  return (
    <div className='NavArrows'>
      <span className='material-icons' style={history.location.pathname === '/' ? { color: 'white' } : null} onClick={() => history.push('/')}>
        home
      </span>
      <span className='material-icons' onClick={() => history.goBack()}>
        chevron_left
      </span>
      <span className='material-icons' onClick={() => history.goForward()}>
        chevron_right
      </span>
    </div>
  );
};

export default NavArrows;
