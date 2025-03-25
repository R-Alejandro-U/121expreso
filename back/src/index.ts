import { PORT } from './configs/envs.config';
import server from './server';
import 'reflect-metadata';
server.listen(PORT, () =>
  console.log(`Server is listening in the port ${PORT}.`),
);
