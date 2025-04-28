import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './RadioMenu.module.css';
import DiscodeVinilo from '../../assets/icons/disco-de-vinilo.svg';
import OndasdeRadio from '../../assets/icons/ondas-de-radio.svg';
import RockRoll from '../../assets/icons/rock-and-roll.svg';
import Corazon from '../../assets/icons/corazon.svg';
import Contacto from '../../assets/icons/audifonos-inalambricos.svg';

interface RadioMenuProps {
  onMenuToggle?: (expanded: boolean) => void;
}

const RadioMenu: React.FC<RadioMenuProps> = ({ onMenuToggle }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
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
  }, [isExpanded, onMenuToggle, isMobile]);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const menuItems = [
    { id: 1, path: '/', title: 'INICIO', icon: <img src={OndasdeRadio} alt='Inicio' /> },
    { id: 2, path: '/conocenos', title: 'CONOCENOS', icon: <img src={DiscodeVinilo} alt='Conocenos' /> },
    { id: 3, path: '/donaciones', title: 'DONACIONES', icon: <img src={Corazon} alt='Donaciones' /> },
    { id: 4, path: '/reseñas', title: 'RESEÑAS', icon: <img src={RockRoll} alt='Reseñas' /> },
    { id: 5, path: '/contacto', title: 'CONTACTO', icon: <img src={Contacto} alt='Contacto' /> },
  ];

  const menuVariants = {
    expanded: {
      width: isMobile ? '100%' : '264px',
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
    collapsed: {
      width: isMobile ? '100%' : '93px',
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 }, 
    visible: () => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        delay: 0.3, 
        ease: 'easeOut',
      },
    }),
  };

  return (
    <div className={`${styles['radio-menu']} ${isMobile ? styles.mobile : styles.desktop}`}>
      {!isMobile && (
        <button className={styles['menu-toggle']} onClick={toggleMenu}>
          {isExpanded ? '«' : '»'}
        </button>
      )}

      <div className={styles['separation']}>
        <motion.div
          className={`${styles['menu-container']} ${isExpanded ? styles.expanded : ''}`}
          initial="expanded"
          animate={isExpanded ? 'expanded' : 'collapsed'}
          variants={menuVariants}
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
                  <motion.span
                    className={styles['menu-text']}
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                  >
                    {item.title}
                  </motion.span>
                )}
              </NavLink>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RadioMenu;