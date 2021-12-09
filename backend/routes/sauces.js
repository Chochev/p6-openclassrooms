const express = require('express');
const router = express.Router();
//middleware auth sécuriser les routes
const auth = require('../middleware/auth');
//middleware multer gestion des images
const multer = require('../middleware/multer-config');

const saucesCtrl = require('../controllers/sauces');

router.get('/', auth, saucesCtrl.getAllSauces);
router.post('/', auth, multer, saucesCtrl.createSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
 router.post('/:id/like', auth, saucesCtrl.likeSauce);

module.exports = router;