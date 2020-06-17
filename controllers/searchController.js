module.exports = (req, res) => {
  res.send(`Your search: ${req.query.search}.`)
}