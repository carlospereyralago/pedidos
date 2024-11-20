exports.findAll = (req, res) => {
  const routes = {
    '/auth/activacion': 'activation.html'
  }

  res.status(200).send(routes)
}
