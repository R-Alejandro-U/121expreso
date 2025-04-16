import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Home.module.css';
import backgroundVideo from '../../assets/videos/vinilo-video.mp4';
import logo from '../../assets/banner.svg';
import { reviews } from '../../data/reviews';
import { ReviewCardProps } from '../../interfaces/IReviewProps';
import { ShowCardProps } from '../../interfaces/IShowProps';
import { getAllShows, IProgramLite } from '../../helpers/getRadio';
import Footer from '../../components/Footer/Footer';

const ShowCard: React.FC<ShowCardProps> = ({ title, duration, image, url }) => {
  return (
    <div className={styles.showCard}>
      <img
        src={image}
        alt={title}
        className={styles.showImage}
        onError={(e) => (e.currentTarget.src = '/path/to/fallback-image.jpg')}
      />
      <h3>{title}</h3>
      <p>{duration}</p>
      <a href={url} target="_blank" rel="noopener noreferrer" className={styles.listenButton}>
        Escuchar en Mixcloud
      </a>
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
  const [shows, setShows] = useState<IProgramLite[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        setLoading(true);
        const fetchedShows = await getAllShows();
        setShows(fetchedShows);
      } catch (err) {
        setError('No se pudieron cargar los shows. Intenta de nuevo más tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  const settings = {
    dots: true,
    infinite: shows.length > 1,
    speed: 500,
    slidesToShow: Math.min(shows.length, 3),
    slidesToScroll: 1,
    autoplay: shows.length > 1,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.homeContainer}>
      <video className={styles.backgroundVideo} autoPlay loop muted playsInline>
        <source src={backgroundVideo} type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>
      <div className={styles.header}>
        <img src={logo} alt="Logo Home" className={styles.logoHome} />
        <p className={styles.subtitle}>la música es ese lugar en donde querés estar</p>
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

      <section className={styles.oldShowsCassete}>
        <h2 className={styles.cassetteTitle}>OLD SHOWS</h2>
      </section>

      <section className={styles.oldShowsSection}>
        <h2 className={styles.sectionTitle}>PROGRAMAS ANTERIORES</h2>
        {loading ? (
          <p>Cargando shows...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Slider {...settings} className={styles.showsGrid}>
            {shows.map((show, index) => (
              <ShowCard
                key={index}
                title={show.title}
                duration={show.duration}
                date={show.date || 'Fecha no disponible'}
                image={show.image}
                url={show.url}
              />
            ))}
          </Slider>
        )}
        <a href="https://www.mixcloud.com/121expreso/"><button className={styles.viewAllButton}>VER TODOS</button></a>
      </section>

      <section className={styles.reviewsSection}>
        <h2 className={styles.sectionTitle}>RESEÑAS DE LOS OYENTES <br /> "LA MÚSICA NOS TRASLADA"</h2>
        <div className={styles.reviewsGrid}>
          {reviews.map((review, index) => (
            <ReviewCard key={index} text={review.text} author={review.author} date={review.date} />
          ))}
        </div>
        <button className={styles.addCommentButton}>AGREGAR COMENTARIO</button>
      </section>

      <div>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;