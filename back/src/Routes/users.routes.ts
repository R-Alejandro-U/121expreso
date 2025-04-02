import { Response, Request, Router } from 'express';
import { userController } from '../users/user.controller';
import { isAdmin } from '../middlewares/role.middleware';
const router: Router = Router();
router.get('/', isAdmin, (req: Request, res: Response): Promise<void> => userController.getAllUsers(req, res));
router.get('/search', isAdmin, (req: Request, res: Response): Promise<void> => userController.getUserByName(req, res));
router.get('/:id', isAdmin, (req: Request, res: Response): Promise<void> => userController.getUserById(req, res));
router.delete('/:id', (req: Request, res: Response): Promise<void> => userController.deleteUser(req, res));
export default router;