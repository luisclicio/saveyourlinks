const sqlite3 = require('sqlite3');

module.exports = (req, res) => {
  const db = new sqlite3.Database('db/links.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) return console.error(err.message);
    console.log('Read: Connected to the links database.');
  });

  const sql = `SELECT * FROM links_saved ORDER BY id DESC`;

  db.all(sql, [], (err, rows) => {
    if (err) return console.log(err);
    return res.render('index', { rows });
  });

  db.close((err) => {
    if (err) return console.error(err.message);
    console.log('Close the database connection.\n');
  });
}