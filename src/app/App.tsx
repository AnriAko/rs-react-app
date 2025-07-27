import { Routes, Route } from 'react-router-dom';
import SearchPage from '../components/search-page';
import NotFoundPage from '../components/not-found-page/not-found-page';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
