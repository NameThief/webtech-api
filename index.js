const express = require("express");
const sqlite3 = require("sqlite3");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

const db = new sqlite3.Database("database.db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Create a product
app.post("/products", (req, res) => {
  const { name, price, description, image } = req.body;
  db.run(
    "INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)",
    [name, price, description, image],
    function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json({
        id: this.lastID,
        name,
        price,
        description,
        image,
      });
    }
  );
});

// Read all products
app.get("/products", (req, res) => {
  db.all("SELECT * FROM products", (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(rows);
  });
});

// Read a single product by ID
app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    if (!row) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json(row);
  });
});

// Update a product by ID
app.put("/products/:id", (req, res) => {
  const id = req.params.id;
  const { name, price, description, image } = req.body;
  db.run(
    "UPDATE products SET name = ?, price = ?, description = ?, image = ? WHERE id = ?",
    [name, price, description, image, id],
    function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: "Product not found" });
        return;
      }
      res.json({ message: "Product updated successfully" });
    }
  );
});

// Delete a product by ID
app.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM products WHERE id = ?", [id], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json({ message: "Product deleted successfully" });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
