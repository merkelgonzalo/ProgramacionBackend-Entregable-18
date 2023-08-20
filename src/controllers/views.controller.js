import { productService } from "../repository/index.js"
import { cartService } from "../repository/index.js";
import ManagerAccess from '../dao/managers/ManagerAccess.js';

const managerAccess = new ManagerAccess();

export const getProductsController = async (req, res) => {
    try {

        const limit = parseInt(req.query.limit) || 10;
        const sort = parseInt(req.query.sort) || 0;
        const page = parseInt(req.query.page) || 1;
        const queryParam = req.query.query || null;
        let disable = false;

        const query = {};

        if (queryParam !== null) {
            query["$or"] = [
                { category: { $regex: queryParam, $options: "i" } },
                {
                    status: ["true", "false"].includes(queryParam.toLowerCase())
                        ? JSON.parse(queryParam.toLowerCase())
                        : undefined,
                },
            ];
        }

        const options = {
            limit,
            page,
            lean: true
        };

        if (sort !== 0) {
            options.sort = { price: sort };
        }

        const result = await productService.getProducts(query, options);

        // console.log(req.session.user.cart.products)

        // if(req.session.user.cart.products == 0){ disable = true}
        
        res.render('home', { 
            products: result.docs,
            total: result.total,
            page: result.page,
            totalPages: result.totalPages,
            hasPrevPage: result.hasPrevPage,
            prevPage: result.prevPage,
            prevLink: result.prevLink,
            hasNextPage: result.hasNextPage,
            nextPage: result.nextPage,
            nextLink: result.nextLink,
            limit,
            sort,
            queryParam,
            user: req.session.user,
            disable
        });
    } catch (error) {
        req.logger.error('Cannot get products view with mongoose: '+error);
        res.status(500).json({ status: "error", message: error.message });
    }
}

export const getCartController = async (req, res) => {
    try {
        const result = await cartService.getCartByIdPopulate(req.params.cid);
        if (result.length === 0) {
            errorService.customError({
                name: "Cart ID error",
                cause: errorService.generateCartErrorParam(idCart),
                message:"Error when try to find the cart by id",
                errorCode: EError.INVALID_PARAM
            });
        }
        const products = result.products;
        res.render('cart', {
            idCart: result._id,
            products: products
        });
    } catch (error) {
        req.logger.error('Cannot get carts with mongoose: ' + error)
        res.status(400).json({ message: error });
    }
}

export const registerController = async (req, res) => {
    await managerAccess.saveLog('Register');
    res.render('register');
}

export const loginController = async (req, res) => {
    await managerAccess.saveLog('Login');
    res.render('login');
}

export const forgotPasswordController = async (req, res) => {
    await managerAccess.saveLog('Forgot password');
    res.render('forgotPassword');
}

export const resetPasswordController = async (req, res) => {
    await managerAccess.saveLog('Reset password');
    const token = req.query.token;
    res.render('resetPassword', {token});
}