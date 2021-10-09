import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SiteNavigation, Home, Artists, MainArtist, ArtistInfo, MainArtwork, Artwork, Articles, Article, Search, Likes, NotFound, Footer } from './components';
import '../node_modules/material-design-icons/iconfont/material-icons.css';
import './scss/main.scss';

function App() {
  return (
    <Router>
      <div className='App'>
        <SiteNavigation />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/artists'>
            <Artists />
          </Route>
          <Route path='/mainArtist/:id'>
            <MainArtist />
          </Route>
          <Route path='/artist/:id'>
            <ArtistInfo />
          </Route>
          <Route path='/MainArtwork/:id'>
            <MainArtwork />
          </Route>
          <Route exact path='/artwork/:id'>
            <Artwork />
          </Route>
          <Route path='/articles'>
            <Articles />
          </Route>
          <Route path='/article/:id'>
            <Article />
          </Route>
          <Route path='/search'>
            <Search />
          </Route>
          <Route path='/likes'>
            <Likes />
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
