const router = require('express').Router()
    , controller = require('../controllers/userController');

router.post('/login', controller.Post);

module.exports = router;