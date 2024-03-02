async function get(req, res, next) {
    res.json({hello: 'world'})
}

module.exports = {
    get
  };