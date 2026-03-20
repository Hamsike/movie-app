import styles from './App.module.css';
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage/HomePage'
import { MoviePage } from './pages/MoviePage/MoviePage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { NotFound } from './pages/NotFound/NotFound';
import { Header } from './components/Header/Header';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App
