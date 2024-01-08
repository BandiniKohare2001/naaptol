import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import User from "./models/User.js";
import Product from './models/Product.js'
import Order from "./models/Order.js";
dotenv.config();

const app = express();
app.use(express.json());


const connectMongoDB = async () => {
  const conn = await mongoose.connect(process.env.ECOMMERCE_URI)

  if (conn) {
    console.log('MongoDB connected successfully.');
  }
};
connectMongoDB();
// --------------user login-----------------
app.get('/login', async (req, res) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({
    email: email,
    password: password
  })

  res.json({
    success: true,
    data: findUser,
    message: 'login Successfully',
  })
})

// -------------user signup-----------------------
app.post('/signup', async (req, res) => {
  const { name, email, mobile, password, address, gender } = req.body;
  try {
    const obj = new User({
      name: name,
      email: email,
      mobile: mobile,
      password: password,
      address: address,
      gender: gender
    })

    const saveUser = await obj.save();


    res.json({
      success: true,
      data: saveUser,
      message: 'Sign up Successfully',
    })

  } catch (e) {
    res.json({
      success: false,

      message: e.message
    })

  }
})




//-----------------fetch all products----------------
app.get('/products', async (req, res) => {
  const products = await Product.find({})
  res.json({
    success: true,
    data: products,
    message: "successfully display all Products"
  })
});





// ------------POST /product----------

app.post('/bandini', async (req, res) => {

  const { title, description, price, category, brand, image } = req.body

  const product = new Product({
    title: title,
    description: description,
    price: price,
    category: category,
    brand: brand,
    image: image
  })
  const saveProduct = await product.save();
  res.json({
    success: true,
    data: saveProduct,
    message: "Product added successfully"
  })
})



// //------------find one product by id ----------------
// app.get('/product', async (req, res) => {
//   const { _id } = req.params;
//   const findOneProduct = await Product.findOne({ _id: _id })
//   res.json({
//     success: true,
//     data: findOneProduct,
//     message: "Successfully find one Product"
//   })
// })

// app.get('/product', async (req, res) => {
//   const { name } = req.query
//   const productOne = await Product.findOne({ name: name })
//   res.json({
//       "result": true,
//       "prductc": productOne,
//       "message": "This is your product"
//   })
// })

// //------------- update product by id---------------

app.put('/product/:_id', async (req, res) => {
  const { _id } = req.params
  const { title, description, price, category, brand, image } = req.body
  await Product.updateOne({ _id: _id }, {
    $set: {
      title: title,
      description: description,
      price: price,
      category: category,
      brand: brand,
      image: image
    }
  })
  const updatedProductone = await Product.findOne({ _id: _id })
  if (!title) {
    return res.json({
      success: false,
      message: `Product title is required `
    });
  }
  if (!image) {
    return res.json({
      success: false,
      message: `product image is required `
    });
  }
  if (!price) {
    return res.json({
      success: false,
      message: `Price is required `
    });
  }
  if (!description) {
    return res.json({
      success: false,
      message: `description is required `
    });
  }
  if (!brand) {
    return res.json({
      success: false,
      message: `Brand is required `
    });
  }
  res.json({
    " result": true,
    "prductc": updatedProductone,
    " message": `product updated of  Id ${_id}`

  })

})

// //------------- DELETE product by id------------------
app.delete('/product/:_id', async (req, res) => {
  const { _id } = req.params;
  const deleteProduct = await Product.deleteOne({ _id: _id })
  res.json({
    success: true,
    data: deleteProduct,
    message: "Delete One Product Successfully"
  })
})

// // ---------------search all products-----------------------

app.get('/searchproduct', async (req, res) => {
  const { q } = req.query;

  const searchProduct = await Product.find({ name: { $regex: q, $options: 'i' } })

  res.json({
      success: "true",
      data: searchProduct,
      message: "Product find succesfully..!"
  })
})

//  ----------create  orders -------

app.post('/orders', async(req,res)=>{
  
  const {user, product , quantity , shipping_address , delivery_charges     }=req.body
  const Orders = new Order({
    user:user,
    product:product,
    quantity:quantity,
    shipping_address:shipping_address,
    delivery_charges:delivery_charges
  })

  const savedOrders= await Orders.save()
  res.json({
    success:true,
    Order:savedOrders,
    message:" Order created successfully"

  })

})
// // ----------get all orders -----------
app.get('/orders', async(req,res)=>{
  const Orders= await Order.find().populate('user  product')
  Orders.forEach((order)=>{
    order.user.password=undefined
  })    

  res.json({
    success:true,
    orders:Orders,
    message:"order fetched successfully"
  })
})
// // ---------get by user-----------
app.get('/byuserid/:_id', async(req,res)=>{
  const {_id}=req.params
  const findOrders= await Order.find({user:{_id:_id}}).populate('user  product')
  findOrders.forEach((order)=>{
    order.user.password=undefined
  })
  res.json({
    success:true,
    Order:findOrders,
    message:" Order of user founds successfully"  
  })
})

// // -------------update-status--------
app.patch('/updateorder/:_id',async(req,res)=>{
  const {_id}=req.params
  const {status}=req.body
  
   await Order.updateOne({_id:_id},{$set:{status:status}})
  const updatedOrder= await Order.findOne({_id:_id})
  res.json({
    success:true,
    order:updatedOrder,
    message:"order updated successfully"
  })
});











// Define the Product model
// const Cart = mongoose.model('Cart', {
//   name: String,
//   price: Number,
// });

// // Define the Cart model
// const CartItem = mongoose.model('CartItem', {
//   product: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
//   quantity: Number,
// });

// // Add product to the cart
// app.post('/add-to-cart', async (req, res) => {
//   try {
//     const { productId, quantity } = req.body;

//     // Validate input
//     if (!productId || !quantity || quantity <= 0) {
//       return res.status(400).json({ error: 'Invalid input' });
//     }

//     // Check if the product exists
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ error: 'Product not found' });
//     }

//     // Add the product to the cart
//     const cartItem = new CartItem({ product: product._id, quantity });
//     await cartItem.save();

//     return res.status(201).json({ message: 'Item added to cart successfully' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Get cart items
// app.get('/get-cart', async (req, res) => {
//   try {
//     const cartItems = await CartItem.find().populate('product');
//     return res.json({ cart: cartItems });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// });




const PORT =5000 || process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port 5000`);
});
