const Usuario = require("../models/user_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.post = async (req, res) => {
  const { email, password } = req.body;
  const validation = await Usuario.findOne({ email });
  try {
    if (validation) {
      return res.status(400).send("error en validacion de email");
    }
    const salt = await bcrypt.genSalt(10);
    const encrypt = await bcrypt.hash(password, salt);
    const usuario = new Usuario({
      ...req.body,
      password: encrypt,
      CreateAdd: Date.now(),
    });
    await usuario.save();
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) {
          throw error;
        }
        res.send(token);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send("error en creacion de usuario");
  }
};

exports.put = async (req, res) => {
  const { idUser } = req.params;
  try {
    const actualizar = await Usuario.findOneAndUpdate({ _id: idUser }, req.body, { new: true });
    res.send(actualizar)
  } catch (error) {
    console.log(error);
    res.status(400).send("error en la actualizacion de usuario");
  }
};