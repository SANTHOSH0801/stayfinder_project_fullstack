# StayFinder Backend Documentation

## Overview
StayFinder is a full-stack web application designed to help users find and book accommodations. The backend is built using Node.js and Express, with MongoDB as the database for storing user and listing information.

## Objectives
- Provide a RESTful API for user authentication, property listings, and bookings.
- Ensure secure handling of user data and transactions.
- Facilitate easy integration with the frontend application.

## Deliverables
- A fully functional backend server that responds to API requests.
- Documentation for API endpoints and usage.
- Connection to a MongoDB database for data persistence.

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the backend directory:
   ```
   cd StayFinder/backend
   ```
3. Install the required dependencies:
   ```
   npm install
   ```
4. Set up your MongoDB connection in `src/config/db.js`.
5. Start the server:
   ```
   npm start
   ```

## API Endpoints
- **User Authentication**
  - POST `/api/auth/register`: Register a new user.
  - POST `/api/auth/login`: Log in an existing user.

- **Listings**
  - GET `/api/listings`: Retrieve all listings.
  - POST `/api/listings`: Create a new listing.
  - PUT `/api/listings/:id`: Update a listing.
  - DELETE `/api/listings/:id`: Delete a listing.

- **Bookings**
  - POST `/api/bookings`: Create a new booking.
  - GET `/api/bookings/:userId`: Retrieve bookings for a user.

## Submission Guidelines
- Ensure all code is properly commented and follows best practices.
- Include any additional documentation or notes that may assist in understanding the project.
- Submit the project by the specified deadline.