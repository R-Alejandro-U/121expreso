/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Router } from "express";
import { promises as fs } from "fs";
import { join } from "path";

const routes: Router = Router();
const removeExtension = (file: string): string | undefined => file.split(".").shift();
const loadRoutes = async (): Promise<void> => {
    try {
        const files: string[] = await fs.readdir(__dirname);
        for(const file of files){
            if(file !== 'index.js' && file !== 'indes.ts'){
                const name: string = removeExtension(file) ?? "";
                const path = await import(join(__dirname, file));
                console.log(path);
                routes.use(`/${name}`, path.default)
            };
        };
    } catch (error) {
        throw new Error(`Lo lamentamos ocurrio un error al montar una ruta: ${error instanceof Error ? error.message : 'error desconocido.'}`);
    }
};
(async () => await loadRoutes());
export default routes;
