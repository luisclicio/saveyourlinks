const { Router } = require('express');

const indexController = require('./controllers/indexController');
const addLinkController = require('./controllers/addLinkController');
const searchController = require('./controllers/searchController');

const router = Router();

router.get('/', indexController);
router.post('/', addLinkController);

router.get('/search', searchController);

module.exports = router;