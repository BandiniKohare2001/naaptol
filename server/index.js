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




// GET  /products
app.get('/products', async (req, res) => {
  const products = await Product.find()
  res.json({
    success: true,
    data: products,
    message: "successfully display all Products"
  })
});





// POST /product

app.post('/bandini', async (req, res) => {

  const {title, description, price, category, brand ,image } = req.body

  const product = new Product({
    title : title,
    description: description,
    price: price,
    category: category,
    brand: brand,
    image:image
  })
  const saveProduct = await product.save();
  res.json({
    success: true,
    data: saveProduct,
    message: "Product added successfully"
  })
})



// GET  /product/:id
// app.get('/product', async (res, req) => {
//   const { id } = req.params;
//   const findOneProduct = await Product.findOne({ _id: id })
//   res.json({
//     success: true,
//     data: findOneProduct,
//     message: " Successfully find one Product"
//   })
// })


// // PUT / product/id (UPDATE)
// app.put('/product', async (res, req) => {
//   const { id } = req.params;
//   const { name, description, price, category, brand, image } = req.body

//   const updateProduct = await Product.updateOne({ _id: id },
//     {
//       $set: {
//         name: name,
//         description: description,
//         price: price,
//         category: category,
//         brand: brand,
//         image: image
//       }
//     })

//     res.json({
//       success:true,
//       data:updateProduct,
//       message:"product update successfully"
//     })
// })
// DELETE/ product/id
// app.delete('/product', async (res, req)=>{
//   const {id}=req.params;
//   const deleteProduct =  await Product.deleteOne({_id: id})
//   res.json({
//     success: true,
//     message:"Delete One Product Successfully"
//   })
// })

// GET /products/search/:id/query=name
// app.get('product', async (res, req)=>{
// const {id}= req.query;
// })


app.listen(8080, () => {
  console.log(`Server is running on port 8080`);
});
