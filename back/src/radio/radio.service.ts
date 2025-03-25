import axios from "axios"
import { Readable } from "node:stream";

export const RadioService = {
    getUrlRadioLife: async (): Promise<Readable> => {
        try {
            const { data } = await axios("https://sonic.host-live.com/8006/stream" , {responseType: "stream"});
            return data;
        } catch (error) {
            const err: string = error instanceof Error ? error.message : 'Error desconocido.';
            throw new Error(`Hubo un error al pedir la información al stream. Error: ${err}.`);
        };
    }
};