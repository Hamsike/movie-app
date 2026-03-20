import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import styles from './Header.module.css';

export const Header: React.FC = () => {
    const favoritesCount = useAppSelector(state => state.favorites.items.length);

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <Link to="/" className={styles.logo}>
                    🎬 MovieApp
                </Link>

                <nav className={styles.nav}>
                    <Link to="/favorites" className={styles.navLink}>
                        ★ Избранное {favoritesCount > 0 && `(${favoritesCount})`}
                    </Link>
                </nav>
            </div>
        </header>
    );
};