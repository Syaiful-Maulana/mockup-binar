const { Product } = require('../models');
const validator = require('fastest-validator');
const v = new validator();

module.exports = {
  add: async (req, res) => {
    try {
      const user = req.user;

      const schema = {
        name: 'string|required',
        price: 'number|required',
        imageurl: 'string|required',
      };

      const validate = v.validate(req.body, schema);
      if (validate.length) return res.respondBadRequest(validate);

      // create product
      const newProduct = await Product.create({
        ...req.body,
      });

      return res.status(201).json({
        status: 'Ok',
        result: newProduct,
        error: {},
      });
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },

  getAllProduct: async (req, res) => {
    try {
      const user = await Product.findAll();

      return res.status(200).json({
        status: 'Ok',
        result: user,
        error: {},
      });
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },

  getDetailProduct: async (req, res) => {
    try {
      const product_id = req.params.id;
      const product = await Product.findOne({
        where: {
          id: product_id,
        },
      });

      if (!product) return res.respondBadRequest('cant find product with id ' + product_id);
      return res.status(200).json({
        status: 'Ok',
        result: product,
        error: {},
      });
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },

  updateProduct: async (req, res) => {
    try {
      const product_id = req.params.id;
      const { name, price, imageurl } = req.body;

      let query = {
        where: {
          id: product_id,
        },
      };

      const isExist = await Product.findOne({ query });
      if (!isExist) return res.respondNotFound(null, `not found data with product_id =  ${product_id}`);

      const schema = {
        name: 'string|required',
        // imageurl: 'string|required',
        // price: 'number|required',
      };

      const validate = v.validate(req.body, schema);
      if (validate.length) return res.respondBadRequest(validate);
      let updated = await Product.update(
        {
          name,
          // price,
          // imageurl,
        },
        query
      );
      const data = await Product.findOne({ query });
      return res.status(201).json({
        status: 'Ok',
        result: data,
        error: {},
      });
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const product_id = req.params.id;

      const check = await Product.findOne({ where: { id: product_id } });
      if (!check) return res.respondNotFound(null, `not found data with product_id =  ${product_id}`);

      let deleted = await Product.destroy({
        where: {
          id: product_id,
        },
      });
      return res.status(201).json({
        status: 'Ok',
        result: {
          message: `${product_id} deleted`,
        },
        error: {},
      });
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },
};
