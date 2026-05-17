# TBX Fullstack

This is a fullstack application with a React frontend and an Express Node.js backend. The application interacts with an external API to retrieve, parse, and format CSV files.

## Project Structure

The repository is divided into two main applications:

- **`backend/`**: An Express server providing RESTful endpoints.
- **`frontend/`**: A React application using Webpack and Bootstrap.

### Backend Structure
```text
backend/
├── controllers/   # Route handlers (e.g., filesController)
├── services/      # External API integrations (e.g., echoService)
├── utils/         # Helper functions (CSV parsing, validation)
├── test/          # Mocha/Chai tests
├── server.js      # Express application entry point
├── package.json   
└── .nvmrc         # Specifies Node.js version (v14+)
```

### Frontend Structure
```text
frontend/
├── src/
│   ├── components/  # Reusable UI components (e.g., Header, Layout)
│   ├── pages/       # Page components (e.g., Home)
│   ├── App.js       # Main application component
│   └── index.js     # React entry point
├── public/          # Static assets (index.html)
├── package.json     
├── webpack.config.cjs # Webpack configuration
└── .nvmrc           # Specifies Node.js version (v16+)
```

---

## Running the Application Locally

You can run the frontend and backend separately using Node.js, or run both simultaneously using Docker Compose.

### Prerequisites
- Node.js (v16.20.2 recommended, check `.nvmrc` files)
- npm (v8+)
- Docker and Docker Compose (if using the containerized setup)

### 1. Using Docker Compose (Recommended)

To run the entire stack with a single command:

```bash
docker-compose up --build
```

- The **frontend** will be available at [http://localhost:8080](http://localhost:8080)
- The **backend** API will be available at [http://localhost:3000](http://localhost:3000)

*(Note: If the backend requires environment variables, you may need to export `ECHO_SERVICE_API_KEY` and `ECHO_SERVICE_API_URL` before running `docker-compose up`.)*

### 2. Running Manually

#### Backend

Open a terminal and navigate to the backend folder:
```bash
cd backend
nvm use          # To use the correct Node version
npm install
npm start
```
The server will start on `http://localhost:3000`.

#### Frontend

Open a second terminal and navigate to the frontend folder:
```bash
cd frontend
nvm use          # To use the correct Node version
npm install
npm start
```
The Webpack dev server will start and the React app will be accessible at `http://localhost:8080`.

---

## Testing

Both the frontend and backend have automated tests.

### Backend Tests
The backend uses **Mocha**, **Chai**, and **Sinon** for testing controllers, services, and utils.

```bash
cd backend
nvm use
npm test
```

### Frontend Tests
The frontend uses **Jest** and **React Testing Library** for component testing.

```bash
cd frontend
nvm use
npm test
```

---

## Technical Decisions

### State Management (Why no Redux?)
Although Redux was listed as an optional point for the frontend, it was intentionally omitted in favor of React's built-in Hooks (`useState` and `useEffect`). Given the simplicity of the application—which primarily consists of fetching data from a single endpoint and filtering it—introducing Redux would have added unnecessary boilerplate and complexity (over-engineering) without providing tangible benefits. React's native state management is more than sufficient and keeps the codebase clean and maintainable.
