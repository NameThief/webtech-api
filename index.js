const express = require("express");
const app = express();

const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
// (uncomment this line if you want to access the products API)
// app.use("/products", require("./routes/products"));

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
