const auth = require("../middleware/auth_token");
const express = require("express");
const router = express.Router();

const collectionPublicacion = require("../collections/collection_post");

//Methods
router.get("/", collectionPublicacion.get);
router.post("/", auth, collectionPublicacion.post);
router.delete("/:idDelete", auth, collectionPublicacion.delete);

//Methods commets
router.post(
  "/commet/:idComentario",
  auth,
  collectionPublicacion.postCommet
);

//Methods secods
router.get("/:idUsuario", collectionPublicacion.searchUsers);
router.get("/user/:idPublicacion", collectionPublicacion.searchPosts);

//Methods likes
router.put("/inclike/:idLike", auth, collectionPublicacion.incFavorite);
router.put("/removelike/:idLike", auth, collectionPublicacion.removeFavorite);

module.exports = router;