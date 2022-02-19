const post = require("../models/post_model");
const user = require("../models/user_model");

//Methods for post and get
exports.get = async (req, res) => {
  try {
    const DataBaseOfHome = await post.find();
    res.send(DataBaseOfHome);
  } catch (error) {
    console.log(error);
    res.status(400).send("error in method get of write");
  }
};
exports.post = async (req, res) => {
  const { description } = req.body;
  try {
    const DataBaseOfHome = new post({
      ...req.body,
      description,
      likes: 0,
      creador: req.usuario.id,
      CreateAdd: Date.now(),
    });
    await DataBaseOfHome.save();
    res.send(DataBaseOfHome);
  } catch (error) {
    console.log(error);
    res.status(400).send("error in method post");
  }
};

//Methods for remove posts
exports.delete = async (req, res) => {
  const { idDelete } = req.params;
  try {
    const DataBaseOfHome = await post.findById(idDelete);
    await DataBaseOfHome.remove();
    res.send(DataBaseOfHome);
  } catch (error) {
    console.log(error);
    res.status(400).send("error in method delete");
  }
};

//Methods post commets
exports.postCommet = async (req, res) => {
  const { idComentario } = req.params;
  const { comment } = req.body;
  try {
    const final = await post.findByIdAndUpdate(
      { _id: idComentario },
      { $push: { comment } },
      { new: true }
    );
    res.send(final);
  } catch (error) {
    console.log(error);
  }
};

//Methods for search user
exports.searchUsers = async (req, res) => {
  const { idUsuario } = req.params;
  const packs = await user.find({ _id: idUsuario });
  res.send(packs);
};
exports.searchPosts = async (req, res) => {
  const { idPublicacion } = req.params;
  const packs = await post.find({ creador: idPublicacion });
  res.send(packs);
};

//Methods Favorite or Like
exports.incFavorite = async (req, res) => {
  const { idLike } = req.params;
  try {
    const final = await post.findByIdAndUpdate(
      { _id: idLike },
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.send(final);
  } catch (error) {
    console.log(error);
  }
};
exports.removeFavorite = async (req, res) => {
  const { idLike } = req.params;
  try {
    const final = await post.findByIdAndUpdate(
      { _id: idLike },
      { $inc: { likes: -1 } },
      { new: true }
    );
    res.send(final);
  } catch (error) {
    console.log(error);
  }
};
