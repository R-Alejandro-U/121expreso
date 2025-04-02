import { Router, Response, Request } from 'express';
import { isAdmin } from '../middlewares/role.middleware';
import { authorization } from '../middlewares/authorization.middleware';
import { commentController } from '../comments/comment.controller';
const router: Router = Router();
router.get('/', (req: Request, res: Response): Promise<void> => commentController.getAllComments(req, res));
router.post('/', authorization, (req: Request, res: Response): Promise<void> => commentController.newComment(req, res));
router.delete('/:id', authorization, isAdmin, (req: Request, res: Response): Promise<void> => commentController.deleteComment(req, res));
export default router;