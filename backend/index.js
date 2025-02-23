require('dotenv').config(); 

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path"); 
const fs = require("fs"); 
const jwt = require("jsonwebtoken");


const app = express();
const port = 4000;

app.use(express.json());

//app.use(cors({
//origin: ["http://localhost:5173", "http://localhost:3000", "https://shopmart10.shop", "https://admin.shopmart10.shop",] // Tambahkan frontend yang sesuai
 // methods: ["GET", "POST", "PUT", "DELETE"],
  //credentials: true // Jika menggunakan cookie atau authentication
//}));

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || ["http://localhost:5173", "http://localhost:3000", "https://shopmart10.shop", "https://admin.shopmart10.shop", "https://api.shopmart10.shop"].includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Pastikan folder upload/images ada
const uploadDir = './upload/images';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Koneksi ke Database MongoDB
console.log('MongoDB Connection String:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Database Connected Successfully"))
  .catch(err => console.error("❌ Database Connection Error:", err));

// API route
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// Image storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/images"); 
  },
  filename: function (req, file, cb) {
    cb(null, `product_${Date.now()}${path.extname(file.originalname)}`); // ✅ Perbaikan cb dan extname
  }
});

const upload = multer({ storage: storage });

// Creating upload endpoint for images
app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('image'), (req, res) => {
  console.log("File received:", req.file); 

  if (!req.file) {
    return res.status(400).json({ success: 0, message: "No file uploaded" });
  }

  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`
  });
});

//schema creating product
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true, 
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    description: { // ✅ Tambahkan field description
      type: String,
      required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

app.post('/addproduct', async (req, res) => {
  let products = await Product.find({});
  let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image, 
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
    description: req.body.description,
  });

  console.log("Product to be saved:", product); 

  await product.save();
  console.log("Saved");

  res.json({
    success: true,
    name: req.body.name,
  });
});

// membuat APi ke untuk hapus products

app.post('/removeproduct', async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name
  });
});

//membuat API untuk mendapatkan semual product (all products)
app.get('/allproducts', async (req, res) => {
  let products = await Product.find({});
  console.log("All Product Fetched");
  res.send(products);
});

//Schema creating for user model

const Users = mongoose.model('Users', {
  name: {
    type: String,
  },
  email:{
    type:String,
    unique:true,
  },
  password:{
    type:String,
    
  },
  cartData:{
    type:Object,
  },
  date:{
    type:Date,
    default:Date.now,
  }
})

//Creating Endpoint for registering the user
app.post('/signup',async(req,res)=>{
  
  let check =await Users.findOne({email:req.body.email});
  if (check){
    return res.status(400).json({success:false,errors:"existing user found with same email address"})
  }
  let cart ={};
  for (let i = 0; i < 300; i++) {
   cart[i]=0;
  }
  const user= new Users({
    name:req.body.username,
    email:req.body.email,
    password:req.body.password,
    cartData:cart
  })

  await user.save();

  const data = {
    user:{
      id:user.id
    }
  }

  const token = jwt.sign(data,'secret_ecom');
  res.json({success:true,token})

})

// creating endpoint for login
app.post('/login',async(req,res)=>{
  let user= await Users.findOne({email:req.body.email});
  if (user) {
    const passCompare= req.body.password === user.password;
    if (passCompare) {
      const data = {
        user:{
          id:user.id
        }
      }
      const token = jwt.sign(data,'secret_ecom');
      res.json({success:true,token})
    }
    else{
      res.json({success:false,errors:"Wrong Password"});
    }
  }
  else{
    res.json({success:false,errors:"Wrong Email Id"});
  }
})

//creting endpoint for newcolletion data 
app.get('/newcollections', async (req,res)=>{
  let products =await Product.find({});
  let newcollection= products.slice(1).slice(-8);
  console.log("NewCollection Fetched");
  res.send(newcollection);
})

//creating endpoint for popular in women section
app.get('/popularinwomen',async(req,res)=>{
  let products =await Product.find({category:"women"});
  let popular_in_women = products.slice(0,4);
  console.log("Popular in Women Fetched");
  res.send(popular_in_women);
})

//creating middleware to fetch user
const fetchUser= async(req,res,next)=>{
  const token = req.header('auth-token');
  if (!token) {
    res.status(401).send({errors:"Please authenticate using valid token"})
  }
  else{
    try {
      const data = jwt.verify(token,'secret_ecom');
      req.user =data.user;
      next();
    } catch (error) {
      res.status(401).send({errors:"please authenticate using a valid token"})
    }
  }
}

//creating endpoint for products in cartdata
app.post('/addtocart',fetchUser,async (req,res)=>{
  console.log("Added",req.body.itemId);
  let userDtata= await Users.findOne({_id:req.user.id});
  userDtata.cartData[req.body.itemId] += 1 ;
  await Users.findOneAndUpdate({_id:req.user.id},{cartData:userDtata.cartData});
  res.send("Added")
})

// creating endpoint to remove product from cartdata

app.post('/removefromcart', fetchUser,async (req,res)=>{
  console.log("Removed",req.body.itemId);
  let userDtata= await Users.findOne({_id:req.user.id});
  if(userDtata.cartData[req.body.itemId]>0)
  userDtata.cartData[req.body.itemId] -= 1 ;
  await Users.findOneAndUpdate({_id:req.user.id},{cartData:userDtata.cartData});
  res.send("Remove")
})

//creating endpoint to get cartdata
app.post('/getcart',fetchUser,async (req,res)=>{
  console.log("GetCart");
  let userDtata= await Users.findOne({_id:req.user.id});
  res.json(userDtata.cartData);
})

// schema complaints
const Complaint = mongoose.model("Complaint", {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "resolved"],
    default: "pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//API untuk menambahkan complain

app.post("/addcomplaint", async (req, res) => {
  try {
      console.log("Incoming complaint:", req.body); // Debugging log
      const complaint = new Complaint({
          userId: new mongoose.Types.ObjectId(req.body.userId), // 🔥 Pastikan ini tidak NULL!
          message: req.body.message,
      });

      await complaint.save();
      res.json({ success: true, message: "Complaint submitted successfully!" });
  } catch (error) {
      console.error(error);
      res.status(400).json({ success: false, error: error.message });
  }
});



//API untuk mendapatkan semua complaint
app.get("/allcomplaints", async (req, res) => {
  try {
    const complaints = await Complaint.find().populate({
      path: "userId",
      select: "name email",
    });

    res.json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//API untuk resolved
app.post("/resolvecomplaint", async (req, res) => {
  try {
    if (!req.body.id) {
      return res.status(400).json({ success: false, message: "Complaint ID is required" });
    }

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.body.id,
      { status: "resolved" },
      { new: true } // Mengembalikan data setelah diperbarui
    );

    if (!updatedComplaint) {
      return res.status(404).json({ success: false, message: "Complaint not found" });
    }

    res.json({ success: true, message: "Complaint marked as resolved!", complaint: updatedComplaint });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
});
 
//delete complaint
app.delete("/deletecomplaint/:id", async (req, res) => {
  try {
    const { id } = req.params;
  
    console.log(`Attempting to delete complaint with ID: ${id}`);

    const deletedComplaint = await Complaint.findByIdAndDelete(id);

    if (!deletedComplaint) {
      console.log("Complaint not found");
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json({ message: "Complaint deleted successfully" });
  } catch (error) {
    console.error("Error deleting complaint:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start server
app.listen(port, (err) => {
  if (err) {
    console.log("❌ Error:", err);
  } else {
    console.log(`✅ Server Running on Port ${port}`);
  }
});
