import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Skeleton from '../layouts/Skeleton';

/**
 * @component
 * @name Artwork
 * @description A detailed page about each artwork in the ArtistInfo page.
 */
const Artwork = () => {
  const { id } = useParams();
  const { isLoading, data: artwork } = useFetch(`https://api.artic.edu/api/v1/artworks/${id}`);

  return (
    <div className='Artwork'>
      <div className='page-container'>
        {isLoading && <Skeleton type={'spinner'} />}
        {artwork && artwork.data.image_id && (
          <div className='artwork__info'>
            <img src={`https://www.artic.edu/iiif/2/${artwork.data.image_id}/full/843,/0/default.jpg`} alt='' />
            <div className='artwork__details'>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <h3>Title</h3>
                    </td>
                    <td>{`${artwork.data.title}, ${artwork.data.date_start}`}</td>
                  </tr>
                  <tr>
                    <td>
                      <h3>Artist</h3>
                    </td>
                    <td>
                      <Link to={`/artist/${artwork.data.artist_id}/${artwork.data.artist_title.replace(/ /g, '-').toLowerCase()}`}>{artwork.data.artist_display}</Link>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>Technique</h3>
                    </td>
                    <td>{artwork.data.medium_display}</td>
                  </tr>
                  <tr>
                    <td>
                      <h3>Measurements</h3>
                    </td>
                    <td>{artwork.data.dimensions}</td>
                  </tr>
                  <tr>
                    <td>
                      <h3>Creditline</h3>
                    </td>
                    <td>{artwork.data.credit_line}</td>
                  </tr>
                  <tr>
                    <td>
                      <h3>Location</h3>
                    </td>
                    <td>{artwork.data.place_of_origin}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Artwork;
