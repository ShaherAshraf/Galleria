import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { handleLike } from './utils';

/**
 * @component
 * @name Card
 * @description Represents the card for each artwork of ArtistInfo page.
 */
const Card = ({ artwork_id, title, artist, image_id, artist_id, artist_title }) => {
  const [isLiked, setIsLiked] = useState(false);
  const titleRef = useRef();
  const artistRef = useRef();

  const pressLike = () => {
    setIsLiked(!isLiked);
    const cardInfo = {
      artwork_id,
      artwork_link: `/artwork/${artwork_id}`,
      title,
      artist,
      artist_link: `/artist/${artist_id}/${artist_title.replace(/ /g, '-').toLowerCase()}`,
      artist_id,
      image_url: `https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`,
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

  return (
    <div className='card'>
      <img src={`https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`} className='card__img' />
      <div className='card__content'>
        <div className='card__info'>
          <Link to={`/artwork/${artwork_id}`}>
            <h3 ref={titleRef} className='card__title'>
              {title}
            </h3>
          </Link>
          <Link to={`/artist/${artist_id}/${artist_title.replace(/ /g, '-').toLowerCase()}`}>
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
};

export default Card;
