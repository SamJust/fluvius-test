const router = require('express').Router()
    , controller = require('../controllers/eventController')
    , authMiddlware = require('../middlewares/auth');

router.use('/events', authMiddlware);

router.get('/events', controller.Get);
router.put('/events', controller.Put);
router.post('/events', controller.Post);
router.delete('/events/:eventId', controller.Delete);

module.exports = router;