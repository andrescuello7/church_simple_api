const _user = require("../models/user_model");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

//Method of authentication
exports.get = async (req, res) => {
  try {
    const usuario = await _user.findById(req.usuario.id);
    res.json({ usuario });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error en creacion de Usuario");
  }
};

exports.post = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ msg: errores.array() });
  }
  const { email, password } = req.body;
  try {
    let usuario = await _user.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: "usuario no existe" });
    }
    const PassCorrect = await bcrypt.compare(password, usuario.password);
    if (!PassCorrect) {
      return res.status(400).json({ msg: "password incorrecto" });
    }
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };
    jwt.sign(
      payload,
      process.env.SECRETA,
      (error, token) => {
        if (error) {
          throw error;
        }
        res.send(token);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send("Error en creacion de Usuario");
  }
};
