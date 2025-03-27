import { Router } from 'express';
import { Response, Request } from 'express';
import { userController } from '../users/user.controller';
const router: Router = Router();
router.get('/', (req: Request, res: Response): Promise<void> => userController.getAllUsers(req, res));
router.get('/search', (req: Request, res: Response): Promise<void> => userController.getUserByName(req, res));
router.get('/:id', (req: Request, res: Response): Promise<void> => userController.getUserById(req, res));
router.delete('/delete-account/:id', (req: Request, res: Response): Promise<void> => userController.deleteUser(req, res));
export default router;