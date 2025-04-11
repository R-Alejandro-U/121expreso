/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import styles from './Reseñas.module.css';
import { ReviewCardProps } from '../../interfaces/IReviewProps';
import { reviews } from '../../data/reviews';
import Footer from '../../components/Footer/Footer';
// import { getAllComments, IReview } from '../../helpers/getAllComments';

const ReviewCard: React.FC<ReviewCardProps> = ({ text, author, date }) => (
  <div className={styles.reviewCard}>
    <p>{text}</p>
    <p className={styles.reviewAuthor}>{author}</p>
    <p className={styles.reviewDate}>{date}</p>
  </div>
);

const Reseñas: React.FC = () => {
  //const [reviews, setReviews] = useState<IReview[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [formData, setFormData] = useState({ username: '' });
  const [message, setMessage] = useState<string | null>(null);

  // Cargar los comentarios cuando el componente se monta
  // useEffect(() => {
  //   const fetchComments = async () => {
  //     try {
  //       const comments = await getAllComments(1, 10);
  //       setReviews(comments);
  //     } catch (err: unknown) { // Tipar explícitamente como unknown
  //       if (err instanceof Error) {
  //         setError(err.message || 'Error al cargar los comentarios');
  //       } else {
  //         setError('Error desconocido al cargar los comentarios');
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchComments();
  // }, []);

  // Manejar el envío de un nuevo comentario usando axios
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('Debes iniciar sesión para enviar un comentario.');
        return;
      }

      const response = await axios.post(
        '/api/comments',
        { comment: newComment },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            Accept: 'application/json',
          },
        }
      );

      setMessage(response.data.message);
      setNewComment('');
      //const updatedComments = await getAllComments(1, 10);
      //setReviews(updatedComments);
    } catch (error: unknown) { // Tipar explícitamente como unknown
      if (error instanceof AxiosError) {
        console.error('Error al enviar el comentario:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
        setMessage(error.response?.data?.message || 'Error al enviar el comentario');
      } else if (error instanceof Error) {
        console.error('Error general al enviar el comentario:', error.message);
        setMessage(error.message || 'Error al enviar el comentario');
      } else {
        console.error('Error desconocido:', error);
        setMessage('Error desconocido al enviar el comentario');
      }
    }
  };

  // if (loading) {
  //   return <div className={styles.containerReseñas}>Cargando reseñas...</div>;
  // }

  // if (error) {
  //   return <div className={styles.containerReseñas}>Error: {error}</div>;
  // }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.containerReseñas}>
      <section className={styles.formulario}>
        <div className={styles.cardForm}>
          <h2 className={styles.sectionTitle}>Dejá tu comentario</h2>
          <p className={styles.parrafoForm}>
          ¿Te gusta #121expreso o alguno de mis programas anteriores?  
          ¿querés dejar tú comentarío y ser parte de #121expreso como en los comentarios que vez abajo? (Sí son posta o... ¿no? pd: si no hay sé vos el primero.)
          </p>
          <form onSubmit={handleSubmitComment}>
          <input 
          type="text" 
          name="username" 
          value={formData.username} 
          onChange={handleChange} 
          placeholder='Ex: Raul Alvarez'
          className={styles.nameInput}
          />
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe tu reseña..."
              required
              className={styles.commentInput}
            />
            <button type="submit" className={styles.submitButton}>
              Enviar Comentario
            </button>
          </form>
          {message && <p className={styles.message}>{message}</p>}
        </div>
      </section>

      {/* <section className={styles.reviewsSection}>
        <h2 className={styles.sectionTitle}>
          RESEÑAS DE LOS OYENTES <br /> "LA MÚSICA NOS TRASLADA"
        </h2>
        <div className={styles.reviewsGrid}>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <ReviewCard
                key={index}
                text={review.text}
                author={review.author}
                date={review.date}
              />
            ))
          ) : (
            <p>No hay reseñas disponibles.</p>
          )}
        </div>
        <button className={styles.addCommentButton}>AGREGAR COMENTARIO</button>
      </section> */}

      <section className={styles.reviewsSection}>
        <div className={styles.reviewsGrid}>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <ReviewCard
                key={index}
                text={review.text}
                author={review.author}
                date={review.date}
              />
            ))
          ) : (
            <p>No hay reseñas disponibles.</p>
          )}
        </div>
        <button className={styles.addCommentButton}>AGREGAR COMENTARIO</button>
      </section>

      <div>
        <Footer/>
      </div>
    </div>
  );
};

export default Reseñas;