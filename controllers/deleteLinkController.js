const sqlite3 = require('sqlite3');

module.exports = (req, res) => {
  const { id } = req.params;

  const db = new sqlite3.Database('db/links.db', (err) => {
    if (err) return console.error(err.message);
    console.log('Delete: Connected to the links database.');
  });

  const sql = `DELETE FROM links_saved WHERE id=?`;

  db.run(sql, id, (err) => {
    if (err) return console.log(err.message);
    console.log(`A link deleted: ${id}`);
  });

  db.close((err) => {
    if (err) return console.error(err.message);
    console.log('Close the database connection.\n');
  });

  return res.redirect('/');
}