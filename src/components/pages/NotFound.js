import { Link } from 'react-router-dom';
import pic from '../../assets/images/giphy.webp';

const NotFound = () => {
  return (
    <div className='NotFound'>
      <div className='page-container'>
        <div className='error'>
          <img src={pic} alt='notfound-image' />
          <div className='content'>
            <h1>Whoops!</h1>
            <h3>404 Page Not Found</h3>
            <Link to='/'>Back to the home page</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
