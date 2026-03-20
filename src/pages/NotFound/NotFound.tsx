import { Link } from "react-router-dom";

export const NotFound: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <h1 style={{ color: '#ff6b6b', marginBottom: '20px' }}>404</h1>
      <p style={{ color: '#b0b0b0', marginBottom: '20px' }}>
        Страница не найдена
      </p>
      <Link to="/" style={{ color: '#ff6b6b', textDecoration: 'none' }}>
        Вернуться на главную
      </Link>
    </div>
  );
};