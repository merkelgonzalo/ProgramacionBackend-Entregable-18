import { Router } from 'express';
import passport from 'passport';
import { changeRoleController, getUsersController } from '../controllers/users.controller.js';
import { autorization } from '../middlewares/autorization.js';

const router = Router();

router.put('/premium/:uid', /*autorization,*/ changeRoleController);

router.get('/', /*autorization,*/ getUsersController);

export default router;