const mongoose = require('mongoose');
const uri = "mongodb+srv://elwazirisra:rxg19LP6IH8JYVTF@cluster0.o72afec.mongodb.net/?retryWrites=true&w=majority"
const express = require('express');
const app = express();
const router = express.Router();
require('dotenv').config();
const cors = require("cors");
app.use(cors());
const path = require('path');


const userRoutes = require("./users");
const authRoutes = require("./auth");
const fileRoutes = require("./fileControl");
const fileAccessRoutes = require("./pdfAccess");
const formsByadminRoutes = require("./pdfsByAdmin")
const formAccessRoutes = require("./formAccess")

const newsletterRoutes = require("./newsletter");//newsletter route
const googleRoutes = require("./google");//google route



app.use("/files", express.static("files"))
app.use("/adminPdfs", express.static("adminPdfs"))

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

// Serve static files from the newsletters directory
app.use('/newsletters', express.static(path.join(__dirname, 'newsletters')));

// routes

app.use("/api",  userRoutes);
app.use("/api",  authRoutes);
app.use("/api",  fileRoutes);
app.use("/api",  fileAccessRoutes);
app.use("/api", formsByadminRoutes)
app.use("/api",  formAccessRoutes);

app.use("/api",  googleRoutes);
app.use("/api",  newsletterRoutes);


const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));











