# Blog Application

## Table of contents

- [Blog application](#Blog Application)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The Features](#the-features)
  - [My process](#my-process)
  - [link](#link)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
    - [API Endpoints](#api-endpoints)

## Overview

- A simple blog application that allows users to register, log in, log out, and perform CRUD (Create, Read, Update, Delete) operations on blog posts. This application ensures that only authorized users can update and delete their own posts, and only authenticated users can view and create blogs.

### The Features

- register user
- login user
- logout user
- CRUD Operations: Users can create, read, update, and delete their blog posts.
- Authorization: Only authenticated users can access certain routes and operations.

## My process

### Prerequisites

- Node.js
- MongoDB

### Installation

1.Clone the repository: //git clone https://github.com/G-Gakii/Blog-app.git

- cd blogApp

2. Install server dependencies:

   - cd backend
   - npm install

3. Make sure MongoDB is running on your system.

### Running the Application

1. Start the backend server:
   - cd backend
   - npm start
   -

## BASE URL

- ## link

https://blog-app-1-0foy.onrender.com

### API Endpoints

- `POST /api/blog/register` - register user
- `POST /api/blog/login` - login user
- `GET /api/blog/logout` - log out user
- `GET /api/blog/blogs` - Retrieve all blogs
- `POST /api/blog/blogs` - Create a new blog
- `PUT /api/blog/blogs/:id` - Update a blog by ID
- `DELETE /api/blog/blogs/:id` - Delete a blog by ID
