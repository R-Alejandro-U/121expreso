// src/pages/Home.tsx
import React from 'react';
import styles from './Home.module.css';
import backgroundVideo from '../../assets/videos/vinilo-video.mp4';
import logo from '../../assets/banner.svg';
import { shows } from '../../data/shows';
import { reviews } from '../../data/reviews';
import { ReviewCardProps } from '../../interfaces/IReviewProps';
import { ShowCardProps } from '../../interfaces/IShowProps';

const ShowCard: React.FC<ShowCardProps> = ({ title, duration, date, image, media }) => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error('Error al reproducir el audio:', error);
            setIsLoading(false);
          });
      }
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10; // Avanza 10 segundos
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10; // Retrocede 10 segundos
    }
  };

  const toggleVolume = () => {
    if (audioRef.current) {
      audioRef.current.volume = audioRef.current.volume > 0 ? 0 : 1; // Alterna entre mute y volumen completo
    }
  };

  const goHome = () => {
    // Aquí puedes agregar lógica para el botón "home", como redirigir a otra página
    console.log('Botón Home presionado');
  };

  return (
    <div className={styles.showCard}>
      <img src={image} alt={title} className={styles.showImage} />
      <audio ref={audioRef} className={styles.showAudio} style={{ display: 'none' }}>
        <source src={media} type="audio/mpeg" />
        Tu navegador no soporta el elemento de audio.
      </audio>
      <h3>{title}</h3>
      <p>{duration}</p>
      <p>{date}</p>
      <div className={styles.controls}>
        <button onClick={goHome} className={styles.controlButton} style={{ gridArea: 'home' }}>
          🏠
        </button>
        <button onClick={skipBackward} className={styles.controlButton} style={{ gridArea: 'backward' }}>
          ⏪
        </button>
        <button onClick={togglePlay} className={styles.playButton} disabled={isLoading} style={{ gridArea: 'play' }}>
          {isLoading ? 'Cargando...' : isPlaying ? '⏸' : '▶'}
        </button>
        <button onClick={skipForward} className={styles.controlButton} style={{ gridArea: 'forward' }}>
          ⏩
        </button>
        <button onClick={toggleVolume} className={styles.controlButton} style={{ gridArea: 'volume' }}>
          🔊
        </button>
      </div>
    </div>
  );
};

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
            <ShowCard
              key={index}
              title={show.title}
              duration={show.duration}
              date={show.date}
              image={show.image}
              media={show.media}
            />
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