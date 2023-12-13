# E-Commerce Marketplace REST API

This repository contains a set of REST API endpoints for an E-Commerce Marketplace, providing functionalities for buyers and sellers.

## Postman Collection

Explore the API endpoints using [Postman](https://interstellar-firefly-189300.postman.co/workspace/New-Team-Workspace~fe1d3087-f1f4-4ffe-8ad1-de38c20d92fa/collection/23119763-97370699-92b6-4aa9-af81-74ce85178e8f?action=share&creator=23119763).


## Features

- **Authentication**

  - \`POST /api/auth/register\`: Register a user (accepts username, password, type of user - buyer/seller)
  - \`POST /api/auth/login\`: Login for registered users (retrieve authentication token)
- **Buyers APIs**

  - \`GET /api/buyer/list-of-sellers\`: Get a list of all sellers
  - \`GET /api/buyer/seller-catalog/:seller_id\`: Get the catalog of a specific seller by seller ID
  - \`POST /api/buyer/create-order/:seller_id\`: Create an order for a specific seller by seller ID
- **Sellers APIs**

  - \`POST /api/seller/create-catalog\`: Create a catalog for a seller (accepts a list of items)
  - \`GET /api/seller/orders\`: Retrieve the list of orders received by a seller

## Entities

### Users

- Two types: buyers and sellers
- Users can sign up as buyers or sellers

### Catalogs

- Belongs to a seller
- One seller can have one catalog
- Consists of Products

### Products

- Have a name and a price

### Orders

- Created by a buyer to purchase items from a seller's catalog
- Consist of a list of products

## Usage

1. **Clone the Repository:**
   \`\`\`bash
   git clone https://github.com/Alok-jaiswal-075/e-commerce.git
   cd e-commerce
   \`\`\`
2. **Install Dependencies:**
   \`\`\`bash
   npm install
   \`\`\`
3. **Environment Variables:**

   - Create a \`.env\` file based on the provided \`.env.example\` file.
   - Set up necessary environment variables such as DB_URL, JWT_SECRET, PORT.
4. **Run the Application:**
   \`\`\`bash
   npm start
   \`\`\`

## Tech Stack

- Node.js
- Express.js
- MongoDB (or your preferred database)
- JSON Web Tokens (JWT) for authentication

## Contributors

- [Alok Jaiswal](https://github.com/Alok-jaiswal-075)

## License

This project is licensed under the [MIT License](https://github.com/Alok-jaiswal-075/e-commerce/blob/main/LICENSE).
EOF
