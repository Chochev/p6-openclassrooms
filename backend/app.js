 const express = require('express');
 const bodyParser = require('body-parser');
 const mongoose = require('mongoose');
 const app = express();
//Import des routes
const userRoutes = require("./routes/user");
const saucesRoutes = require("./routes/sauces");

 const path = require("path");




// app.use(express.json());
mongoose.connect('mongodb+srv://Tchotchev:azeqsd123456@cluster0.dutwe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  
  
//test
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
   


// //Routes attendues
app.use("/api/auth", userRoutes);
app.use("/api/sauces", saucesRoutes);
//images
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;