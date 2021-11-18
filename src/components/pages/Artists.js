import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import avatar from '../../assets/images/avatar.webp';
import Pagination from '../layouts/Pagination';
import Skeleton from '../layouts/Skeleton';
import { motion } from 'framer-motion';

const Artists = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const source = axios.CancelToken.source();
  const fetchArtists = () => {
    let url = ``;
    if (window.location.search) {
      const pageIndicator = parseInt(window.location.search.slice(6));
      url = `https://api.artic.edu/api/v1/artists?page=${pageIndicator}&limit=100`;
    } else {
      url = `https://api.artic.edu/api/v1/artists?page=1&limit=100`;
    }
    axios
      .get(url, { cancelToken: source.token })
      .then((res) => {
        setCards(res.data);
        setIsLoading(false);
        return res.data;
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('artists page => canceled request');
        }
        return err.message;
      });
  };

  useEffect(() => {
    fetchArtists();
    return () => source.cancel();
  }, [isLoading]);

  let artistsCards = ``;
  if (cards.data !== undefined) {
    artistsCards = cards.data.map((card) => {
      if (card.title !== 'Leigh Ledare') {
        return (
          <motion.div className='artist' key={card.id} initial={{ opacity: 0, scale: 0, x: '100vw' }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <img src={avatar} className='artist__img' alt='artist-image' />
            <Link to={`/artist/${card.id}/${card.title.replace(/ /g, '-').toLowerCase()}`}>
              <div className='artist__title'>
                <h2 className='artist__name'>{card.title}</h2>
                <p className='artist__age'>{'Born: ' + `${card.birth_date ? `${card.birth_date}` : '~'}` + ' / ' + 'Died: ' + `${card.death_date ? `${card.death_date}` : '~'}`}</p>
              </div>
            </Link>
          </motion.div>
        );
      }
    });
  }

  return (
    <div className='Artists'>
      <div className='page-container'>
        <header className='page-header'>
          <h2 className='page-title'>Artists</h2>
        </header>
        {!isLoading ? (
          <>
            <div className='artists-container'>{artistsCards}</div>
            <Pagination totalPosts={12801} postsPerPage={100} pageName='artists' triggerFunction={fetchArtists} />
          </>
        ) : (
          <Skeleton type='spinner' />
        )}
      </div>
    </div>
  );
};

export default Artists;
