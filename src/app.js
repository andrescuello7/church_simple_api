const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

require("dotenv").config();

//connections
mongoose.connect(
  `mongodb+srv://${process.env.userConnection}:${process.env.usePassword}@cluster0.qa9gg.mongodb.net/comunidad?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  }
);

//settings
app.set("port", process.env.PORT || 5000);
app.use(cors());

//middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use("/api/user", require("./routes/user_route"));
app.use("/api/auth", require("./routes/auth_route"));
app.use("/api/post", require("./routes/post_route"));

//server
app.listen(app.get("port"), () => {
  console.log("server in funcionament in port", app.get("port"));
});
