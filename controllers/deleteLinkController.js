const sqlite3 = require('sqlite3');

module.exports = (req, res) => {
  const { id } = req.params;

  const db = new sqlite3.Database('db/links.db', (err) => {
    if (err) return console.error(err.message);
    console.log('\nConnected');
  });

  const sql = `DELETE FROM links_saved WHERE id=?`;

  db.run(sql, id, (err) => {
    if (err) return console.log(err.message);
    console.log(`Link deleted: ${id}`);
  });

  db.close((err) => {
    if (err) return console.error(err.message);
    console.log('Operation finished\n');
  });

  return res.redirect('/');
}