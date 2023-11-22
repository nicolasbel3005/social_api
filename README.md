# social_api

## Description

The Social Network API is a backend server application built with Node.js, Express.js, MongoDB, and Mongoose. It provides an API for a social networking web application, allowing users to share thoughts, react to friends' thoughts, and manage their friend list.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [License](#license)

## Installation

To set up and run the Social Network API on your local machine, follow these steps:

 Clone the repository to your local machine:

   git clone https://github.com/your-username/social-network-api.git
   Navigate to the project directory:

Copy code
cd social-network-api
Install the required dependencies:

Copy code
npm install
Usage
You can use tools like Insomnia to test the API endpoints. Here are some example API requests:

GET all users: GET http://localhost:3000/api/users

GET a single user: GET http://localhost:3000/api/users/{userId}

POST a new user: POST http://localhost:3000/api/users

Copy code
{
  "username": "exampleuser",
  "email": "user@example.com"
}
PUT to update a user: PUT http://localhost:3000/api/users/{userId}

Copy code
{
  "username": "newusername"
}
DELETE a user: DELETE http://localhost:3000/api/users/{userId}

GET all thoughts: GET http://localhost:3000/api/thoughts

GET a single thought: GET http://localhost:3000/api/thoughts/{thoughtId}

POST a new thought: POST http://localhost:3000/api/thoughts

json
Copy code
{
  "thoughtText": "This is a new thought.",
  "username": "exampleuser",
  "userId": "user's-id"
}
PUT to update a thought: PUT http://localhost:3000/api/thoughts/{thoughtId}

Copy code
{
  "thoughtText": "Updated thought text."
}
DELETE a thought: DELETE http://localhost:3000/api/thoughts/{thoughtId}

POST a reaction to a thought: POST http://localhost:3000/api/thoughts/{thoughtId}/reactions

json
Copy code
{
  "reactionBody": "Interesting!",
  "username": "exampleuser"
}
DELETE a reaction: DELETE http://localhost:3000/api/thoughts/{thoughtId}/reactions/{reactionId}

Please refer to the API documentation or code for more details on available routes and request/response formats.

Routes
overview of the available API routes:

/api/users

GET: Get all users
POST: Create a new user
PUT: Update a user by ID
DELETE: Delete a user by ID
/api/users/{userId}/friends/{friendId}

POST: Add a friend to a user's friend list
DELETE: Remove a friend from a user's friend list
/api/thoughts

GET: Get all thoughts
POST: Create a new thought
PUT: Update a thought by ID
DELETE: Delete a thought by ID
/api/thoughts/{thoughtId}/reactions

POST: Create a reaction for a thought
DELETE: Remove a reaction by reaction ID
Authentication

video walkthrough:https://www.loom.com/share/b3d3de20fa8b4eee9704089297e25c27?sid=d13ae040-18f2-4b28-ac16-bda8d937eb05


Contributing


License
Author: Nicolas Esquibel
