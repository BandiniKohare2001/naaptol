import { Schema, model } from "mongoose";

const productSchema = new Schema({
    title :{
        type: String,
    },
    description :{
        type: String,
        required: true
    },
    price :{
        type: Number,
        required: true
    },
    category :{
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
},{
    timestamps: true,
});

const Product = model('Product', productSchema);
export default  Product;