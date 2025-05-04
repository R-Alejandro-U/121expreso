import { Router } from 'express';
import { promises as fs } from 'fs';
import { join } from 'path';
import { authorization } from '../middlewares/authorization.middleware';

const routes: Router = Router();
const removeExtension = (file: string): string =>
  file.split('.').shift() ?? '';
const loadRoutes = async (): Promise<void> => {
  console.log('Estoy afuera de la  función');
  try {
    console.log('no obtuve los archivos')
    const files: string[] = await fs.readdir(__dirname);
    console.log('obtuve los archivos', files)
    for (const file of files) {
      if (file !== 'index.routes.js' && file !== 'index.routes.ts') {
        try {
          console.log('estoy en la ruta', file);
          const name: string = removeExtension(file);
          const path = await import(join(__dirname, file));
          if(name === 'users') {
            routes.use(`/${name}`, authorization, path.default) 
            continue;
          };
          routes.use(`/${name}`, path.default);
          console.log('se cargo la ruta', file);
        } catch (err) {
          const error: string = err instanceof Error ? err.message : 'Error desconocido';
          throw new Error(`Error al montar una ruta. Error: ${error}`);
        };
      };
    };
  } catch (error) {
    throw new Error(
      `Lo lamentamos ocurrio un error al montar una ruta: ${error instanceof Error ? error.message : 'error desconocido.'}`,
    );
  };
};
(async () => await loadRoutes())();
export default routes;
