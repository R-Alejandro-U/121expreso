import React, { useContext, useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import { ReviewsForm } from "../../components/Forms/comments/Reviews";
import Swal from "sweetalert2";
import { SubmitComment } from "../../components/Forms/comments/handler/handleSubmitComment";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { CommentsContext } from "../../context/CommentContex";
import { ReviewCard } from "../../components/Comment/reviewCard";
import { GetComments } from "../../context/interface/Comment.interface";
import styles from '../../components/Forms/comments/styles/Reseñas.module.css'

export const Reviews: React.FC = () => {
  const [newComment, setNewComment] = useState<string>('');
  const [errors, setErrors] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const navigate: NavigateFunction = useNavigate();
  const { postReview, getComments, reviews } = useContext(CommentsContext);
  useEffect(() => {
    setErrors(
      newComment.length ? 
        newComment.length < 4 
          ? '¡Tu comentario debe tener 4 caracteres o más!'
          : ''      
      : 'Por favor, llene el formularío.'
    );
  }, [newComment])
  useEffect(() => {
    getComments().finally(() => setLoading(false));
  }, [getComments])
  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      if(errors.length) throw new Error(errors);
      await SubmitComment(e, navigate, newComment, postReview);
      return;
    } catch (error) {
      Swal.fire({
        title: `${error}`,
        width: 600,
        padding: "3em",
        color: "#fff",
        background: `url("https://mir-s3-cdn-cf.behance.net/project_modules/hd/5c9e06114084301.6034c329b0e28.gif") no-repeat center center`,
      });
      return;
    };
  };
  return (
    <div>
      <main>
        <ReviewsForm data={newComment} setNewComment={setNewComment} handleSubmitComment={handleSubmitComment} message={errors}/>
      </main>
      <section className={styles.reviewsGrid}>
        {loading ? <p>Cargando reseñas</p> : !reviews?.length ? <p>No hay reseñas, eso es triste. ¿No quieres ser el primero en dejar tu huella?</p> : reviews.map((comment: GetComments) => <ReviewCard key={comment.id} data={comment}/>)}
      </section>
      <div>
        <Footer />
      </div>
    </div>
  );
}