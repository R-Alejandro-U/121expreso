import React from 'react';
import styles from '../Home/Home.module.css';
import backgroundVideo from '../../assets/videos/vinilo-video.mp4';
import logo from "../../assets/banner.svg"

const Home: React.FC = () => {
  return (
    <div className={styles['home-container']}>
      <video
        className={styles['background-video']}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={backgroundVideo} type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>
      <div className={styles.content}>
        <img src={logo} alt='Logo Home' className={styles['logo-home']}/>
        <p className={styles['parrafo-home']}>Tu estación de radio favorita</p>
      </div>
    </div>
  );
};

export default Home;