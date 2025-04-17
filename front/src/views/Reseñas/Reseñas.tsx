import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import styles from './Reseñas.module.css';
import { ReviewCardProps } from '../../interfaces/IReviewProps';
import { getAllComments, IReview } from '../../helpers/getAllComments';
import Footer from '../../components/Footer/Footer';

const ReviewCard: React.FC<ReviewCardProps> = ({ text, author, date }) => (
  <div className={styles.reviewCard}>
    <p>{text}</p>
    <p className={styles.reviewAuthor}>{author}</p>
    <p className={styles.reviewDate}>{date}</p>
  </div>
);

const Reseñas: React.FC = () => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const comments = await getAllComments(1, 10);
        setReviews(comments);
        setLoading(false);
      } catch (err: unknown) {
        setLoading(false);
        if (err instanceof Error) {
          setError(err.message || 'Error al cargar los comentarios');
        } else {
          setError('Error desconocido al cargar los comentarios');
        }
      }
    };

    fetchComments();
  }, []);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.length < 4 || newComment.length > 500) {
      setMessage('El comentario debe tener entre 4 y 500 caracteres.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('Debes iniciar sesión para enviar un comentario.');
        return;
      }

      const response = await axios.post(
        'https://one21expreso.onrender.com/comment',
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

      // Actualizar la lista de comentarios
      const updatedComments = await getAllComments(1, 10);
      setReviews(updatedComments);
    } catch (error: unknown) {
      console.log(error)
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

  return (
    <div className={styles.containerReseñas}>
      <section className={styles.formulario}>
        <div className={styles.cardForm}>
          <h2 className={styles.sectionTitle}>Dejá tu comentario</h2>
          <p className={styles.parrafoForm}>
            ¿Te gusta #121expreso o alguno de mis programas anteriores?  
            ¿querés dejar tú comentarío y ser parte de #121expreso como en los comentarios que vez abajo? (Sí son posta o... ¿no? pd: si no hay sé vos el primero.)
          </p>
          <form onSubmit={handleSubmitComment} className={styles.formReseñas}>
            <textarea
              name="comment"
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
        <button
          className={styles.addCommentButton}
          onClick={() => document.querySelector(`.${styles.formulario}`)?.scrollIntoView({ behavior: 'smooth' })}
        >
          AGREGAR COMENTARIO
        </button>
      </section>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Reseñas;