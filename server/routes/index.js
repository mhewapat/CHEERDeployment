const mongoose = require('mongoose');
const uri = "mongodb+srv://elwazirisra:rxg19LP6IH8JYVTF@cluster0.o72afec.mongodb.net/?retryWrites=true&w=majority"
const express = require('express');
const app = express();
const router = express.Router();
require('dotenv').config()
const cors = require("cors");

const userRoutes = require("./users");
const authRoutes = require("./auth");



//connecting the database
mongoose.connect(uri, {
    useNewUrlParser: true,
  });
  const db = mongoose.connection;
  db.on('error', (error)=>{
      console.log(error)
  })
  db.once('open', () =>{
      console.log("Server started DB")
  })


// middlewares
app.use(express.json());
app.use(cors());


// routes
app.use("/api",  userRoutes);
app.use("/api",  authRoutes);


const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));











