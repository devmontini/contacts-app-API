const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

//constants
const app = express();

//settings
app.set("port", 3001);
app.set("json spaces", 2);

//middleware
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use(require("./controllers/api"));

app.listen(app.get("port"), () => {
  console.log(`Server is on in port ${app.get("port")}`);
});
