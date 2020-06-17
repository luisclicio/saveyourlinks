const sqlite3 = require('sqlite3');

module.exports = (req, res) => {
  const { keywords } = req.query;

  const db = new sqlite3.Database('db/links.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) return console.error(err.message);
    console.log('\nConnected');
  });

  const sql =
    `SELECT
      *
    FROM
      links_saved
    WHERE
      url LIKE '%${keywords}%' OR
      title LIKE '%${keywords}%' OR
      description LIKE '%${keywords}%'
    ORDER BY id DESC`;

  db.all(sql, [], (err, rows) => {
    if (err) return console.log(err);
    return res.render('search', { rows, keywords });
  });

  db.close((err) => {
    if (err) return console.error(err.message);
    console.log('Operation finished\n');
  });
}