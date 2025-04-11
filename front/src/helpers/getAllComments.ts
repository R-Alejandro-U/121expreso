import axios, { AxiosError } from 'axios';

// Definir la interfaz para un comentario devuelto por el backend
interface CommentDTO {
  id: string;
  comment: string;
  user: string;
}

// Definir la interfaz para la respuesta del backend
interface GetCommentsResponse {
  comments: CommentDTO[];
  pagination_info: {
    current_items: number;
    max_pages: number;
    page: number;
    total_items: number;
  };
}

// Definir la interfaz para los datos que usará el componente ReviewCard
export interface IReview {
  text: string;
  author: string;
  date: string;
}

const API_URL = 'http://localhost:5173/reseñas';

export const getAllComments = async (page: number = 1, limit: number = 10): Promise<IReview[]> => {
  try {
    console.log('Solicitando comentarios desde el backend...');
    console.log(`URL completa: ${API_URL}?page=${page}&limit=${limit}`);

    const { data } = await axios.get<GetCommentsResponse>(`${API_URL}`, {
      params: {
        page,
        limit,
      },
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        Accept: 'application/json',
      },
    });

    if (!data.comments?.length) {
      throw new Error('No se encontraron comentarios.');
    }

    return data.comments.map((comment: CommentDTO) => {
      if (!comment.comment || !comment.user) {
        throw new Error('Datos incompletos en uno de los comentarios.');
      }

      return {
        text: comment.comment,
        author: comment.user,
        date: 'Fecha no disponible',
      };
    });
  } catch (error: unknown) { // Tipar explícitamente como unknown
    if (error instanceof AxiosError) {
      console.error('Error al obtener los comentarios:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      throw new Error(`Error al obtener los comentarios: ${error.message}`);
    } else if (error instanceof Error) {
      console.error('Error general al obtener los comentarios:', error.message);
      throw error;
    } else {
      console.error('Error desconocido:', error);
      throw new Error('Error desconocido al obtener los comentarios.');
    }
  }
};