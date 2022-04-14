const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");

//constants
const app = express();
//settings
app.set("json spaces", 2);

//middleware
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use(require("./controllers/api"));

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is on in port ${app.get("port")}`);
});
