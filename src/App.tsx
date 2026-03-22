import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { MoviePage } from './pages/MoviePage/MoviePage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { NotFound } from './pages/NotFound/NotFound';
import { Header } from './components/Header/Header';
import { CompareTable } from './components/CompareTable/CompareTable';
import { useAppSelector } from './hooks/redux';
import styles from './App.module.css';

function App() {
  const compareList = useAppSelector(state => state.compare.items);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  
  useEffect(() => {
    setIsCompareOpen(compareList.length > 0);
  }, [compareList]);

  return (
    <div className={styles.app}>
      <Header />
      
      <div className={styles.mainWrapper}>
        <CompareTable />
        
        <main 
          className={styles.main}
          style={{ 
            paddingRight: isCompareOpen ? '500px' : '0',
            transition: 'padding-right 0.3s ease'
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<MoviePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;