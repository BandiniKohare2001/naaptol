import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    user:{
        type: Schema.Typesype.ObjectId,
        ref: "user",
        required: true
    },
    product:{
        type: Schema.Types.ObjectId,
        ref: "product",
        required: true
    },
    quentity:{
        type: Number, 
        default: true
    },
    ShipingAddress:{
        type: String
    },
    deliveryCharges:{
        type: Number,
        default: 0
    }
},{
    timestamps: true,
})
const Order = model('Order', orderSchema)
export default order;