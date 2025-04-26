import { data } from '../../interfaces/IReviewProps';
import styles from '../Forms/comments/styles/Reseñas.module.css';

export const ReviewCard: React.FC<data> = ({data: { comment, CreateComment, user }}) => (
  <div className={styles.reviewCard}>
    <p>{comment}</p>
    <p className={styles.reviewAuthor}>{user}</p>
    <p className={styles.reviewDate}>{CreateComment.toISOString().split('T')[0]}</p>
  </div>
);