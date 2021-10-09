import { useParams } from 'react-router';
import useFetch from '../hooks/useFetch';
import Skeleton from '../layouts/Skeleton';

const Article = () => {
  const { id } = useParams();
  const { isLoading, data: article } = useFetch(`https://api.artic.edu/api/v1/articles/${id}`);

  return (
    <div className='Article'>
      <div className='page-container'>
        {isLoading && <Skeleton type={'spinner'} />}
        {article && (
          <>
            <header className='page-header'>
              <h2 className='page-title'>{article.data.title.replace(/-/g, ' ')}</h2>
              <p>{article.data.date.slice(0, 10)}</p>
            </header>
            <p className='article__text'>{article.data.copy}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Article;
