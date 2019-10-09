module.exports = (req, res) => {
  const { name } = req.query;
  res.send(`Hey ${name}`);
};
