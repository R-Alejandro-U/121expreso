import React, { useContext, useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import { ReviewsForm } from "../../components/Forms/comments/Reviews";
import Swal from "sweetalert2";
import { SubmitComment } from "../../components/Forms/comments/handler/handleSubmitComment";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { CommentsContex } from "../../context/CommentContex";

export const Reviews: React.FC = () => {
  const [newComment, setNewComment] = useState<string>('');
  const [errors, setErrors] = useState<string>('');
  const navigate: NavigateFunction = useNavigate();
  const { postReview } = useContext(CommentsContex);
  useEffect(() => {
    setErrors(
      newComment.length ? 
        newComment.length < 4 
          ? '¡Tu comentario debe tener 4 caracteres o más!'
          : ''      
      : 'Por favor, llene el formularío.'
    );
  }, [newComment])
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
      <ReviewsForm data={newComment} setNewComment={setNewComment} handleSubmitComment={handleSubmitComment} message={errors}/>
      <div>
        <Footer />
      </div>
    </div>
  );
}