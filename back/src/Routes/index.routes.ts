// import { Router } from 'express';
// import { promises as fs } from 'fs';
// import { join } from 'path';
// import { authorization } from '../middlewares/authorization.middleware';

// const routes: Router = Router();
// const removeExtension = (file: string): string =>
//   file.split('.').shift() ?? '';
// const loadRoutes = async (): Promise<void> => {
//   console.log('Estoy afuera de la  función');
//   try {
//     console.log('no obtuve los archivos')
//     const files: string[] = await fs.readdir(__dirname);
//     console.log('obtuve los archivos', files)
//     for (const file of files) {
//       if (file !== 'index.routes.js' && file !== 'index.routes.ts') {
//         try {
//           console.log('estoy en la ruta', file);
//           const name: string = removeExtension(file);
//           const path = await import(join(__dirname, file));
//           if(name === 'users') {
//             routes.use(`/${name}`, authorization, path.default) 
//             continue;
//           };
//           routes.use(`/${name}`, path.default);
//           console.log('se cargo la ruta', file);
//         } catch (err) {
//           const error: string = err instanceof Error ? err.message : 'Error desconocido';
//           throw new Error(`Error al montar una ruta. Error: ${error}`);
//         };
//       };
//     };
//   } catch (error) {
//     throw new Error(
//       `Lo lamentamos ocurrio un error al montar una ruta: ${error instanceof Error ? error.message : 'error desconocido.'}`,
//     );
//   };
// };
// (async () => await loadRoutes())();
// export default routes;


import { Router } from 'express';
import { promises as fs } from 'fs';
import { join } from 'path';
import { authorization } from '../middlewares/authorization.middleware';

const routes: Router = Router();
const removeExtension = (file: string): string => file.split('.').shift() ?? '';
const loadRoutes = async (): Promise<void> => {
  console.log('hola desde la carga de rutas');
  
  const routesDir: string = process.env['NODE_ENV'] === 'production' ? join(__dirname) : __dirname;
  try {
    const files: string[] = await fs.readdir(routesDir);
    console.log(files);
    for (const file of files) {
      const validExtension: boolean = process.env['NODE_ENV']  === 'production' ? file.endsWith('.js') : file.endsWith('.ts');
      if (
        validExtension &&
        !file.includes('index.') &&
        !file.endsWith('.js.map') &&
        file.includes('.routes.')
      ) {
        try {
          console.log(file);
          
          const name: string = removeExtension(file);
          console.log(name);
          const filePath: string = join(routesDir, file);
          const path = await import(filePath);
          console.log(name);
          
          if (!path.default) {
            console.warn(`No default export found in ${file}`);
            continue;
          }
          if (name === 'users') {
            routes.use(`/${name}`, authorization, path.default);
          } else {
            routes.use(`/${name}`, path.default);
          };
        } catch (err) {
          const error: string = err instanceof Error ? err.message : 'Unknown error';
          throw new Error(`Error mounting route ${file}: ${error}`);
        };
      }; 
    }
    if (files.length === 0) {
      console.warn('No route files found in Routes directory');
    };
  } catch (error) {
    const errorMsg: string = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Error loading routes: ${errorMsg}`);
  };
};

(async (): Promise<void> => {
  try {
    console.log('helloda')
    await loadRoutes();
  } catch (error) {
    console.error('Failed to initialize routes:', error);
    process.exit(1);
  };
})();

export default routes;