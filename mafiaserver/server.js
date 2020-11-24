const express = require("express");
const app = express();
const expressWs = require("express-ws")(app);
const cors = require("cors");
const wsRoutes = require("./wsStore/wsRoures.js");
app.use(cors());

app.use("api/auth", require("./routes/auth.routes"));

const mongoose = require("mongoose");

const config = require("config");

const PORT = config.get("port") || 5000;

async function start() {
  try {
    await mongoose.connect(config.mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    wsRoutes(app);
    app.listen(PORT, () => console.log(`thats ok on ${PORT}`));
  } catch (e) {
    console.log("server Error", e.message);
    process.exit(1);
  }
}

start();
