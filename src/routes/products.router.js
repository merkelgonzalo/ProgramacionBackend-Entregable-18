import { Router } from 'express';
import { getProductsController, getProductController, createProductController, updateProductController, deleteProductController } from "../controllers/products.controller.js";
import { autorization } from '../middlewares/autorization.js';
import { addLogger } from '../utils/logger.js';

const router = Router();

router.get('/', addLogger, getProductsController);

router.get('/:pid', addLogger, getProductController);

//DESCOMENTAR PARA AUTORIZACION ADMIN

router.post('/', /*autorization,*/ addLogger, createProductController);

router.put('/:pid', /*autorization,*/ addLogger, updateProductController);

router.delete('/:pid', /*autorization,*/ addLogger, deleteProductController);

export default router;