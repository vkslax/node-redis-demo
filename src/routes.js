const express = require('express');
const router = express.Router();
const dogController = require('./controllers/dogController');

router.get('/api', dogController.getDogList);
router.delete('/api', dogController.deleteDogList);

module.exports = router;
