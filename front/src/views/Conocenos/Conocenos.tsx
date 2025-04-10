import React from 'react';
import styles from './Conocenos.module.css';
import canto from '../../assets/images/hombre-cantando.svg';
import audifonos from '../../assets/images/niña-audifonos.svg';
import Footer from '../../components/Footer/Footer';

const Conocenos: React.FC = () => {
  return (
    <div className={styles.containerConocenos}>
      <section className={styles.firstSection}>
        <div className={styles.column1}>
          <h5 className={styles.subtitle}>Sobre #121Expreso</h5>
          <h2 className={styles.title}>Clásicos que Nunca Dejan de Girar</h2>
        </div>

        <div className={styles.column2}>
          <img src={canto} alt="Hombre Cantando" className={styles.manSinging} />
        </div>
      </section>

      <section className={styles.secondSection}>
        <h3 className={styles.sectionTitle}>
          #121Expreso te transporta a la era dorada del rock clásico, justo cuando lo deseas, y te conecta con un universo de música que nunca pasa de moda.
        </h3>
        <p className={styles.sectionParagraph}>
          Reunimos la energía del rock clásico en un solo lugar: los mejores éxitos de leyendas como Led Zeppelin, The Rolling Stones y Pink Floyd, transmisiones en vivo que te hacen sentir en primera fila, y programas especiales que celebran la historia del género. Somos apasionados del rock, trabajando para los fans del rock, siempre buscando ofrecer la mejor experiencia auditiva para quienes viven y respiran los clásicos. Con 121 Expresso, no solo escuchas música, ¡vives el espíritu del rock clásico en cada nota! 🤘
        </p>
      </section>

      <section className={styles.thirdSection}>
        <div className={styles.column3}>
          <img src={audifonos} alt="Niña con Audífonos" className={styles.girlHeadphones} />
        </div>

        <div className={styles.column4}>
          <h2 className={styles.listenTitle}>Escuchanos</h2>
          <h2 className={styles.whereTitle}>DONDE QUIERAS</h2>
          <p className={styles.listenParagraph}>
            En el auto, en movimiento, en casa o en la oficina, también en tu Amazon Alexa. Estamos donde querés escuchar.
          </p>
        </div>
      </section>

      <section className={styles.cardSection}>
        <h2 className={styles.moreTitle}>MÁS</h2>
        <h2 className={styles.questionsTitle}>Preguntas?</h2>
        <button className={styles.contactButton}>CONTACTANOS</button>
      </section>

      <div>
        <Footer/>
      </div>
    </div>
  );
};

export default Conocenos;