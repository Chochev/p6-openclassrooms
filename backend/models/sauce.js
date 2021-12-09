 const mongoose = require('mongoose');


//Model des sauces
const sauceSchema = mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
     // Créateur de la sauce
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
     // Ingredients qui pimentent la sauce
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
     // Force le piquant de la sauce
    heat: {type: Number, required: true},
    likes: {type: Number, required: false, default:0},
    dislikes: {type: Number, required: false, default:0},
    // Utilisateurs qui Like la sauce
    usersLiked: {type: [String], required: false},
    // Utilisateur qui DisLike la sauce
    usersDisliked: {type: [String], required: false},
});

 module.exports = mongoose.model('Sauce', sauceSchema);