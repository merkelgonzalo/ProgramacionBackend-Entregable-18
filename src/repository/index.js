// import { UserRepository } from "./users.repository.js";
// import { contactsdao } from "../dao/factory.js"

// export const contactService = new UserRepository(contactsdao)

import { ProductRepository } from "./products.respository.js";
import ProductManager from "../dao/managers/ProductManager.js";
import { CartRepository } from "./carts.respository.js";
import CartManager from "../dao/managers/CartManager.js";
import { TicketRepository } from "./tickets.repository.js";
import TicketManager from "../dao/managers/TicketManager.js";
import { UserRepository } from "./users.repository.js";
import UserManager from "../dao/managers/UserManager.js";
import { ErrorRepository } from "./errors.repository.js";

export const userService = new UserRepository(new UserManager());
export const productService = new ProductRepository(new ProductManager());
export const ticketService = new TicketRepository(new TicketManager());
export const cartService = new CartRepository(new CartManager(), ticketService, userService);
export const errorService = new ErrorRepository();
