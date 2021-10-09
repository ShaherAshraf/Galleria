import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Skeleton from '../layouts/Skeleton';

/**
 * @component
 * @name MainArtwork
 * @description A detailed page about each artwork in the Home page.
 */
const MainArtwork = () => {
  const { id } = useParams();
  const { isLoading, data: artwork } = useFetch(`https://openaccess-api.clevelandart.org/api/artworks/${id}`);

  return (
    <div className='MainArtwork'>
      <div className='page-container'>
        {isLoading && <Skeleton type={'spinner'} />}
        {artwork && artwork.data.images && (
          <div className='artwork__info'>
            <img src={artwork.data.images.web.url} alt='' />
            <div className='artwork__details'>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <h3>Title</h3>
                    </td>
                    <td>{`${artwork.data.title}, ${artwork.data.creation_date}`}</td>
                  </tr>
                  <tr>
                    <td>
                      <h3>Artist</h3>
                    </td>
                    <td>
                      <Link to={`/mainArtist/${artwork.data.creators[0].id}/${artwork.data.creators[0].description.replace(/ /g, '-').toLowerCase()}`}>{artwork.data.creators[0].description}</Link>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>Technique</h3>
                    </td>
                    <td>{artwork.data.technique}</td>
                  </tr>
                  <tr>
                    <td>
                      <h3>Measurements</h3>
                    </td>
                    <td>{artwork.data.measurements}</td>
                  </tr>
                  <tr>
                    <td>
                      <h3>Creditline</h3>
                    </td>
                    <td>{artwork.data.creditline}</td>
                  </tr>
                  <tr>
                    <td>
                      <h3>Location</h3>
                    </td>
                    <td>{artwork.data.current_location}</td>
                  </tr>
                  <tr>
                    <td>
                      <h3>Fun fact</h3>
                    </td>
                    <td>{artwork.data.fun_fact}</td>
                  </tr>
                  <tr>
                    <td>
                      <h3>Description</h3>
                    </td>
                    <td>{artwork.data.wall_description}</td>
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

export default MainArtwork;
