const Sauce = require('../models/sauce');
//file system- NODE
const fs = require('fs');

//create an item
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save()
        .then(() => {res.status(201).json({message: 'Sauce enregistrée!'});})
        .catch((error) => {res.status(400).json({error: error});});
};

// get all items
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then((sauces) => {res.status(200).json(sauces);})
        .catch((error) => {res.status(400).json({error: error});});
};

//get one item
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {res.status(200).json(sauce);})
        .catch((error) => {res.status(404).json({error: error});});
};

//modify item
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    if(req.file){
        Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.updateOne({_id: req.params.id}, { ...sauceObject, _id: req.params.id })
                        .then(() => {res.status(201).json({message: 'Sauce mise à jour!'});})
                        .catch((error) => {res.status(400).json({error: error});});
                })
            })
            .catch((error) => {res.status(500).json({error: error});});
           
    }else{
        Sauce.updateOne({_id: req.params.id}, { ...sauceObject, _id: req.params.id })
            .then(() => {res.status(201).json({message: 'Sauce mise à jour!'});})
            .catch((error) => {res.status(400).json({error: error});}); 
    }
    
};

//clear item
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
                    .catch(error => res.status(400).json({ error }));
            });
        })    
        .catch((error) => {res.status(500).json({error});});
};
// like,deslike and cansel 
exports.likeSauce = (req, res, next) => {
    let like = req.body.like
    let userId = req.body.userId
    let sauceId = req.params.id

    if(like ===1) {
        Sauce.updateOne(
            {
            _id: sauceId
            }, {
            $push: {
                usersLiked: userId
            },
            $inc: {
                likes: +1
            },
        })
        .then(() => res.status(200).json({
            message: 'like !'
          }))
          .catch((error) => res.status(400).json({
            error
          }))
    }
    if(like === -1) {
        Sauce.updateOne(
            {
                _id: sauceId
            }, {
                $push: {
                    userDisliked: userId
                },
                $inc: {
                    dislikes: +1
                },
            }
        )
        .then(() => {
            res.status(200).json({
              message: 'dislike  !'
            })
          })
          .catch((error) => res.status(400).json({
            error
          }))
    }
    // if (like === 0) {
    //     Sauce.findOne({
    //         _id: sauceId
    //     })
    //     .then((sauce) => {
    //         if(sauce.usersLiked.includes(userId)) {
    //             Sauce.updateOne({
    //                 _id: sauceId
    //             }, {
    //                 $pull: {
    //                     usersLiked: userId
    //                 }, 
    //                  $inc: {
    //                     likes: -1
    //                  },
    //             })
    //             .then(() => res.status(200).json({
    //                 message: 'Like delete !'
    //               }))
    //               .catch((error) => res.status(400).json({
    //                 error
    //               }))
    //         }
    //         if(sauce.userDisliked.includes(userId)) {
    //             Sauce.updateOne({
    //                 _id: sauceId
    //             }, {
    //                 $pull: {
    //                     userDisliked: userId
    //                 },
    //                 $inc: {
    //                     dislikes: -1
    //                 },
    //             })
    //             .then(() => res.status(200).json({
    //                 message: 'dislike delete !'
    //               }))
    //               .catch((error) => res.status(400).json({
    //                 error
    //               }))
    //         }
    //     })
    //     .catch((error) => res.status(404).json({
    //         error
    //       }))
    // }
}