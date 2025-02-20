# Three Good Things

Three Good Things is a web application intended for users to input three good things that happended to them and their role in causing those things to happen every day. This simple practice has been shown to improve the mental health of people who do it.

## Installation

Instructions to set up the project locally:

```bash
# Download necessary programs
# Docker Desktop
# VS Code
# Dev Containers VS Code extension

# Clone the repository
git clone https://github.com/jdahlee/Three-Good-Things.git

# Build and reopen the project in its docker container

# If there is an issue with missing modules on build
cd /app/frontend
npm install
```

## Function

Command commands to run the project locally:

```bash
# Note that both servers should begin automatically with the start of the container

# To start the backend server manually
cd /app/backend
flask run --debug

# The backend server should be available on port 5000

# To start the frontend server manually
cd /app/fronted
npm run dev

# The frontend server should be available on port 5174

```
