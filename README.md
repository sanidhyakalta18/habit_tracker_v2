📌 Habit Tracker v2 — MERN Full-Stack App
A simple and effective Habit Tracking Web App built using the MERN stack.
This app helps users track daily habits, monitor progress, and maintain consistency with an easy-to-use interface.
🚀 Features
✔️ Add new habits
✔️ Mark habits as completed/not completed
✔️ Track daily/weekly progress
✔️ Clean UI with responsive design
✔️ Persistent storage using MongoDB
✔️ Secure backend APIs
✔️ Fast and modular MERN architecture
🛠️ Tech Stack
Frontend
React.js
HTML + CSS
Axios (API calls)
Backend
Node.js
Express.js
MongoDB + Mongoose
📂 Project Structure
habit_tracker/
│── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│
│── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── App.js
│
└── README.md
⚙️ Installation & Setup
1️⃣ Clone the repository
git clone git@github.com:sanidhyakalta18/habit_tracker_v2.git
cd habit_tracker_v2
2️⃣ Install dependencies
Backend:
cd backend
npm install
Frontend:
cd ../frontend
npm install
3️⃣ Create a .env file (backend)
Inside backend/.env:
MONGO_URI=your_mongodb_connection_string
PORT=5000
4️⃣ Start the app
Backend server:
npm run dev
Frontend React app:
npm start
📌 API Endpoints
POST /api/habits/
Create a new habit
GET /api/habits/
Fetch all habits
PUT /api/habits/:id
Update a habit (mark complete)
DELETE /api/habits/:id
Delete a habit
🎯 Future Enhancements
🔹 User authentication (JWT)
🔹 Habit streak system
🔹 Graphs & analytics
🔹 Dark mode
🔹 Mobile app version
🤝 Contributing
Pull requests are welcome!
If you want to improve UI, backend APIs, or documentation — feel free to contribute.
⭐ Support
If you like this project, consider ⭐ starring the repo to support!
