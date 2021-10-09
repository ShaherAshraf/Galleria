import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { handleLike } from './utils';

/**
 * @component
 * @name MainCard
 * @description Represents the card for each artwork of Home page.
 */
const MainCard = ({ artwork_id, title, artist, artist_id, image_url }) => {
  const [isLiked, setIsLiked] = useState(false);
  const titleRef = useRef();
  const artistRef = useRef();

  const pressLike = () => {
    setIsLiked(!isLiked);
    const cardInfo = {
      artwork_id,
      artwork_link: `/MainArtwork/${artwork_id}`,
      title,
      artist,
      artist_link: `/mainArtist/${artist_id}/${artist.replace(/ /g, '-').toLowerCase()}`,
      artist_id,
      image_url,
      isLiked,
    };
    handleLike(cardInfo);
  };

  useEffect(() => {
    if (titleRef.current.textContent.length > 50) {
      titleRef.current.textContent = titleRef.current.textContent.slice(0, 50) + ' ...';
    }
    if (artistRef.current.textContent.length > 50) {
      artistRef.current.textContent = artistRef.current.textContent.slice(0, 50) + ' ...';
    }
  }, [pressLike]);

  if (artwork_id) {
    return (
      <div className='MainCard'>
        <img src={image_url} className='card__img' />
        <div className='card__content'>
          <div className='card__info'>
            <Link to={`/MainArtwork/${artwork_id}`}>
              <h3 ref={titleRef} className='card__title'>
                {title}
              </h3>
            </Link>
            <Link to={`/mainArtist/${artist_id}/${artist.replace(/ /g, '-').toLowerCase()}`}>
              <p ref={artistRef} className='card__artist'>
                {artist}
              </p>
            </Link>
            <span className='card__like material-icons' onClick={pressLike}>
              {isLiked ? 'favorite' : 'favorite_border'}
            </span>
          </div>
        </div>
      </div>
    );
  }
};

export default MainCard;