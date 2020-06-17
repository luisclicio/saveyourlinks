const { Router } = require('express');

const indexController = require('./controllers/indexController');
const addLinkController = require('./controllers/addLinkController');
const searchController = require('./controllers/searchController');
const deleteLinkController = require('./controllers/deleteLinkController');

const router = Router();

router.get('/', indexController);
router.post('/', addLinkController);

router.get('/search', searchController);

router.get('/delete/:id', deleteLinkController);

module.exports = router;