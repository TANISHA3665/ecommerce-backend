# E-Commerce Backend API

This is a Node.js-based backend API for an e-commerce platform. It provides functionality for managing users, products, orders, and authentication with JWT tokens.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)

## Features

- User Registration and Login with JWT Authentication
- Product Management (CRUD Operations)
- Cart and Order Management
- Token-Based Authentication (Access and Refresh Tokens)
- Export Product Data to Excel

## Technologies Used

- **Node.js** - JavaScript runtime environment
- **Express** - Web framework for Node.js
- **Sequelize** - ORM for SQL databases
- **PostgreSQL** - Relational database
- **JWT** - JSON Web Token for authentication
- **bcrypt** - Password hashing
- **dotenv** - Environment variable management

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) installed (v14 or later)
- [PostgreSQL](https://www.postgresql.org/) installed
- A package manager like [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/TANISHA3665/ecommerce-backend.git
    cd ecommerce-backend
    ```

2. **Install dependencies**:

    Using npm:

    ```bash
    npm install
    ```

    Or using yarn:

    ```bash
    yarn install
    ```

3. **Set up the PostgreSQL database**:

    - Create a PostgreSQL database named ecommerce.

4. **Configure environment variables**:

    Create a `.env` file in the root directory and add the following environment variables or checkout the example file:

    ```bash
    # .env
    DB_HOST=host
    DB_USER=user
    DB_PASSWORD=password
    DB_NAME=ecommerce
    DB_PORT=5432
    JWT_SECRET=your_jwt_secret
    JWT_REFRESH_SECRET=refresh_token_secret
    PORT=3000

    ```

    Make sure you replace the values with your own credentials.

## Running the Application

1. **Run the server**:

    Using npm:

    ```bash
    npm start
    ```

    The server will start at `http://localhost:3000`.

## API Endpoints

### Authentication

- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Login a user
- **POST** `/api/auth/logout` - Logout a user
- **POST** `/api/auth/refresh-token` - Refreshes the access token

### User

- **GET** `/api/users` - Get all users
- **GET** `/api/users/:id` - Get user by ID
- **PUT** `/api/users/:id` - Update user by ID
- **DELETE** `/api/users/:id` - Delete user by ID

### Products

- **GET** `/api/products` - Get all products
- **GET** `/api/products/:id` - Get product by ID
- **POST** `/api/products` - Create a new product
- **PUT** `/api/products/:id` - Update product by ID
- **DELETE** `/api/products/:id` - Delete product by ID
- **GET** `/api/products/export/excel` - Export products to Excel

### Orders

- **GET** `/api/orders` - Get all orders
- **POST** `/api/orders` - Create a new order
- **PUT** `/api/orders/:id` - Update an order by ID
- **GET** `/api/orders/:id` - Get an order by ID
- **DELETE** `/api/orders/:id` - Delete an order by ID
- **PUT** `/api/orders/payment/:orderId` - update payment status

### Cart

- **GET** `/api/cart` - Get all cart items
- **POST** `/api/cart` - Add item to cart
- **PUT** `/api/cart/:id` - Update item from cart
- **DELETE** `/api/cart/:id` - Remove item from cart
