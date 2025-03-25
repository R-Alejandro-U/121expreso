import { Response } from "express";
import { RadioService } from "./radio.service";
import { Readable } from "node:stream";
export const radioController = {
    getUrlRadioLife: async (res: Response): Promise<void> => {
        try {
            const data: Readable = await RadioService.getUrlRadioLife();
            res.setHeader("Content-Type", "audio/mpeg");
            data.pipe(res);
        } catch (error) {
            const err = error instanceof Error ? error.message : "Error desconocido";
            res.status(500).send(`Error al procesar el stream: ${err}`);
        };
    }
}