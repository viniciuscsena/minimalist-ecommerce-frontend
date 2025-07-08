# Minimalist E-commerce Backend

This directory contains the backend API for the Minimalist E-commerce application. The backend is designed to work seamlessly with the React frontend and provides all the necessary endpoints for a complete e-commerce experience.

## Architecture

The backend follows a Model-View-Controller (MVC) architecture pattern:

- **Controllers**: Handle HTTP requests and responses
- **Models**: Define data structures and database interactions
- **Routes**: Define API endpoints and route requests to controllers
- **Services**: Contain business logic and data processing

## Project Structure

```
backend/
├── app/
│   ├── controllers/          # Request handlers
│   │   ├── auth_controller.py
│   │   ├── cart_controller.py
│   │   ├── checkout_controller.py
│   │   └── product_controller.py
│   ├── models/              # Data models (to be implemented)
│   ├── routes/              # API routes (to be implemented)
│   ├── services/            # Business logic (to be implemented)
│   ├── __init__.py
│   └── app.py              # Main application file
├── requirements.txt         # Python dependencies (to be created)
├── config.py               # Configuration settings (to be created)
└── README.md              # This file
```

## Controllers

The following controllers are defined as placeholders:

### ProductController
- `get_all_products()`: Retrieve all products
- `get_product_by_id(product_id)`: Retrieve a specific product

### CartController
- `add_item_to_cart(item_data)`: Add item to shopping cart
- `get_cart(cart_id)`: Retrieve cart contents
- `update_cart_item(item_id, quantity)`: Update item quantity
- `remove_item_from_cart(item_id)`: Remove item from cart

### CheckoutController
- `process_checkout(checkout_data)`: Process authenticated user checkout
- `process_guest_checkout(guest_checkout_data)`: Process guest checkout
- `get_order_details(order_id)`: Retrieve order information

### AuthController
- `login(credentials)`: User authentication
- `register(user_data)`: User registration

## API Endpoints

The backend will implement the following REST API endpoints:

- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/cart/items` - Add item to cart
- `GET /api/cart` - Get cart contents
- `PUT /api/cart/items/{id}` - Update cart item
- `DELETE /api/cart/items/{id}` - Remove cart item
- `POST /api/checkout` - Process checkout
- `POST /api/guest-checkout` - Process guest checkout
- `GET /api/orders/{id}` - Get order details
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

## Development Setup

1. **Install Python Dependencies** (when requirements.txt is created):
   ```bash
   pip install -r requirements.txt
   ```

2. **Set Environment Variables**:
   ```bash
   export DATABASE_URL=postgresql://username:password@localhost:5432/minimalist_ecommerce
   export JWT_SECRET=your-secret-key
   ```

3. **Run the Application**:
   ```bash
   python app/app.py
   ```

The backend will run on `http://localhost:5000` by default.

## Database

The backend is designed to work with the PostgreSQL database schema defined in `database-schema.sql`. Ensure the database is set up before running the backend.

## Frontend Integration

The frontend is configured to communicate with this backend at `http://localhost:5000/api`. The API service in the frontend includes fallback mechanisms for development scenarios.

## Next Steps

To complete the backend implementation:

1. Implement the main Flask application in `app/app.py`
2. Create route definitions in the `routes/` directory
3. Implement data models in the `models/` directory
4. Add business logic in the `services/` directory
5. Create `requirements.txt` with necessary dependencies
6. Add configuration management in `config.py`
7. Implement proper error handling and validation
8. Add authentication middleware
9. Set up database connections and migrations
10. Add comprehensive testing

## Technology Stack

- **Framework**: Flask (Python web framework)
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **API**: RESTful API following OpenAPI 3.0 specification
- **CORS**: Enabled for frontend communication

