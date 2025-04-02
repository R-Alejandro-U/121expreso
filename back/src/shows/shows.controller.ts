/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";
import { showsService } from "./shows.service";
import { IProgramLite } from "./Shows.dto";

export const showsController = {
    getAllShows: async (res: Response): Promise<void> => {
        try {
            const shows: IProgramLite[] = await showsService.getAllShows();
            res.status(200).json({shows});
        } catch (error: any) {
            res.status(404).json({error: 'Sin información', message: error['message'] ?? error})
        };
    },
}