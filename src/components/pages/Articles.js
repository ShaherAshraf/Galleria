import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Skeleton from '../layouts/Skeleton';
import { motion } from 'framer-motion';

const Articles = () => {
  const { isLoading, data: articles } = useFetch(`https://api.artic.edu/api/v1/articles?limit=100`);

  return (
    <div className='Articles'>
      <div className='page-container'>
        <header className='page-header'>
          <h2 className='page-title'>Articles</h2>
        </header>
        {isLoading && <Skeleton type={'spinner'} />}
        {articles &&
          articles.data.map((article) => (
            <div className='article' key={article.id}>
              <motion.div initial={{ y: '100vh', opacity: 0, scale: 0 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
                <Link to={`/article/${article.id}/${article.title}`}>
                  <h2 className='article__title'>{article.title.replace(/-/g, ' ')}</h2>
                </Link>
                <p className='article__text'>{article.copy.slice(0, 200) + `...`}</p>
                <Link to={`/article/${article.id}/${article.title}`} className='article__link'>
                  Read more...
                </Link>
              </motion.div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Articles;
