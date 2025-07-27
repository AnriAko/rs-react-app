import { Routes, Route } from 'react-router-dom';
import SearchPage from '../components/search-page';
import NotFoundPage from '../components/not-found-page/not-found-page';
import PokemonDetailsCard from '../components/pokemon-list/pokemon-details-card';
import AboutPage from '../components/about-page/about';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />}>
        <Route path="details/:id" element={<PokemonDetailsCard />} />
      </Route>
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
