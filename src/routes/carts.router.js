import { Router } from 'express';
import { 
    getCartsController, 
    getCartController, 
    createCartController, 
    addProductController, 
    deleteProductController, 
    deleteProductsController, 
    updateProductsController, 
    updateProductController,
    buyCartController
} from '../controllers/carts.controller.js';
import { addLogger } from '../utils/logger.js';

const router = Router();

router.get('/', addLogger, getCartsController);

router.get('/:cid', addLogger, getCartController);

router.post('/', addLogger, createCartController);

router.post('/:cid/product/:pid', addLogger, addProductController);

router.delete('/:cid/products/:pid', addLogger, deleteProductController);

router.delete('/:cid', addLogger, deleteProductsController);

router.put('/:cid', addLogger, updateProductsController);

router.put('/:cid/products/:pid', addLogger, updateProductController);

router.post('/:cid/purchase', addLogger, buyCartController);

export default router;