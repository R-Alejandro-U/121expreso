import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors"
import routes from "./Routes/index.routes";
const server: Express = express();

server.use(morgan("dev"));
server.use(cors());
server.use(express.json());
server.use(routes);

export default server;