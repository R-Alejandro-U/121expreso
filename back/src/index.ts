import { typeorm } from './configs/database.config';
import { PORT } from './configs/envs.config';
import { Seeder } from './Seeder/Seeder';
import server from './server';
import 'reflect-metadata';

typeorm.initialize()
.then(() => Seeder() 
  .then((): void => {
    console.log('connection sucessfull.');
    server.listen(PORT, () =>
      console.log(`Server is listening in the port ${PORT}.`),
    );
  }).catch((err) => {
    console.error(err);
    throw new Error(`Seeder faild ${err['message'] ?? err}`);
  })
).catch((err): void => {
  console.log(err);
  throw new Error(
    `Error connecting to the database: ${err['message'] ?? err}`,
  );
});
  
  
