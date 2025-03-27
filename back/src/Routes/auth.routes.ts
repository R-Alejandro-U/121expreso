import { Router } from 'express';
import { Response, Request } from 'express';
import { authController } from '../Auth/auth.controller';
const router: Router = Router();
router.post('/signup', (req: Request, res: Response): Promise<void> => authController.register(req, res));
router.post('/signin', (req: Request, res: Response): Promise<void> => authController.login(req, res));
export default router;