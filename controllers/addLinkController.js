const rp = require('request-promise');
const $ = require('cheerio');
const sqlite3 = require('sqlite3');

module.exports = (req, res) => {
  const { url } = req.body;

  rp(url)
    .then((html) => {
      let title = $('title', html).text();
      const metas = $('meta', html);
      let description = '';

      for (let i in metas) {
        if (!metas[i].attribs) break;

        let name = metas[i].attribs.name;

        if (name === 'description') {
          description = metas[i].attribs.content;
          break;
        }
      }

      if (!title) title = url;

      return [url, title, description];
    })
    .then((data) => {
      const db = new sqlite3.Database('db/links.db', (err) => {
        if (err) return console.error(err.message);
        console.log('Add: Connected to the links database.');
      });

      const sql = `INSERT INTO links_saved (url, title, description) VALUES (?, ?, ?)`;

      db.run(sql, data, (err) => {
        if (err) return console.log(err.message);
        console.log(`A link saved: ${data[0]}`);
      });

      db.close((err) => {
        if (err) return console.error(err.message);
        console.log('Close the database connection.\n');
      });

      return res.redirect('/');
    })
    .catch((err) => {
      console.error(err);
      return res.render('error', { message: 'Unable to save link.', error: err.cause });
    });
}