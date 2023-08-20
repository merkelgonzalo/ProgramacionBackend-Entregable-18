import {Router} from 'express';
import { getCartController, getProductsController, registerController, loginController, forgotPasswordController, resetPasswordController } from '../controllers/views.controller.js';
import { autorization } from '../middlewares/autorization.js';
import { addLogger } from '../utils/logger.js';

const router = Router();

router.get('/', addLogger, getProductsController);

// router.get('/realTimeProducts', async (req, res) => { 
//     const products = await productModel.find().lean();
//     res.render('realTimeProducts', {products: products});
// });

router.get('/carts/:cid', addLogger, getCartController);

router.get('/register', addLogger, registerController);

router.get('/login', addLogger, loginController);

router.get('/forgot-password', addLogger, forgotPasswordController);

router.get("/reset-password", addLogger, addLogger, resetPasswordController);

export default router;