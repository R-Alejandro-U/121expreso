/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from 'axios';

export interface IReview {
  text: string;
  author: string;
  date: string;
}

export const getAllComments = async (page: number, limit: number): Promise<IReview[]> => {
  try {
    const response = await axios.get(`/comment?page=${page}&limit=${limit}`);
    const { comments } = response.data.data;
    return comments.map((comment: any) => ({
      text: comment.comment,
      author: comment.user,
      date: comment.UpDateComment || new Date().toISOString(),
    }));
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response?.status === 404 &&
      error.response?.data?.message === 'Sin comentarios en la base de datos.'
    ) {
      // Tratar el 404 como un caso de datos vacíos
      return [];
    }
    console.error('Error al obtener los comentarios:', error);
    throw error;
  }
};