import express from 'express';
import __dirname from './utils/utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import {Server} from 'socket.io';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';
import sessionRouter from './routes/sessions.router.js';
import mockingRouter from './routes/mockings.router.js';
import loggerRouter from './routes/loggers.router.js';
import userRouter from './routes/users.router.js';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import { config } from './config/config.js';
import { errorHandler } from "./middlewares/errorHandler.js";
import { addLogger } from './utils/logger.js';
import { swaggerSpecs } from "./config/docConfig.js";
import swaggerUi from "swagger-ui-express";

const MONGO = config.mongo.url;
const PORT = config.server.port;
const app = express();
const conection = mongoose.connect(MONGO);
const server = app.listen(PORT, ()=>{
    console.log("Server running on port " + PORT);
});
app.use(session({
  store: new MongoStore({
      mongoUrl: MONGO,
      ttl:3600
  }),
  secret: config.auth.sessionSecret,
  resave:false,
  saveUninitialized:false
}));
initializePassport();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public')); //Important for use js y css files on templates
//app.use(addLogger);
app.use(addLogger);
app.use('/', viewsRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/mockingproducts', mockingRouter);
app.use('/api/loggertest', loggerRouter);
app.use('/api/users', userRouter);
app.use("/api/docs", swaggerUi.serve,swaggerUi.setup(swaggerSpecs));

app.use(passport.initialize());
app.use(passport.session());
app.use(errorHandler);

const io = new Server(server);
const messages = [];

io.on('connection', Socket =>{
    console.log("New connected client")

    // socket.on('newProduct', async (product) => {
    //     await productManager.addProduct(product);
  
    //     io.emit('updateProducts', await productManager.getProducts());
    // });

    // socket.on('deleteProduct', async (id) => {
    //     await productManager.deleteProductById(id);
  
    //     io.emit('updateProducts', await productManager.getProducts());
    // });
  
      Socket.on('message', data=>{
          messages.push(data);
          io.emit('messageLogs', messages)
      })

      Socket.on('authenticated', data =>{  
        Socket.broadcast.emit('newUserConnected', data)
      })
});

export { app };