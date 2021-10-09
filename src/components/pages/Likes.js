import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import DisplayOptions from '../layouts/DisplayOptions';
import useResize from '../hooks/useResize';
import axios from 'axios';
import Skeleton from '../layouts/Skeleton';

const Likes = ({ handleClick }) => {
  const { windowWidth } = useResize();
  const [likedCards, setLikedCards] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const cardRef = useRef();
  const titleRef = useRef();
  const artistRef = useRef();

  const handleLike = async (id) => {
    await axios.delete(`http://localhost:8000/likes/${id}`);
    setDeleted(!deleted);
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchLikes = async () => {
      await axios
        .get(`http://localhost:8000/likes`, { cancelToken: source.token })
        .then((res) => {
          setLikedCards(res.data);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log('LikesPage => canceled request');
          }
          return err.message;
        });
    };
    fetchLikes();
    return () => source.cancel();
  }, [deleted, handleLike]);

  return (
    <div className='Likes'>
      <div className='page-container'>
        <header className='page-header'>
          <h2 className='page-title'>Likes</h2>
          {window.innerWidth >= 1200 || windowWidth >= 1200 ? <DisplayOptions handleClick={handleClick} /> : null}
        </header>
        {!likedCards && <Skeleton type={'spinner'} />}
        <div className='cards-container'>
          {likedCards &&
            likedCards.map((card) => (
              <div key={card.id} ref={cardRef} className='LikedCard'>
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
                    <span className='card__like material-icons' onClick={() => handleLike(card.id)}>
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
