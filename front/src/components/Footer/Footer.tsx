import React from 'react';
import styles from './Footer.module.css';
import logo from '../../assets/banner.svg';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { FaGooglePlay, FaXTwitter } from 'react-icons/fa6';

const Footer: React.FC = () => {
  return (
    <footer className={styles.containerFooter}>
      <div className={styles.firstColumn}>
        <h2 className={styles.titleColumnOne}>#121expreso</h2>
        <p className={styles.paragraphColumnOne}>
          Sabemos lo difícil que es un domingo, el fin de esa pequeña libertad, ese pequeño momento cuando todo termina y volvemos a la rutina. Estoy aquí para levantar los ánimos de ese domingo tan domingo; mi intención es ayudar en esos momentos porque la música es ese lugar donde querés estar.
        </p>
        <img src={logo} alt="Logo First Column" className={styles.logo} />
      </div>
      <div className={styles.line}></div>
      <div className={styles.secondColumn}>
        <h2 className={styles.titleColumnTwo}>Contacta con nosotros</h2>
        <div className={styles.socialLogo}>
          <a href="https://wa.me/+54 9 11 5259-7989" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
            <FaWhatsapp />
          </a>
          <a href="https://instagram.com/121expreso" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
            <FaInstagram />
          </a>
          <a href="https://x.com/121expreso" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
            <FaXTwitter />
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.zodiaclogic.Expreso" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
            <FaGooglePlay />
          </a>
        </div>
        <div className={styles.credits}>
          <h3 className={styles.titleColumnThree}>Créditos</h3>
          <p className={styles.paragraphColumnTwo}>
            ¿Sueñas con tener una página web profesional como esta? ¡Contáctanos hoy mismo y convierte tu idea en realidad con un proyecto a tu medida!<br/>Diseño y creación de la web por{' '}
            <a href="mailto:mfernandezpolanco@gmail.com" className={styles.creditLink}>
              María Ignacia
            </a>{' '}
            y{' '}
            <a href="mailto:alejandro.urdaneta2314@gmail.com" className={styles.creditLink}>
              Alejandro Urdaneta
            </a>.
          </p>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>© #121Expreso. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;