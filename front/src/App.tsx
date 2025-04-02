// src/App.tsx
import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Home from './views/Home/Home';
import { UserContext } from './context/UserContext';
import './App.css';
import Conocenos from './views/Conocenos/Conocenos';
import Contacto from './views/Contacto/Contacto';
import Donaciones from './views/Donaciones/Donaciones';
import Login from './views/Login/Login';
import Registro from './views/Registro/Registro';
import RadioMenu from './components/RadioMenu/RadioMenu';
import Reseñas from './views/Reseñas/Reseñas';

const App: React.FC = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [menuExpanded, setMenuExpanded] = useState(false);

  const protectedRoutes = ['/perfil'];
  const routesWithMenu = ['/', '/conocenos', '/donaciones', '/reseñas', '/contacto'];

  useEffect(() => {
    if (menuExpanded) {
      document.body.classList.add('menu-expanded');
    } else {
      document.body.classList.remove('menu-expanded');
    }
  }, [menuExpanded]);

  useEffect(() => {
    const isAttemptingProtectedRoute = protectedRoutes.some((route) =>
      location.pathname.startsWith(route)
    );

    if (!user && isAttemptingProtectedRoute) {
      navigate('/login');
    } else if (user && ['/login', '/register'].includes(location.pathname)) {
      navigate('/');
    }
  }, [location.pathname, navigate, user]);

  const shouldShowMenu = routesWithMenu.some((route) =>
    location.pathname.startsWith(route)
  );

  const handleMenuToggle = (expanded: boolean) => {
    setMenuExpanded(expanded);
  };

  return (
    <div className={`radio-app ${menuExpanded ? 'menu-expanded' : ''}`}>
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/conocenos" element={<Conocenos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/donaciones" element={<Donaciones />} />
          <Route path="/reseñas" element={<Reseñas />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          {user && <></>}
        </Routes>
      </main>

      {shouldShowMenu && <RadioMenu onMenuToggle={handleMenuToggle} />}

      {shouldShowMenu && (
        <footer className="app-footer">
          <div className="footer-left">
            <img src="/logo.png" alt="121 Expreso" className="logo-image" />
          </div>
          <div className="footer-right">
            {user ? (
              <div className="user-icon">👤</div>
            ) : (
              <button
                className="login-button"
                onClick={() => navigate('/login')}
              >
                Iniciar Sesión
              </button>
            )}
            <button className="live-radio-button">
              RADIO EN VIVO
              <div className="wave-icon">
                <svg viewBox="0 0 24 8" width="24" height="8">
                  <path
                    d="M0,4 C2,0 4,8 6,4 C8,0 10,8 12,4 C14,0 16,8 18,4 C20,0 22,8 24,4"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              </div>
            </button>
            <div className="social-icon">📘</div>
            <div className="social-icon">📷</div>
            <div className="social-icon">🐦</div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;