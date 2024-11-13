exports.findAll = (req, res) => {
  const routes = {
    '/admin/usuarios': 'users.html',
    '/admin/clientes': 'customers.html',
    '/admin/contacto': 'contact.html',
    '/admin/empresas': 'companies.html',
    '/admin/faqs': 'faqs.html',
    '/admin/categoria-de-productos': 'product-categories.html',
    '/admin/productos': 'products.html',
    '/admin/ventas': 'sales.html'
  }

  res.status(200).send(routes)
}
