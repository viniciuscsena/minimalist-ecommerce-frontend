# Minimalist E-commerce Backend (Spring Boot)

This directory contains the backend API for the Minimalist E-commerce application built with Java 21 and Spring Boot. The backend is designed to work seamlessly with the React frontend and provides all the necessary endpoints for a complete e-commerce experience.

## Architecture

The backend follows a Model-View-Controller (MVC) architecture pattern using Spring Boot:

- **Controllers**: Handle HTTP requests and responses (generated from OpenAPI specification)
- **Models**: Define data structures and database entities using JPA
- **Services**: Contain business logic and data processing
- **Repositories**: Handle data persistence with Spring Data JPA

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/ecommerce/minimalist/
│   │   │   ├── controller/          # API Controllers (placeholder interfaces)
│   │   │   │   ├── AuthApi.java
│   │   │   │   ├── CartApi.java
│   │   │   │   ├── CheckoutApi.java
│   │   │   │   └── ProductApi.java
│   │   │   ├── model/              # JPA Entities (to be implemented)
│   │   │   ├── service/            # Business Logic (to be implemented)
│   │   │   └── MinimalistApplication.java
│   │   └── resources/
│   │       └── application.yml     # Spring Boot configuration
│   └── test/                       # Unit and integration tests
├── pom.xml                         # Maven dependencies and build configuration
└── README.md                       # This file
```

## Technology Stack

- **Java**: 21 (LTS)
- **Framework**: Spring Boot 3.2.0
- **Build Tool**: Maven
- **Database**: PostgreSQL
- **ORM**: Spring Data JPA / Hibernate
- **API Documentation**: SpringDoc OpenAPI 3
- **Code Generation**: OpenAPI Generator Maven Plugin
- **Authentication**: JWT (JSON Web Tokens)

## OpenAPI Code Generation

This project uses the OpenAPI Generator Maven Plugin to generate controller interfaces from the OpenAPI specification. The controllers are generated based on the `api-documentation.yaml` file in the project root.

### Configuration

The OpenAPI Generator is configured in `pom.xml`:

```xml
<plugin>
    <groupId>org.openapitools</groupId>
    <artifactId>openapi-generator-maven-plugin</artifactId>
    <version>7.0.1</version>
    <executions>
        <execution>
            <goals>
                <goal>generate</goal>
            </goals>
            <configuration>
                <inputSpec>${project.basedir}/../api-documentation.yaml</inputSpec>
                <generatorName>spring</generatorName>
                <apiPackage>com.ecommerce.minimalist.api</apiPackage>
                <modelPackage>com.ecommerce.minimalist.model</modelPackage>
                <configOptions>
                    <interfaceOnly>true</interfaceOnly>
                    <useJakartaEe>true</useJakartaEe>
                </configOptions>
            </configuration>
        </execution>
    </executions>
</plugin>
```

### Generating Controllers

To generate the controller interfaces from the OpenAPI specification:

```bash
mvn clean generate-sources
```

This will generate:
- Controller interfaces in `com.ecommerce.minimalist.api` package
- Model classes in `com.ecommerce.minimalist.model` package

## API Endpoints

The backend implements the following REST API endpoints:

- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/cart` - Add item to cart
- `GET /api/cart` - Get cart contents
- `DELETE /api/cart/{itemId}` - Remove cart item
- `POST /api/checkout` - Process checkout
- `POST /api/guest-checkout` - Process guest checkout
- `GET /api/orders/{orderId}` - Get order details
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

## Development Setup

### Prerequisites

- Java 21 or higher
- Maven 3.6 or higher
- PostgreSQL 12 or higher

### Database Setup

1. **Install PostgreSQL** and create a database:
   ```sql
   CREATE DATABASE minimalist_ecommerce;
   ```

2. **Set Environment Variables**:
   ```bash
   export DB_USERNAME=your_username
   export DB_PASSWORD=your_password
   export JWT_SECRET=your-secret-key
   ```

### Running the Application

1. **Generate API Code** (optional, if OpenAPI spec has changed):
   ```bash
   mvn clean generate-sources
   ```

2. **Build the Application**:
   ```bash
   mvn clean compile
   ```

3. **Run the Application**:
   ```bash
   mvn spring-boot:run
   ```

The backend will run on `http://localhost:8080` by default.

### API Documentation

Once the application is running, you can access:

- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8080/v3/api-docs

## Configuration

The application configuration is managed through `application.yml`:

- **Server Port**: 8080
- **Database**: PostgreSQL connection settings
- **CORS**: Configured for frontend development
- **JWT**: Token configuration
- **Logging**: Debug level for development

## Database Schema

The application uses the PostgreSQL database schema defined in `../database-schema.sql`. The schema includes:

- **users**: User accounts and authentication
- **products**: Product catalog
- **carts**: Shopping cart management
- **orders**: Order processing and history
- **guest_orders**: Guest checkout support

## Frontend Integration

The frontend is configured to communicate with this backend at `http://localhost:8080/api`. CORS is configured to allow requests from:

- `http://localhost:3000` (Create React App default)
- `http://localhost:5173` (Vite default)

## Next Steps

To complete the backend implementation:

1. **Generate Controllers**: Run `mvn generate-sources` to generate controller interfaces
2. **Implement Controllers**: Create controller implementations that implement the generated interfaces
3. **Create JPA Entities**: Implement model classes for database entities
4. **Implement Services**: Add business logic in service classes
5. **Add Repositories**: Create Spring Data JPA repositories
6. **Configure Security**: Implement JWT authentication and authorization
7. **Add Validation**: Implement request/response validation
8. **Error Handling**: Add global exception handling
9. **Testing**: Write unit and integration tests
10. **Documentation**: Complete API documentation

## Build and Deployment

### Building for Production

```bash
mvn clean package
```

This creates a JAR file in the `target/` directory that can be deployed to any Java-compatible server.

### Docker Support

A Dockerfile can be added for containerized deployment:

```dockerfile
FROM openjdk:21-jdk-slim
COPY target/minimalist-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

## Contributing

1. Follow Java coding standards and Spring Boot best practices
2. Ensure all endpoints are properly documented in the OpenAPI specification
3. Write comprehensive tests for all functionality
4. Use proper error handling and validation
5. Follow the existing project structure and naming conventions

