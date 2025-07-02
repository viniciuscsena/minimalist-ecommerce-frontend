# Minimalist E-commerce Frontend

A modern, minimalist e-commerce frontend built with React, TailwindCSS, and modern best practices. This project is designed to be fully API-driven and scalable, starting with a single product (black t-shirt) and supporting both authenticated users and guest checkout.

## Features

- **Modern React Architecture**: Built with React 18, hooks, and functional components
- **Responsive Design**: Mobile-first design using TailwindCSS
- **API-Driven**: Fully decoupled frontend with comprehensive service layer
- **Guest Checkout**: Complete purchases without account creation
- **State Management**: React Context for global state, custom hooks for server state
- **Type Safety**: Comprehensive input validation and error handling
- **Accessibility**: Built with Radix UI components for accessibility compliance
- **Performance**: Code splitting, lazy loading, and optimized bundle size

## Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Footer, Layout components
│   ├── product/         # Product-related components
│   ├── cart/           # Shopping cart components
│   ├── checkout/       # Checkout process components
│   └── ui/             # Reusable UI components (Radix UI + Tailwind)
├── pages/              # Main page components
├── contexts/           # React Context providers
├── hooks/              # Custom hooks for API and state management
├── services/           # API service layer
└── utils/              # Utility functions
```

## Key Components

### Pages
- **HomePage**: Product showcase with hero section and features
- **ProductPage**: Detailed product view with size selection and add to cart
- **CartPage**: Shopping cart management with quantity updates
- **CheckoutPage**: Complete checkout process for both guests and users

### Services
- **apiService**: Base API client with authentication and error handling
- **productService**: Product catalog operations with mock data fallback
- **cartService**: Shopping cart management with localStorage fallback
- **checkoutService**: Order processing and payment handling
- **authService**: User authentication and profile management

### Hooks
- **useProducts**: Product data fetching and management
- **useAuth**: Authentication state and operations
- **useCheckout**: Checkout process management
- **useCart**: Shopping cart operations (via Context)

## API Integration

The frontend is designed to work with a REST API following OpenAPI 3.0 specifications. All API calls include fallback mechanisms with mock data for development scenarios.

### Key API Endpoints
- `GET /products` - Product catalog
- `GET /products/{id}` - Product details
- `POST /cart/items` - Add to cart
- `POST /checkout` - Process authenticated checkout
- `POST /guest-checkout` - Process guest checkout
- `POST /auth/login` - User authentication
- `POST /auth/register` - User registration

## Installation and Setup

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation
```bash
# Install dependencies
npm install
# or
pnpm install

# Start development server
npm run dev
# or
pnpm dev

# Build for production
npm run build
# or
pnpm build
```

### Environment Variables
Create a `.env` file in the root directory:
```
REACT_APP_API_URL=http://localhost:3001/api
```

## Guest Checkout Flow

The application supports a complete guest checkout process:

1. **Browse Products**: No authentication required
2. **Add to Cart**: Items stored in localStorage for guests
3. **Checkout**: Provide email, shipping address, and payment info
4. **Order Confirmation**: Receive order details and tracking info
5. **Optional Account Creation**: Convert guest order to user account

## State Management

### Cart Context
The shopping cart is managed through React Context, providing:
- Add/remove items
- Update quantities
- Calculate totals
- Persist cart across sessions (localStorage)

### Authentication Context
User authentication state includes:
- Login/logout operations
- User profile management
- Token management
- Registration and password reset

## Styling and Design

### TailwindCSS
The project uses TailwindCSS for styling with:
- Custom color palette
- Responsive design utilities
- Component-based styling
- Dark mode support (future)

### Radix UI Components
UI components are built with Radix UI for:
- Accessibility compliance
- Keyboard navigation
- Screen reader support
- Consistent behavior

## Performance Optimizations

- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Components and images loaded on demand
- **Memoization**: React.memo and useMemo for expensive operations
- **Bundle Optimization**: Tree shaking and dead code elimination

## Testing Strategy

The project is designed for comprehensive testing:
- **Unit Tests**: Component and hook testing with Jest and React Testing Library
- **Integration Tests**: API service testing with mock servers
- **E2E Tests**: Complete user flows with Playwright or Cypress

## Deployment

The frontend can be deployed to various platforms:
- **Vercel**: Automatic deployments from Git
- **Netlify**: Static site hosting with form handling
- **AWS S3 + CloudFront**: Scalable static hosting
- **Docker**: Containerized deployment

### Build Output
```bash
npm run build
```
Generates optimized static files in the `dist/` directory.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Architecture Documentation

For detailed architecture information, see:
- `ARCHITECTURE.md` - Complete system architecture documentation
- `api-documentation.yaml` - OpenAPI 3.0 API specification
- `database-schema.sql` - Complete database schema

## Future Enhancements

- Multi-product catalog
- Advanced search and filtering
- User reviews and ratings
- Wishlist functionality
- Order tracking
- Admin dashboard
- Multi-language support
- Progressive Web App (PWA) features

