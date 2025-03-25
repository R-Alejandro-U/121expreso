import axios from 'axios';
import { Readable } from 'node:stream';
import { CONECTION_STREAM } from '../configs/envs.config';

export const RadioService = {
  getUrlRadioLife: async (): Promise<Readable> => {
    try {
      if (!CONECTION_STREAM)
        throw new Error('Falta la url de conexión para el stream.');
      const { data } = await axios(CONECTION_STREAM, {
        responseType: 'stream',
      });
      return data;
    } catch (error) {
      const err: string =
        error instanceof Error ? error.message : 'Error desconocido.';
      throw new Error(
        `Hubo un error al pedir la información al stream. Error: ${err}`,
      );
    }
  },
};
