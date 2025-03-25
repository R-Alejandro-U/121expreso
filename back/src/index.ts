import { typeorm } from './configs/database.config';
import { PORT } from './configs/envs.config';
import server from './server';
import 'reflect-metadata';

typeorm.initialize()
  .then((): void => {
    console.log('connection sucessfull.');
    server.listen(PORT, () =>
      console.log(`Server is listening in the port ${PORT}.`),
    );
  })
  .catch((err): void => {
    throw new Error(
      `Error connecting to the database: ${err['message'] ?? err}`,
    );
  })
  .finally((): void => {
    console.log('The server is on.');
  });
