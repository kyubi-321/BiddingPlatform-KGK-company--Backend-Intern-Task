# Bidding Platform API

## Overview

This is a Node.js backend project for a bidding platform. The API allows users to register, login, create auction items, place bids, receive notifications, and more.

## Endpoints

### User

- `POST /users/register` - Register a new user
- `POST /users/login` - Login a user
- `GET /users/profile` - Get user profile (requires authentication)

### Items

- `GET /items` - Get all items with optional search, filtering, and pagination
- `GET /items/:id` - Get a specific item by ID
- `POST /items` - Create a new item (requires authentication)
- `PUT /items/:id` - Update an item by ID (requires authentication)
- `DELETE /items/:id` - Delete an item by ID (requires authentication)

### Bids

- `GET /items/:itemId/bids` - Get all bids for a specific item
- `POST /items/:itemId/bids` - Place a bid on an item (requires authentication)

### Notifications

- `GET /notifications` - Get all notifications for the authenticated user
- `POST /notifications/mark-read` - Mark all notifications as read (requires authentication)

## Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Set up your `.env` file with the necessary environment variables
4. Run `npm start` to start the server

## Testing

Run `npm test` to execute the test suite.
