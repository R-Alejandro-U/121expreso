// src/pages/Home.tsx
import React from 'react';
import styles from './Home.module.css';
import backgroundVideo from '../../assets/videos/vinilo-video.mp4';
import logo from '../../assets/banner.svg';
import { shows } from '../../data/shows';
import { reviews } from '../../data/reviews';
import { ReviewCardProps } from '../../interfaces/IReviewProps';
import { ShowCardProps } from '../../interfaces/IShowProps';



const ShowCard: React.FC<ShowCardProps> = ({ title, duration, image }) => (
  <div className={styles.showCard}>
    <img src={image} alt={title} className={styles.showImage} />
    <h3>{title}</h3>
    <p>{duration}</p>
    <button className={styles.playButton}>▶</button>
  </div>
);


const ReviewCard: React.FC<ReviewCardProps> = ({ text, author, date }) => (
  <div className={styles.reviewCard}>
    <p>{text}</p>
    <p className={styles.reviewAuthor}>{author}</p>
    <p className={styles.reviewDate}>{date}</p>
  </div>
);

const Home: React.FC = () => {

  return (
    <div className={styles.homeContainer}>
      <video className={styles.backgroundVideo} autoPlay loop muted playsInline>
        <source src={backgroundVideo} type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>
      <div className={styles.header}>
        <img src={logo} alt="Logo Home" className={styles.logoHome} />
        <p className={styles.subtitle}>la música es ese lugar donde quieres estar</p>
      </div>
      <div className={styles.content}>
        <div className={styles.card}>
          <h1 className={styles.bannerTitle}>#121 EXPRESO</h1>
          <p className={styles.parrafoHome}>
            Hola, ¿te apasiona la música como a mí? Lo es, es una pregunta tonta, pero una pregunta tonta, ¿obvio sí un mundo música como es mente? Lo es una pregunta tonta, ¿quieres aprovechar esta aventura musical? Yo digo que no, gracias, quiero poderme escuchar mejor lo mejor de estos clásicos que bailaban nuestras vidas para limpiar hasta esas joyas escondidas que te hacen sentir como Chayly a través de la pista desde un balcón, pero no con auriculares.
          </p>

          <p className={styles.secondParrafoHome}>
          ¿Quieres apoyarme o ponerte en contacto conmigo para esta aventura musical?
          </p>

          <button className={styles.contactButton}>CONTÁCTAME</button>
        </div>
      </div>
      <section className={styles.oldShowsSection}>
        <h2 className={styles.sectionTitle}>OLD SHOWS PROGRAMAS ANTERIORES</h2>
        <div className={styles.showsGrid}>
          {shows.map((show, index) => (
            <ShowCard key={index} title={show.title} duration={show.duration} image={show.image} />
          ))}
        </div>
        <button className={styles.viewAllButton}>VER TODOS</button>
      </section>
      <section className={styles.reviewsSection}>
        <h2 className={styles.sectionTitle}>RESEÑAS DE LOS OYENTES "LA MÚSICA NOS TRASLADA"</h2>
        <div className={styles.reviewsGrid}>
          {reviews.map((review, index) => (
            <ReviewCard key={index} text={review.text} author={review.author} date={review.date} />
          ))}
        </div>
        <button className={styles.addCommentButton}>AGREGAR COMENTARIO</button>
      </section>
    </div>
  );
};

export default Home;