import React from 'react';
import styles from './Donaciones.module.css';
import etiqueta from '../../assets/images/etiqueta-vintage.svg';
import ticket from '../../assets/images/ticketY.svg';
import Footer from '../../components/Footer/Footer';

const Donaciones: React.FC = () => {
  // Función para redirigir al enlace de Cafecito
  const handleDonate = () => {
    window.open('https://cafecito.app/121expreso', '_blank');
  };

  return (
    <div className={styles.donacionesContainer}>
      {/* Título principal */}
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>
          Invitale un cafecito a <span className={styles.highlight}>#121expreso</span>
        </h2>
      </div>

      {/* Sección central: Imagen y texto */}
      <div className={styles.secondSection}>
        <div className={styles.imageContainer}>
          <img src={etiqueta} alt="Etiqueta vinilo" className={styles.etiquetaImage} />
        </div>

        <div className={styles.secondTitle}>
          <h4 className={styles.cafecito}>Invitame un Cafecito ☕</h4>
        </div>
      </div>

      {/* Ticket */}
      <div className={styles.containerTicket}>
        <img src={ticket} alt="Ticket amarillo" className={styles.ticketImage} />
        <div className={styles.ticketText}>
        </div>
      </div>

      {/* Botón */}
      <div className={styles.buttonDonaciones}>
        <button className={styles.buttonDonar} onClick={handleDonate}>
          DONAR AHORA
        </button>
      </div>

      <div>
        <Footer/>
      </div>
    </div>
  );
};

export default Donaciones;