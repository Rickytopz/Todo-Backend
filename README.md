This is the backend for a simple Todo application, built using Node.js (Express.js) and MongoDB. It provides a REST API for managing tasks, including creating, reading, updating, and deleting tasks.

Features
📌 Create tasks
✅ Mark tasks as completed or pending
🔍 Fetch all tasks from the database
✏️ Update task details
🗑️ Delete tasks
📝 API documentation with Swagger
🛠️ Error handling and logging
🛠️ Installation & Setup
1️⃣ Clone the repository
Open your terminal and run:

git clone https://github.com/Rickytopz/Todo-Backend.git
cd Todo-Backend
2️⃣ Install dependencies
Run the following command to install all required packages:

npm install
3️⃣ Set up environment variables
Create a .env file in the root directory and add:

env
MONGO_URI=mongodb://localhost:27017/todo-app
PORT=5000
Make sure MongoDB is running before starting the server.

4️⃣ Start the backend server
Run:

npm start
OR, for development mode (with auto-reload):

npm run dev
By default, the server runs on http://localhost:5000.

📌 API Endpoints
Method	Endpoint	Description
GET	/tasks	Get all tasks
POST	/tasks	Create a new task
PUT	/tasks/:id	Update a task (title/status)
DELETE	/tasks/:id	Delete a task
Example Request (Create Task)
POST /tasks
Content-Type: application/json

{
  "title": "Buy groceries",
  "completed": false
}
Example Response
{
  "_id": "123456789",
  "title": "Buy groceries",
  "completed": false,
  "createdAt": "2025-03-18T12:00:00.000Z",
  "updatedAt": "2025-03-18T12:00:00.000Z"
}
📝 API Documentation with Swagger
To access API documentation, visit:

📌 http://localhost:5000/api-docs

Swagger provides a user-friendly UI to test all API endpoints.

🔧 Built With
Node.js & Express.js - Backend framework
MongoDB & Mongoose - Database & ORM
Swagger - API documentation
dotenv - Manage environment variables
nodemon - Auto-reload for development
🏗️ Folder Structure
/todo-backend
│── models/         # Mongoose schema (Task.js)
│── routes/         # API routes (taskRoutes.js)
│── .env            # Environment variables
│── package.json    # Dependencies & scripts
│── server.js       # Main Express app
└── README.md       # Project documentation
🚀 Deployment
To deploy this backend:

Use a cloud database like MongoDB Atlas instead of localhost
Deploy on platforms like:
Railway
Render
Vercel (backend)
DigitalOcean
🛠️ Troubleshooting
MongoDB not connecting?
→ Ensure MongoDB is running locally OR update your .env file with the correct URI.
Port already in use?
→ Change PORT in .env or kill the process using kill -9 <pid>.
Swagger UI not working?
→ Make sure you've included the Swagger middleware in server.js.
📜 License
This project is open-source. Feel free to modify and improve it!

