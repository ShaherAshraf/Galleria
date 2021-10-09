import DisplayOptions from '../layouts/DisplayOptions';
import useResize from '../hooks/useResize';
import useFetch from '../hooks/useFetch';
import MainCard from '../layouts/MainCard';
import Skeleton from '../layouts/Skeleton';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

const Home = ({ handleClick }) => {
  const { windowWidth } = useResize();
  const { isLoading, data: artworks } = useFetch(`https://openaccess-api.clevelandart.org/api/artworks?limit=1000`);
  const { inView, ref } = useInView();
  const animationControl = useAnimation();

  if (inView) {
    animationControl.start({
      scale: 1,
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2,
      },
    });
  }

  return (
    <div className='Home'>
      <div className='page-container'>
        <header className='page-header'>
          <h2 className='page-title'>Browse all</h2>
          {(window.innerWidth >= 1200 || windowWidth >= 1200) && <DisplayOptions handleClick={handleClick} />}
        </header>
        {isLoading && <Skeleton type='spinner' />}
        <div ref={ref} className='cards-container'>
          {artworks &&
            artworks.data.map((artwork) => {
              if (artwork.images !== null && artwork.creators[0] !== undefined) {
                return (
                  <motion.div key={artwork.id} initial={{ scale: 0, opacity: 0, x: '100vw' }} animate={animationControl}>
                    <MainCard
                      key={artwork.id}
                      artwork_id={artwork.id}
                      title={artwork.title}
                      artist={artwork.creators[0].description}
                      artist_id={artwork.creators[0].id}
                      image_url={artwork.images.web.url}
                    />
                  </motion.div>
                );
              }
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
