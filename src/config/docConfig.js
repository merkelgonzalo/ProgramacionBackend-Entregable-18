import __dirname from "../utils/utils.js";
import swaggerJsDoc from "swagger-jsdoc";
import path from "path";

console.log(path.join(__dirname,"docs/"))
const swaggerOptions = {
    definition:{
        openapi:"3.0.1",
        info:{
            title: "ECommerce Backend Documentation",
            version:"1.0.1",
            description:"Endpoint definitions"
        }
    },
    apis:[`${path.join(__dirname,"docs/**/*.yaml")}`]
};

export const swaggerSpecs = swaggerJsDoc(swaggerOptions);