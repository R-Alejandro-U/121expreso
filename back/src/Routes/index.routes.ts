import { Router } from 'express';
import { promises as fs } from 'fs';
import { join } from 'path';
import { authorization } from '../middlewares/authorization.middleware';

const routes: Router = Router();

const removeExtension = (file: string): string => file.split('.').shift() ?? '';

const loadRoutes = async (): Promise<void> => {
  console.log('Cargando rutas...');
  
  const routesDir: string = process.env['NODE_ENV'] === 'production' ? join(__dirname) : __dirname;
  console.log('Directorio de rutas:', routesDir);

  try {
    const files: string[] = await fs.readdir(routesDir);
    console.log('Archivos encontrados:', files);

    if (files.length === 0) {
      console.warn('No se encontraron archivos de rutas en el directorio');
      return;
    }

    for (const file of files) {
      const validExtension: boolean = process.env['NODE_ENV'] === 'production' ? file.endsWith('.js') : file.endsWith('.ts');
      if (
        validExtension &&
        !file.includes('index.') &&
        !file.endsWith('.js.map') &&
        file.includes('.routes.')
      ) {
        try {
          console.log('Procesando archivo:', file);
          const name: string = removeExtension(file);
          console.log('Nombre de la ruta:', name);
          const filePath: string = join(routesDir, file);
          console.log('Ruta del archivo:', filePath);

          const path = await import(filePath);
          if (!path.default) {
            console.warn(`No se encontró exportación por defecto en ${file}`);
            continue;
          }

          if (name === 'users') {
            console.log(`Montando ruta /${name} con middleware de autorización`);
            routes.use(`/${name}`, authorization, path.default);
          } else {
            console.log(`Montando ruta /${name}`);
            routes.use(`/${name}`, path.default);
          }
        } catch (err) {
          const error: string = err instanceof Error ? err.message : 'Error desconocido';
          console.error(`Error al montar la ruta ${file}: ${error}`);
        }
      }
    }
  } catch (error) {
    const errorMsg: string = error instanceof Error ? error.message : 'Error desconocido';
    console.error(`Error al cargar rutas: ${errorMsg}`);
    throw new Error(`Error al cargar rutas: ${errorMsg}`);
  }
};

(async (): Promise<void> => {
  try {
    console.log('Inicializando rutas...');
    await loadRoutes();
  } catch (error) {
    console.error('Fallo al inicializar rutas:', error);
    process.exit(1);
  }
})();

export default routes;