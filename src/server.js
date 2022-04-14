const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");

//constants
const app = express();
const PORT = process.env.PORT || 3001;
//settings
app.set("port", PORT);
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

app.listen(app.get("port"), () => {
  console.log(`Server is on in port ${app.get("port")}`);
});
