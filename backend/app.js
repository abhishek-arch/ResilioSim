const express = require ("express")
const app = express()
const dotenv = require("dotenv")
const userroute = require("./routes/user.routes")
// const adminroute = require("./routes/admin.routes")


const path = require('path')

const cors = require("cors")
dotenv.config()
const connectDB = require("./db/db")
connectDB()





const allowedOrigins = [
 "https://resiliosim-frontend.onrender.com",
 "https://resiliosim.onrender.com",
  'http://localhost:5173',
  
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow Postman/curl etc.
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS blocked for origin: ' + origin));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));




app.use(express.static(path.join(__dirname,"public")))
console.log(path.__dirname)
app.use(express.json({ limit: '10mb' })); // or more
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use('/users', userroute)
// app.use('/admins', adminroute)

// app.use('/profile', profileroute)


app.get('/',(req,res)=>{
    res.send("hello")
})
 module.exports = app
