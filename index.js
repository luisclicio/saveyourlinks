const express = require('express');
const path = require('path');
const process = require('process');

const routes = require('./routes');
const openLinkInBrowser = require('./utils/open-link-in-browser');

const PORT = process.env.PORT || 3333;

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(routes);

app.listen(PORT, (err) => {
	if (err) return err;

	const url = `http://localhost:${PORT}`;

	openLinkInBrowser(url);
	console.log(`Running in ${url}`);
});
