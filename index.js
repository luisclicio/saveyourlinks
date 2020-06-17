const express = require('express');
const path = require('path');
const process = require('process');
const sqlite3 = require('sqlite3');

const routes = require('./routes');
const openLinkInBrowser = require('./utils/open-link-in-browser');

const PORT = process.env.PORT || 3333;

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(routes);

const db = new sqlite3.Database('./db/links.db', (err) => {
	if (err) console.error(err.message);
	console.log('\nConnected');
});

db.run(`CREATE TABLE IF NOT EXISTS links_saved(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	url TEXT NOT NULL UNIQUE,
	title TEXT NOT NULL,
	description TEXT
)`);

db.close((err) => {
	if (err) console.error(err.message);
	console.log('...\n');
});

app.listen(PORT, (err) => {
	if (err) return err;
	const url = `http://localhost:${PORT}`;
	openLinkInBrowser(url);
	console.log(`\n ==> Welcome! SaveYourLinks running in ${url}`);
});
