import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import useFetch from '../hooks/useFetch';
import axios from 'axios';
import MainCard from '../layouts/MainCard';
import Skeleton from '../layouts/Skeleton';

/**
 * @component
 * @name MainArtist
 * @description A detailed page about each artist of the Home page.
 */
const MainArtist = () => {
  const { id } = useParams();
  const { isLoading, data: mainArtist } = useFetch(`https://openaccess-api.clevelandart.org/api/creators/${id}`);
  const allArtworksIds = [];
  const [artworkIds, setArtworkIds] = useState([]);
  const allArtworks = [];
  const [newArts, setNewArts] = useState([]);
  const [isWaiting, setIsWaiting] = useState(isLoading);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchArtworks = async () => {
      if (mainArtist !== null) {
        const artworks = mainArtist.data.artworks;
        for (let artwork of artworks) {
          allArtworksIds.push(artwork.id);
          setArtworkIds(allArtworksIds);
          for (let singleId of artworkIds) {
            await axios
              .get(`https://openaccess-api.clevelandart.org/api/artworks/${singleId}`, { cancelToken: source.token })
              .then((res) => {
                allArtworks.push(res.data.data);
                setNewArts(allArtworks);
                setIsWaiting(false);
              })
              .catch((err) => {
                if (axios.isCancel(err)) {
                  console.log('MainArtist => canceled request');
                }
                return err.message;
              });
          }
          setIsPending(false);
        }
      }
    };
    fetchArtworks();
    return () => source.cancel();
  }, [isWaiting, isPending, mainArtist]);

  return (
    <div className='MainArtist'>
      <div className='page-container'>
        {mainArtist && (
          <>
            <header className='page-header'>
              {!mainArtist.data.description && <Skeleton type={`title`} />}
              <h1 className='artist__name'>{mainArtist.data.description}</h1>
            </header>
            <div className='artist__bio'>
              {mainArtist.data.biography && (
                <>
                  <h2>Description</h2>
                  <div className='artist__description'>{mainArtist.data.biography}</div>
                </>
              )}
              <h2>Artworks</h2>
              {isPending && <Skeleton type={`spinner`} />}
              <div className='cards-container'>
                {newArts &&
                  newArts.map((item) => {
                    if (item && item.id !== null && item.images !== null) {
                      return <MainCard key={item.id} artwork_id={item.id} title={item.title} artist={item.creators[0].description} artist_id={item.creators[0].id} image_url={item.images.web.url} />;
                    }
                  })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MainArtist;
