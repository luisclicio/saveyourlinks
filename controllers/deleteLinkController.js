const sqlite3 = require('sqlite3');

module.exports = (req, res) => {
  const { id } = req.params;

  const db = new sqlite3.Database('db/links.db', (err) => {
    if (err) return console.error(err.message);
    console.log('Delete: Connected to the links database.');
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
}