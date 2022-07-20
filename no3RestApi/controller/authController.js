const { User } = require('../models');
// const helper = require("../../../helpers");

const validator = require('fastest-validator');
const v = new validator();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;
module.exports = {
  register: async (req, res) => {
    try {
      const schema = {
        name: 'string|required',
        email: 'email|required',
        password: 'string|required',
      };

      const isExist = await User.findOne({ where: { email: req.body.email } });
      if (isExist) return res.respondAlreadyExist('Email already registered!');

      const validate = v.validate(req.body, schema);
      if (validate.length) return res.respondBadRequest(validate);
      const { password } = req.body;

      const encryptedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        ...req.body,
        password: encryptedPassword,
      });
      return res.status(200).json({
        status: 'Ok',
        result: { newUser },
        error: {},
      });
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password, name } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) return res.respondBadRequest('User not found!');

      const isCorrect = await bcrypt.compare(password, user.password);
      if (!isCorrect) return res.respondBadRequest('Wrong password!');

      const data = {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
      };
      const token = jwt.sign(data, JWT_SECRET_KEY, { expiresIn: '3h' });
      return res.status(200).json({
        status: 'Ok',
        result: {
          access_token: token,
        },
        error: {},
      });
    } catch (err) {
      return res.respondServerError(err.message);
    }
  },
};
