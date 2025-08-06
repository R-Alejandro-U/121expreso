import server from './server';
import 'reflect-metadata';
import 'dotenv/config'
const PORT: number | undefined = process.env['PORT'] ? +process.env['PORT'] : 0;
server.listen(PORT, () =>
  console.log(`Server is listening in the port ${PORT}.`),
);
  
  
