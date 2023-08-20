import chai from "chai";
import supertest from "supertest";
import { app } from "../src/app.js";
import { productModel } from "../src/dao/models/products.model.js";
import { cartModel } from "../src/dao/models/carts.model.js";

const expect = chai.expect;
const requester = supertest(app);

describe("Testing Cart Endpoints", ()=>{
    
    describe("ADD Product to Cart", ()=>{
        let cartResult;
        let productResult;

        beforeEach(async function(){
            await productModel.deleteMany({});
            await cartModel.deleteMany({});
        });
            
        it("POST Cart", async () => {
            cartResult = await requester.post("/api/carts").send();
            expect(cartResult.statusCode).to.equal(200);
        });

        it("POST Product", async () => {
            let mockProduct = {
                title: "ADD Product to Cart - POST Product and Cart",
                price: 123456,
                category: "Testing"
            }
            productResult = await requester.post("/api/products").send(mockProduct);
            expect(productResult.statusCode).to.equal(200);
        });

        it("ADD Product to Cart", async () => {
            const response = await requester
                .post(`api/carts/${cartResult.body.payload._id}/product/${productResult.body.payload._id}`)
                .send({});
        
            //expect(response.statusCode).to.equal(200);
        
            const updatedCart = await requester.get(`/api/carts/${cartResult.body.payload._id}`);

            expect(updatedCart.body.payload.products).to.include(productResult.body.payload._id);
        });
    });
});