import axios, { AxiosError } from 'axios';

interface MixcloudShow {
  name: string;
  url: string;
  pictures: {
    '640wx640h': string;
  };
  audio_length: number;
}

interface MixcloudResponse {
  data: MixcloudShow[];
}

export interface IProgramLite {
  title: string;
  url: string;
  image: string;
  duration: string;
  date?: string;
}

const API_URL = 'https://api.mixcloud.com/121expreso/cloudcasts/';

export const getAllShows = async (): Promise<IProgramLite[]> => {
  try {
    const { data } = await axios.get<MixcloudResponse>(API_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        Accept: 'application/json',
      },
    });

    if (!data.data?.length) {
      throw new Error('No se encontraron shows previos.');
    }

    return data.data.map((show: MixcloudShow) => {
      if (!show.name || !show.url || !show.pictures?.['640wx640h'] || !show.audio_length) {
        throw new Error('Datos incompletos en uno de los shows.');
      }

      const durationInHours = show.audio_length / 3600;
      const formattedDuration = `${durationInHours.toFixed(1)} horas`;

      return {
        title: show.name,
        url: show.url,
        image: show.pictures['640wx640h'],
        duration: formattedDuration,
        date: 'Fecha no disponible',
      };
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Error al obtener los shows de Mixcloud:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      throw new Error(`Error al obtener los shows: ${error.message}`);
    } else if (error instanceof Error) {
      console.error('Error general al obtener los shows:', error.message);
      throw error;
    } else {
      console.error('Error desconocido:', error);
      throw new Error('Error desconocido al obtener los shows.');
    }
  }
};