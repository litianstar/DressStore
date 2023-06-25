const express = require("express");
const cors = require("cors");
const app = express();

const db = require("./client/models");

db.mongoose

  .connect(db.url, {

    useNewUrlParser: true,

    useUnifiedTopology: true

  })

  .then(() => {

    console.log("connect to mongodatabase!");

  })

  .catch(err => {

    console.log("Cannot connect mongodatabase!", err);

    process.exit();

  });

var corsOptions = {

  origin: "http://localhost:3007"

};

app.use(cors(corsOptions));

// 
app.use(express.json());

// 
app.use(express.urlencoded({ extended: true }));

// root
app.get("/", (req, res) => {

  res.json({ message: "Welcome to the Dress Store Application." });

});

require("./client/router/product.routes")(app);
require("./client/router/category.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {

  console.log(`Server is running on port ${PORT}.`);

});