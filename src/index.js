const express = require("express");
const app = express();
const productsRouter = require("./products/products.router");
const db = require("./utils/database");
const initModels = require("./models/initModels");

db.authenticate()
  .then(() => console.log("DB authentication succesfully :D"))
  .catch((err) => console.log(err));

db.sync()
  //? Sincroniza los modelos con la base de datos, creando las tablas
  .then(() => console.log("Database synced yeah!!!"))
  .catch((err) => console.log(err));

initModels();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "okis dokis" });
});

app.use("/products", productsRouter);

app.listen(8005, () => {
  console.log(`it's alive in port 8005`);
});
