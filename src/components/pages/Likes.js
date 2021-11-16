import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import DisplayOptions from '../layouts/DisplayOptions';
import useResize from '../hooks/useResize';
import Skeleton from '../layouts/Skeleton';

const Likes = ({ handleClick, isLiked }) => {
  const { windowWidth } = useResize();
  const [deleted, setDeleted] = useState(false);
  const cardRef = useRef();
  const titleRef = useRef();
  const artistRef = useRef();

  const handleDislike = (artwork_id) => {
    const savedLikes = JSON.parse(localStorage.getItem('likes'));
    if (savedLikes && savedLikes.length !== 0) {
      const likesAfterDeletion = savedLikes.filter((savedLike) => savedLike.artwork_id !== artwork_id);
      localStorage.setItem('likes', JSON.stringify(likesAfterDeletion));
      setDeleted(!deleted);
    }
  };

  var likedCards = [];
  const savedLikes = JSON.parse(localStorage.getItem('likes'));
  const fetchLikes = () => {
    if (!savedLikes || savedLikes.length === 0) {
      return null;
    } else {
      likedCards = [...savedLikes];
    }
  };
  fetchLikes();

  useEffect(() => {}, [deleted]);

  return (
    <div className='Likes'>
      <div className='page-container'>
        <header className='page-header'>
          <h2 className='page-title'>Likes</h2>
          {window.innerWidth >= 1200 || windowWidth >= 1200 ? <DisplayOptions handleClick={handleClick} /> : null}
        </header>
        {!likedCards && <Skeleton type={'spinner'} />}
        {(!savedLikes || savedLikes.length === 0) && <h1>No Likes yet!</h1>}
        <div className='cards-container'>
          {likedCards &&
            likedCards.map((card) => (
              <div key={card.artwork_id} ref={cardRef} className='LikedCard'>
                <img src={card.image_url} className='card__img' />
                <div className='card__content'>
                  <div className='card__info'>
                    <Link to={card.artwork_link}>
                      <h3 ref={titleRef} className='card__title'>
                        {card.title}
                      </h3>
                    </Link>
                    <Link to={card.artist_link}>
                      <p ref={artistRef} className='card__artist'>
                        {card.artist}
                      </p>
                    </Link>
                    <span className='card__like material-icons' onClick={() => handleDislike(card.artwork_id)}>
                      favorite
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Likes;
