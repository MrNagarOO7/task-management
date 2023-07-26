# Task Management Application

This is a Task Management Application with the backend built using Nest.js & frontend with React.js.

## Overview

The Task Management Application is designed to help users organize and manage their tasks effectively. It provides a user-friendly interface to create, update, and track tasks.

## Features

- User Authentication: Users can sign up, log in, and manage their accounts securely.
- Create Task: Users can create new tasks with a title, description.
- Update Task: Users can update existing tasks, including modifying task details and marking them as completed.
- Task Filtering: Users can filter tasks based on different parameters such as status.

## Backend Technology Stack

- Node.js: A JavaScript runtime used for server-side development.
- Nest.js: A progressive Node.js framework for building efficient and scalable server-side applications.
- MongoDB: A NoSQL database used to store task-related data.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB, providing a schema-based solution for modeling application data.
- Authentication: JWT (JSON Web Tokens) for securing user authentication.
- Express.js: A web application framework used in conjunction with Nest.js for handling HTTP requests.

## Frontend Technology Stack

- React.js: A JavaScript library for building user interfaces.
- Redux: A state management library used to manage application state and data flow.
- Redux Thunk: A middleware for Redux that allows handling asynchronous actions.
- Axios: A popular HTTP client library used for making API requests to the backend server.
- Ant Design: A UI library for React that provides a set of pre-designed components and styles for building modern and responsive user interfaces.

## Getting Started

To set up the Task Management Application locally, follow these steps:

1. Clone the repository from [GitHub Repo URL](https://github.com/MrNagarOO7/task-management.git).
2. Install Node.js and npm (Node Package Manager) if you haven't already.
3. Install MongoDB and set up the database according to the configuration in the backend.
4. Navigate to the backend directory and run the following command to install dependencies:

```bash
npm install
```

5. Configure the environment variables required for the backend, such as database connection details, JWT secret, etc.
6. Run the development server using the following command:

```bash
npm run start:dev
```

7. The backend server should now be up and running at http://localhost:3001.
8. Navigate to the frontend directory in the cloned repository.
9. Run the following command to install dependencies:

```bash
npm install
```

10. Configure the environment variables required for the frontend, such as the backend API URL.
11. Start the frontend development server using the following command:

```bash
npm start
```

12. The frontend development server should now be up and running at http://localhost:3000.

## API Documentation

For API documentation and details on available endpoints, refer to the API documentation page located at /swagger-api when the application is running.
