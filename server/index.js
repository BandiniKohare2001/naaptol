import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import User from "./models/User.js";
import Product from "./models/product.js";
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
  const products = await Product.find()
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



//------------find one product by id ----------------
app.get('/product', async (req, res) => {
  const { _id } = req.params;
  const findOneProduct = await Product.findOne({ _id: _id })
  res.json({
    success: true,
    data: findOneProduct,
    message: "Successfully find one Product"
  })
})

// app.get('/product', async (req, res) => {
//   const { name } = req.query
//   const productOne = await Product.findOne({ name: name })
//   res.json({
//       "result": true,
//       "prductc": productOne,
//       "message": "This is your product"
//   })
// })

//------------- update product by id---------------

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

//------------- DELETE product by id------------------
app.delete('/product', async (req, res) => {
  const { id } = req.params;
  const deleteProduct = await Product.deleteOne({ _id: id })
  res.json({
    success: true,
    message: "Delete One Product Successfully"
  })
})

// ---------------search all products-----------------------
app.get('/searchproduct', async (req, res) => {
  const { q } = req.query
  const searchproduct = await Product.findOne({ name: { $regex: q, $options: 'i' } })
  res.json({
    sucess: true,
    products: searchproduct,
    message: "product searched successfully"
  })
})

// //  ----------create  orders -------

app.post('/orders', async(req,res)=>{
  
  const {user, product , quantity , shipping_address , delivery_charges , status}=req.body
  const Orders=new Order({
    user:user,
    product:product,
    quantity:quantity,
    shipping_address:shipping_address,
    delivery_charges:delivery_charges,
    status:status
  })

  const savedOrders= await Orders.save()
  res.json({
    success:true,
    Order:savedOrders,
    message:" Order created successfully"

  })

})
// ----------get all orders -----------
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
// ---------get by user-----------
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

// -------------update-status--------
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
})

app.listen(8080, () => {
  console.log(`Server is running on port 8080`);
});
