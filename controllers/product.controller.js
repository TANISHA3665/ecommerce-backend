const Product = require('../models/product.model');
const User = require('../models/user.model');
const XLSX = require('xlsx');  // Make sure to require XLSX

exports.getAllProducts = async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

exports.createProduct = async (req, res) => {
  const { name, price, description, userId } = req.body;
  const newProduct = await Product.create({ name, price, description, userId });
  res.status(201).json(newProduct);
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;

  const product = await Product.findByPk(id);
  if (product) {
    await product.update({ name, price, description });
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (product) {
    await product.destroy();
    res.json({ message: 'Product deleted' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

exports.exportProductsToExcel = async (req, res) => {
  try {
    // Fetch all products along with the associated user
    const products = await Product.findAll({
      include: [{
        model: User,
        attributes: ['username'],  // Only include the username field
      }],
    });

    // Convert products data to a format for XLSX
    const productsData = products.map(product => ({
      'Product Name': product.name,
      'Price': product.price,
      'Description': product.description,
      'Added By': product.User ? product.User.username : 'Unknown',
      'Created At': product.createdAt,
      'Updated At': product.updatedAt,
    }));

    // Create a new workbook and add the products data to a worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(productsData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

    // Write the workbook to a buffer
    const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    // Set headers to download the Excel file
    res.setHeader('Content-Disposition', 'attachment; filename=products.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    // Send the buffer to the client
    res.send(excelBuffer);
  } catch (error) {
    console.error('Error exporting products:', error);
    res.status(500).json({ message: 'Failed to export products' });
  }
};
