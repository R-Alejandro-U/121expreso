import { ReviewCardProps } from "../../interfaces/IReviewProps";
import styles from './Reseñas.module.css';

export const ReviewCard: React.FC<ReviewCardProps> = ({ text, author, date }) => (
  <div className={styles.reviewCard}>
    <p>{text}</p>
    <p className={styles.reviewAuthor}>{author}</p>
    <p className={styles.reviewDate}>{date}</p>
  </div>
);