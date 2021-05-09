const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/post");
const userRoutes = require("./routes/user");


const app = express();

mongoose.connect('mongodb+srv://sachaduv:'+process.env.MONGO_ATLS_PWD+'@mean.1ayhi.mongodb.net/MEAN?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology:true
 }).then(()=>{
  console.log('Connected to Database');
}).catch((e)=>{
  console.log(process.env.MONGO_ATLS_PWD);
  console.log('Error occured on connecting to database',e);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authenticate"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
