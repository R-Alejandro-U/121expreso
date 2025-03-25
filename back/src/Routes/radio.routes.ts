import { Router } from "express";
import { Response, Request } from "express";
import { radioController } from "../radio/radio.controller";
const router: Router = Router();
router.get('/', (_req: Request, res: Response): Promise<void> => radioController.getUrlRadioLife(res));
export default router;