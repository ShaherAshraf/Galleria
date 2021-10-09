import useResize from '../hooks/useResize';
import { handleDisplayOptions } from './utils';

const DisplayOptions = () => {
  const { windowWidth } = useResize();

  return (
    <div className='DisplayOptions'>
      <span className='material-icons' onClick={(e) => handleDisplayOptions(e, windowWidth)}>
        view_list
      </span>
      <span className='material-icons' onClick={(e) => handleDisplayOptions(e, windowWidth)}>
        view_module
      </span>
      <span className='material-icons' onClick={(e) => handleDisplayOptions(e, windowWidth)}>
        play_arrow
      </span>
    </div>
  );
};

export default DisplayOptions;
