import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Card from '../layouts/Card';
import Skeleton from '../layouts/Skeleton';

/**
 * @component
 * @name ArtistInfo
 * @description A detailed page about each artist of the Artists page.
 */
const ArtistInfo = () => {
  const { id } = useParams();
  const [artistInfo, setArtistInfo] = useState({});
  const [artworkIds, setArtworkIds] = useState([]);
  const allArtworks = [];
  const [newArts, setNewArts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, setIsPending] = useState(true);
  const artistDesc = useRef(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchArtist = () => {
      axios
        .get(`https://api.artic.edu/api/v1/artists/${id}`, { cancelToken: source.token })
        .then((res) => {
          setArtistInfo(res.data.data);
          setArtworkIds(res.data.data.artwork_ids);
          return res.data.data;
        })
        .then((res) => {
          fetchArtworks(res);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log('ArtistsInfo => canceled request');
          }
          return err.message;
        });
    };

    const source2 = axios.CancelToken.source();
    const fetchArtworks = async (res) => {
      for (let singleId of res.artwork_ids) {
        await axios
          .get(`https://api.artic.edu/api/v1/artworks/${singleId}`, { cancelToken: source2.token })
          .then((res) => {
            allArtworks.push(res.data.data);
            setNewArts(allArtworks);
            setIsLoading(false);
          })
          .catch((err) => {
            if (axios.isCancel(err)) {
              console.log('ArtistInfo => canceled request');
            }
            return err.message;
          });
      }
      setIsPending(false);
    };
    fetchArtist();
    return () => {
      source.cancel();
      source2.cancel();
    };
  }, []);

  const artworksCards = newArts.map((item) => {
    if (item && item.image_id !== null) {
      return <Card key={item.image_id} artwork_id={item.id} title={item.title} artist={item.artist_display} image_id={item.image_id} artist_id={item.artist_id} artist_title={item.artist_title} />;
    }
  });

  if (artistDesc.current) {
    artistDesc.current.innerHTML = artistInfo.description;
  }

  return (
    <div className='ArtistInfo'>
      <div className='page-container'>
        <header className='page-header'>
          <h1 className='artist__name'>
            {artistInfo.title == undefined ? <Skeleton type={`title`} /> : artistInfo.title + ' '}
            {!artistInfo.birth_date && !artistInfo.death_date ? null : (
              <span>
                ({artistInfo.birth_date ? artistInfo.birth_date : `~`} - {artistInfo.death_date ? artistInfo.death_date : `~`})
              </span>
            )}
          </h1>
        </header>
        <div className='artist__bio'>
          {artistInfo.description && (
            <>
              <h2>Description</h2>
              <div ref={artistDesc} className='artist__description'></div>
            </>
          )}
          <h2>Artworks</h2>
          {isPending && <Skeleton type={`spinner`} />}
          <div className='cards-container'>{!isPending && artworksCards}</div>
        </div>
      </div>
    </div>
  );
};

export default ArtistInfo;
