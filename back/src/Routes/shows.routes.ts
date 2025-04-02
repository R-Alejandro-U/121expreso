import { Router, Response, Request } from "express";
import { showsController } from "../shows/shows.controller";

const router: Router = Router();

router.get('/', (_req: Request, res: Response) => showsController.getAllShows(res));

export default router;