import React from 'react'
import styles from './styles/Reseñas.module.css'
import { IReviewsFormProps } from './Reviews.interface'

export const ReviewsForm: React.FC<IReviewsFormProps> = ({data , setNewComment, handleSubmitComment, message}) => {
    return (
        <div>
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
                            name="data"
                            value={data}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Escribe tu reseña..."
                            className={styles.commentInput}
                            />
                            <button type="submit" className={styles.submitButton}>
                            Enviar Comentario
                            </button>
                        </form>
                        {message && <p className={styles.message}>{message}</p>}
                    </div>
                </section>
            </div>
        </div>
    );
};