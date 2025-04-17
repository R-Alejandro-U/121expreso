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
import logo from "./assets/banner.svg"
import RadioPlayer from './components/Radio/Radio';

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

    if (!user.user && isAttemptingProtectedRoute) {
      navigate('/login');
    } else if (user.user && ['/login', '/register'].includes(location.pathname)) {
      navigate('/');
    }
  }, [location.pathname, navigate, protectedRoutes, user.user]);

  const shouldShowMenu = routesWithMenu.some((route) =>
    location.pathname.startsWith(route)
  );

  const handleMenuToggle = (expanded: boolean) => {
    setMenuExpanded(expanded);
  };

  const { logOut } = useContext(UserContext)

  return (
    <div className={`radio-app ${menuExpanded ? 'menu-expanded' : ''} ${
      location.pathname === '/' ? 'home-page' : ''
    }`}>
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
            <img src={logo} alt="121 Expreso" className="logo-image" />
          </div>
          <div className="footer-right">
            {user.user ? (
              <button onClick={logOut}>Cerrar Sesión</button>
            ) : (
              <button
                className="login-button"
                onClick={() => navigate('/login')}
              >
                Iniciar Sesión
              </button>
            )}
            <RadioPlayer />
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;