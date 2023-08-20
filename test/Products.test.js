import mongoose from 'mongoose';
import ProductManager from '../src/dao/managers/ProductManager.js';
import Assert from 'assert';
import { config } from '../src/config/config.js';

const MONGO = config.mongo.url;

const assert = Assert.strict;

describe('Testing Products Manager', () => {
    
    before(async function() {
        await mongoose.connect(MONGO);
        this.productManager = new ProductManager();
    });

    beforeEach(function(){
        this.timeout(7000)
    });

    // it("The GET method of Products must be obtain all products in array format", async function(){
    //     const result = await this.productManager.get();
    //     const docs = await result.docs;
    //     assert.strictEqual(Array.isArray(docs),true);
    // });

    // it("The POST method of Products must be create a product on Database", async function(){
    //     let mockProduct = {
    //         title: "Create Product Test",
    //         price: 123456,
    //         category: "Testing"
    //     }
    //     const result = await this.productManager.post(mockProduct);
    //     assert.ok(result._id);
    // });

    // it("The GET method of Product must be obtain a product saved on Database", async function(){
    //     // let mockProduct = {
    //     //     title: "Get Product Test",
    //     //     price: 123456,
    //     //     category: "Testing"
    //     // }
    //     // const product = await this.productManager.post(mockProduct);
    //     let result = await this.productManager.getProduct("product._id");
    //     assert.ok(result[0]._id);
    // });

    // it("The PUT method of Products must be modify a product", async function(){
    //     let mockProductPost = {
    //         title: "Put Product Test Create",
    //         price: 123456,
    //         category: "Testing"
    //     }
    //     const productCreated = await this.productManager.post(mockProductPost);
    //     let mockProductPut = {
    //         title: "Put Product Test Modify",
    //         price: 123456,
    //         category: "Testing"
    //     }
    //     const productModified = await this.productManager.put(productCreated._id, mockProductPut);
    //     assert.ok(productModified != productCreated);
    // });

    it("The DELETE method of Products must be delete a product", async function(){
        let mockProductPost = {
            title: "Delete Product Test Create",
            price: 123456,
            category: "Testing"
        }
        const productCreated = await this.productManager.post(mockProductPost);
        const productDeleted = await this.productManager.delete(productCreated._id);
        assert.ok(productCreated._id != productDeleted._id);
    });

})
