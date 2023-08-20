import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { v4 as uuidv4 } from 'uuid';

const productCollection = 'products'

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        require: true
    },
    description: String,
    price: {
        type: Number,
        require: true
    },
    thumbnail: String,
    code: {
        type: String,
        unique: true,
        default: uuidv4()
    },
    stock: Number,
    category: {
        type: String,
        require: true
    },
    status: Boolean
});

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productCollection, productSchema);