const { json } = require("sequelize");
const Products = require("../models/products.models");
const productsControllers = require("./products.controller");

const getAllProducts = (req, res) => {
  productsControllers
    .getAllProducts()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json({ message: err.message });
    });
};

const postNewProduct = (req, res) => {
  const data = req.body;
  if (data.name && data.category && data.price) {
    productsControllers
      .createProduct(data)
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  }
};

const getOneProduct = (req, res) => {
  const id = req.params.id;
  productsControllers
    .getProductById(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const patchProductById = (req, res) => {
  const id = req.params.id;
  const { name, category, price } = req.body;
  productsControllers
    .editProduct(id, { name, category, price })
    .then((response) => {
      if (response[0]) {
        res
          .status(200)
          .json({ message: `product with id ${id}, edited succesfully` });
      } else {
        res.status(400).json({ message: "no funciona" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const deleteProductById = (req, res) => {
  const id = req.params.id;
  productsControllers
    .deleteProduct(id)
    .then((response) => {
      if (response) {
        res.status(204).json(response);
      } else {
        res.status(400).json({ message: "Invalid ID" });
      }
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
};

module.exports = {
  getAllProducts,
  postNewProduct,
  getOneProduct,
  patchProductById,
  deleteProductById,
};
