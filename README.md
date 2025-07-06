# Minimal Library Management System – Backend

This is the **backend** of the Minimal Library Management System built with **Node.js**, **Express**, **MongoDB** using **Mongoose**, and **TypeScript** using **MVC architecture**. The API handles book and borrow management operations with proper validation and error handling.

---

## Features

✅ RESTful API for managing books  
✅ Borrow system with quantity and due date tracking  
✅ MongoDB models and schema validation via Mongoose  
✅ Proper separation of concerns (Controller, Route, Model, Interface)  
✅ Centralized global error handling  
✅ Environment variable support with `dotenv`  
✅ Development support via `ts-node-dev`  
✅ CORS and JSON middleware configured  
✅ Clean and scalable folder structure

---

## Tech Stack

| Layer      | Technology                     |
| ---------- | ------------------------------ |
| Runtime    | Node.js                        |
| Framework  | Express.js                     |
| Language   | TypeScript                     |
| Database   | MongoDB + Mongoose             |
| Dev Tools  | ts-node-dev                    |
| Validation | Manual (Mongoose + Interfaces) |
| Config     | dotenv, cors                   |

---

## Folder Structure

```

src/
├── controllers/          # Logic handlers for book & borrow
│   ├── book.controller.ts
│   └── borrow.controller.ts
├── interfaces/           # TypeScript interfaces for models
│   ├── book.interface.ts
│   └── borrow.interface.ts
├── middlewares/          # Custom middleware (e.g., error handler)
│   └── globalErrorHandler.ts
├── models/               # Mongoose models & schemas
│   ├── book.model.ts
│   └── borrow.model.ts
├── routes/               # All Express routes
│   ├── book.routes.ts
│   └── borrow.routes.ts
├── app.ts                # Express app setup (middleware, routes)
└── server.ts             # Server entry point (port binding, DB connect)

```

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/library-management-system.git
cd server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/library-management (your mongodb uri)
```

---

## Scripts

| Command         | Description                         |
| --------------- | ----------------------------------- |
| `npm run dev`   | Run in development with live reload |
| `npm run build` | Compile TypeScript into `dist/`     |

---

## API Endpoints

### Books

| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| GET    | `/api/books`     | Get all books         |
| POST   | `/api/books`     | Create a new book     |
| GET    | `/api/books/:id` | Get single book by ID |
| PUT    | `/api/books/:id` | Update book by ID     |
| DELETE | `/api/books/:id` | Delete book by ID     |

### Borrow

| Method | Endpoint      | Description                    |
| ------ | ------------- | ------------------------------ |
| POST   | `/api/borrow` | Borrow a book                  |
| GET    | `/api/borrow` | Aggregated borrow summary list |

---

## Error Handling

A centralized `globalErrorHandler.ts` is used to catch and format all thrown errors, ensuring clean responses and easier debugging.

---

## Live Deployment

- **Frontend:** [https://your-frontend.vercel.app](#)
- **Backend:** [https://your-backend-api.onrender.com](#)

---

## Developer

Built by [Shipan Mallik](https://github.com/mshipan)

---

## License

This project is licensed under the MIT License.
