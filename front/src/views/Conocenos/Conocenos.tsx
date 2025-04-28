import React from 'react';
import styles from './Conocenos.module.css';
import canto from '../../assets/images/charles.jpg.webp';
import audifonos from '../../assets/images/Fondo.webp';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';

const Conocenos: React.FC = () => {
  return (
    <div className={styles.containerConocenos}>
      <section className={styles.firstSection}>
        <div className={styles.column1}>
          <h5 className={styles.subtitle}>Sobre #121Expreso</h5>
          <h2 className={styles.title}>Clásicos que Nunca Dejan de Girar</h2>
        </div>

        <div className={styles.column2}>
          <img src={canto} alt="Foto de portada" className={styles.manSinging} />
        </div>
      </section>

      <section className={styles.secondSection}>
        <h3 className={styles.sectionTitle}>
          Donde nace #121Expreso?
        </h3>
        <p className={styles.sectionParagraph}>
          Allá lejos y hace tiempo. Necesidad de compartir música. Y divertirse. 100% autogestionado. Desde la idea, la preproducción, hasta salir al aire Y EN VIVO!. Crear una comunicación mediante la música. De ayudar, de ofrecer. De jugar. De eso se trata. Por eso no siempre #121Expreso está al aire. Después de todo, mejor calidad, antes que cantidad. 
        </p>
      </section>

      <section className={styles.thirdSection}>
        <div className={styles.column3}>
          <img src={audifonos} alt="Fondo del estudio" className={styles.girlHeadphones} />
        </div>

        <div className={styles.column4}>
          <h2 className={styles.listenTitle}>Escuchanos</h2>
          <h2 className={styles.whereTitle}>DONDE QUIERAS</h2>
          <p className={styles.listenParagraph}>
            Desde tu casa, desde tu dispositivo móvil, en el auto o en tu walkman (ja!)  #121Expreso está, siempre.
          </p>
        </div>
      </section>

      <section className={styles.cardSection}>
        <h2 className={styles.moreTitle}>MÁS</h2>
        <h2 className={styles.questionsTitle}>Preguntas?</h2>
        <Link to='/contacto'><button className={styles.contactButton}>CONTACTANOS</button></Link>
      </section>

      <div>
        <Footer/>
      </div>
    </div>
  );
};

export default Conocenos;