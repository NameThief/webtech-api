# Webtech - API

## Introduction

This documentation will guide you through the process of setting up and initializing a simple Node.js REST API using the SQLite database for storage. This project provides basic CRUD (Create, Read, Update, Delete) functionality for managing products.

## Prerequisites

Before you begin, ensure you have the following prerequisites installed on your system:

1. Node.js: [Download and Install Node.js](https://nodejs.org/)
2. npm (Node Package Manager): npm is included with Node.js.
3. SQLite: [Download and Install SQLite](https://www.sqlite.org/download.html)

## Project Setup

Follow these steps to set up and initialize the project:

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install Dependencies:**

   Run the following command to install project dependencies:

   ```bash
   npm install
   ```

3. **Database Initialization:**

   Create a new SQLite database file named `database.db` in the project root directory. You can use the SQLite command-line tool for this:

   ```bash
   sqlite3 database.db
   ```

   Inside the SQLite shell, create the `products` table with the following schema:

   ```sql
   CREATE TABLE products (
     id INTEGER PRIMARY KEY,
     name TEXT,
     price REAL,
     description TEXT,
     image TEXT
   );
   ```

   > NOTE: You can adapt the schema to your needs. For example, you can add more columns to the table or change the data types of the columns.

   Exit the SQLite shell by typing `.exit`.

4. **Start the Server:**

   To start the API server, run:

   ```bash
   npm start
   ```

   The server will be available at `http://localhost:3000`.

## Running the Application

You can start the application by running the following npm script:

```bash
npm start
```

The `"start"` script in `package.json` runs the Node.js application using the `node app.js` command.

## API Endpoints

The API provides the following endpoints:

### Create a Product

- **HTTP Method:** POST
- **URL:** `/products`
- **Request Body:** JSON object containing product details (name, price, description, image)

**Example Request:**

```http
POST /products
Content-Type: application/json

{
  "name": "Product 1",
  "price": 100,
  "description": "Lorem ipsum dolor, sit amet consectetur adipisicing elit...",
  "image": "https://picsum.photos/600"
}
```

**Example Response:**

```json
HTTP/1.1 201 Created

{
  "id": 1,
  "name": "Product 1",
  "price": 100,
  "description": "Lorem ipsum dolor, sit amet consectetur adipisicing elit...",
  "image": "https://picsum.photos/600"
}
```

### Read All Products

- **HTTP Method:** GET
- **URL:** `/products`

**Example Request:**

```http
GET /products
```

**Example Response:**

```json
HTTP/1.1 200 OK

[
  {
    "id": 1,
    "name": "Product 1",
    "price": 100,
    "description": "Lorem ipsum dolor, sit amet consectetur adipisicing elit...",
    "image": "https://picsum.photos/600"
  },
  {
    "id": 2,
    "name": "Product 2",
    "price": 75,
    "description": "Another product description...",
    "image": "https://picsum.photos/601"
  }
  // More products...
]
```

### Read a Single Product by ID

- **HTTP Method:** GET
- **URL:** `/products/:id` (Replace `:id` with the product ID)

**Example Request:**

```http
GET /products/1
```

**Example Response:**

```json
HTTP/1.1 200 OK

{
  "id": 1,
  "name": "Product 1",
  "price": 100,
  "description": "Lorem ipsum dolor, sit amet consectetur adipisicing elit...",
  "image": "https://picsum.photos/600"
}
```

### Update a Product by ID

- **HTTP Method:** PUT
- **URL:** `/products/:id` (Replace `:id` with the product ID)
- **Request Body:** JSON object containing updated product details (name, price, description, image)

**Example Request:**

```http
PUT /products/1
Content-Type: application/json

{
  "name": "Updated Product 1",
  "price": 120,
  "description": "Updated product description...",
  "image": "https://picsum.photos/602"
}
```

**Example Response:**

```json
HTTP/1.1 200 OK

{
  "message": "Product updated successfully"
}
```

### Delete a Product by ID

- **HTTP Method:** DELETE
- **URL:** `/products/:id` (Replace `:id` with the product ID)

**Example Request:**

```http
DELETE /products/1
```

**Example Response:**

```json
HTTP/1.1 200 OK

{
  "message": "Product deleted successfully"
}
```

These examples demonstrate how to make requests to each of the API endpoints and what to expect in the response. Users can use these examples as a reference when interacting with your API.

## Postman Collection

You can import the [Postman](https://www.postman.com/) collection provided in this repository to test the API endpoints. The collection is available in the `postman` directory.
