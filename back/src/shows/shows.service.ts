/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import axios from "axios";
import { IProgramLite } from "./Shows.dto";

export const showsService = {
    getAllShows: async (): Promise<IProgramLite[]> => {
        try {
            const { data } = await axios('https://api.mixcloud.com/121expreso/cloudcasts/', {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Accept': 'application/json',
                },
            });
            if(!data['data'].length) throw new Error('Sin shows previos.');
            return data['data'].map((show: any) => ({name: show.name, url: show.url, image: show['pictures']['640wx640h'], duration: Number((show['audio_length'] / 3600).toFixed(2))}));
        } catch (error) {
            throw error;
        };
    }
}