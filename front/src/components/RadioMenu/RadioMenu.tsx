// src/components/RadioMenu/RadioMenu.tsx
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './RadioMenu.module.css';

interface RadioMenuProps {
  onMenuToggle?: (expanded: boolean) => void;
}

const RadioMenu: React.FC<RadioMenuProps> = ({ onMenuToggle }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      console.log('Window width:', window.innerWidth, 'isMobile:', mobile);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  useEffect(() => {
    if (onMenuToggle) {
      onMenuToggle(isExpanded);
    }
    console.log('isExpanded:', isExpanded);
    console.log('isMobile:', isMobile);
  }, [isExpanded, onMenuToggle, isMobile]);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const menuItems = [
    { id: 1, path: '/', title: 'INICIO', icon: '🏠' },
    { id: 2, path: '/conocenos', title: 'CONOCENOS', icon: '👥' },
    { id: 3, path: '/donaciones', title: 'DONACIONES', icon: '💰' },
    { id: 4, path: '/reseñas', title: 'RESEÑAS', icon: '⭐' },
    { id: 5, path: '/contacto', title: 'CONTACTO', icon: '📞' },
  ];

  const menuVariants = {
    expanded: {
      width: isMobile ? '100%' : '200px',
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
    collapsed: {
      width: isMobile ? '100%' : '60px',
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  return (
    <div className={`${styles['radio-menu']} ${isMobile ? styles.mobile : styles.desktop}`}>
      {!isMobile && (
        <button className={styles['menu-toggle']} onClick={toggleMenu}>
          {isExpanded ? '«' : '»'}
        </button>
      )}

      <motion.div
        className={`${styles['menu-container']} ${isExpanded ? styles.expanded : ''}`}
        initial="expanded"
        animate={isExpanded ? 'expanded' : 'collapsed'}
        variants={menuVariants}
        // style={{ background: 'blue' }} // Comentamos el estilo inline para probar los estilos del CSS
      >
        {menuItems.map((item) => (
          <div className={styles['menu-item-wrapper']} key={item.id}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? `${styles['menu-item']} ${styles.active}`
                  : styles['menu-item']
              }
            >
              <span className={styles['menu-icon']}>{item.icon}</span>
              {(isMobile || isExpanded) && (
                <span className={styles['menu-text']}>{item.title}</span>
              )}
            </NavLink>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default RadioMenu;