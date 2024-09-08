# Movie Reservation Service

A RESTful API for managing movie reservations, including functionalities for adding movies, reserving seats, and managing user authentication.

## Table of Contents

-   [Setup Instructions](#setup-instructions)
-   [API Documentation](#api-documentation)
    -   [Movies](#movies)
    -   [Reservations](#reservations)
    -   [Authentication](#authentication)
-   [Usage Examples](#usage-examples)
-   [Contributing](#contributing)
-   [License](#license)

## Setup Instructions

### Prerequisites

-   **Node.js**: Ensure you have Node.js (v14.x or later) installed. You can download it from [nodejs.org](https://nodejs.org/).
-   **Database**: This project uses PostgreSQL. Ensure you have PostgreSQL installed and a database created.

### Clone the Repository

```bash
git clone https://github.com/italo-gouveia/movie-reservation-service.git
cd movie-reservation-service
```

### Install Dependencies

```bash
npm install
```

### Configuration

1. **Create a .env file** in the root directory and add the following environment variables:

```env
PORT=3000
JWT_SECRET=your_jwt_secret
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
```

Replace the placeholders with your actual database credentials and JWT secret.

2. **Run Database Migrations**

If you are using Sequelize for migrations, you might need to run migrations to set up the database schema:

```bash
npx sequelize-cli db:migrate
```

### Start the Server

```bash
npm start
```

The server should now be running on http://localhost:3000.

## API Documentation

### Movies

### Add a New Movie

-   **Endpoint:** POST /movies
-   **Description:** Adds a new movie to the database.
-   **Request Body:**

```json
{
	"title": "Inception",
	"description": "A mind-bending thriller",
	"poster_url": "http://example.com/inception.jpg",
	"genre": "Sci-Fi"
}
```

-   **Responses:**
-   -   **201 Created:**

```json
{
	"id": 1,
	"title": "Inception",
	"description": "A mind-bending thriller",
	"poster_url": "http://example.com/inception.jpg",
	"genre": "Sci-Fi"
}
```

-   -   **400 Bad Request:**

```json
{
	"message": "Missing required fields"
}
```

### Update a Movie

-   **Endpoint:** PUT /movies/:id
-   **Description:** Updates a movie by ID.
-   **Request Body:**

```json
{
	"title": "Inception",
	"description": "A thrilling science fiction movie",
	"poster_url": "http://example.com/inception_updated.jpg",
	"genre": "Sci-Fi"
}
```

-   **Responses:**
-   -   **200 OK:**

```json
{
	"id": 1,
	"title": "Inception",
	"description": "A thrilling science fiction movie",
	"poster_url": "http://example.com/inception_updated.jpg",
	"genre": "Sci-Fi"
}
```

-   -   **404 Not Found:**

```json
{
	"message": "Movie not found"
}
```

### Delete a Movie

-   **Endpoint:** DELETE /movies/:id
-   **Description:** Deletes a movie by ID.
-   **Responses:**
-   -   **204 No Content**
-   -   **404 Not Found:**

```json
{
	"message": "Movie not found"
}
```

### Retrieve a Single Movie

-   **Endpoint:** GET /movies/:id
-   **Description:** Retrieves a movie by ID.
-   **Responses:**
-   -   **200 OK:**

```json
{
	"id": 1,
	"title": "Inception",
	"description": "A mind-bending thriller",
	"poster_url": "http://example.com/inception.jpg",
	"genre": "Sci-Fi"
}
```

-   -   **404 Not Found:**

```json
{
	"message": "Movie not found"
}
```

### Retrieve List of Movies

-   **Endpoint:** GET /movies
-   **Description:** Retrieves a list of movies. Optionally filter by genre.
-   **Query Parameters:**

```makefile
genre=Sci-Fi
```

-   **Responses:**
-   -   **200 OK:**

```json
[
  {
    "id": 1,
    "title": "Inception",
    "description": "A mind-bending thriller",
    "poster_url": "http://example.com/inception.jpg",
    "genre": "Sci-Fi"
  },
  ...
]
```

### Reservations

**Reserve Seats**

-   **Endpoint:** POST /reservations
-   **Description:** Reserves seats for a specific showtime.
-   **Request Body:**

```json
{
	"showtime_id": 1,
	"seat_ids": [1, 2, 3]
}
```

-   **Responses:**
-   -   **201 Created:**

```json
[
  {
    "id": 1,
    "user_id": 1,
    "showtime_id": 1,
    "seat_id": 1
  },
  ...
]
```

-   -   **400 Bad Request:**

```json
{
	"message": "Some seats are not available or do not exist"
}
```

-   -   **404 Not Found:**

```json
{
	"message": "Showtime not found"
}
```

**Get Reservations**

-   **Endpoint:** GET /reservations
-   **Description:** Retrieves all reservations for the authenticated user.
-   **Responses:**
-   -   **200 OK:**

```json
[
  {
    "id": 1,
    "user_id": 1,
    "showtime_id": 1,
    "seat_id": 1
  },
  ...
]
```

### Authentication

**Sign Up**

-   **Endpoint:** POST /auth/signup
-   **Description:** Registers a new user.
-   **Request Body:**

```json
{
	"username": "johndoe",
	"password": "password123",
	"role": "user"
}
```

-   **Responses:**
-   -   **201 Created:**

```json
{
	"id": 1,
	"username": "johndoe"
}
```

-   -   **400 Bad Request:**

```json
{
	"message": "Username and password are required"
}
```

**Login**

-   **Endpoint:** POST /auth/login
-   **Description:** Authenticates a user and returns a JWT token.
-   **Request Body:**

```json
{
	"username": "johndoe",
	"password": "password123"
}
```

-   **Responses:**
-   -   **200 OK:**

```json
{
	"token": "your_jwt_token"
}
```

-   -   **401 Unauthorized:**

```json
{
	"message": "Invalid credentials"
}
```

## Usage Examples

### Add a Movie

```bash
curl -X POST http://localhost:3000/movies \
-H "Content-Type: application/json" \
-d '{
  "title": "Inception",
  "description": "A mind-bending thriller",
  "poster_url": "http://example.com/inception.jpg",
  "genre": "Sci-Fi"
}'
```

### Reserve Seats

```bash
curl -X POST http://localhost:3000/reservations \
-H "Authorization: Bearer your_jwt_token" \
-H "Content-Type: application/json" \
-d '{
  "showtime_id": 1,
  "seat_ids": [1, 2, 3]
}'
```

### Sign Up

```bash
curl -X POST http://localhost:3000/auth/signup \
-H "Content-Type: application/json" \
-d '{
  "username": "johndoe",
  "password": "password123",
  "role": "user"
}'
```

### Login

```bash
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{
  "username": "johndoe",
  "password": "password123"
}'
```

## Contributing

Feel free to submit pull requests or open issues if you encounter any problems or have suggestions for improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
