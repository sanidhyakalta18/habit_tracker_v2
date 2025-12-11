🚀 Habit Tracker v2 (MERN)
A simple and fast Habit Tracking Web App built using the MERN stack.
Track daily habits, update progress, and stay consistent.
⭐ Features
Add, update, delete habits
Daily habit status tracking
Clean and minimal UI
MongoDB for persistent storage
Modular MERN architecture
🛠️ Tech Stack
Frontend: React, Axios
Backend: Node.js, Express.js, MongoDB (Mongoose)
⚙️ Setup
1️⃣ Clone the repo
git clone git@github.com:sanidhyakalta18/habit_tracker_v2.git
cd habit_tracker_v2
2️⃣ Install dependencies
Backend:
cd backend && npm install
Frontend:
cd frontend && npm install
3️⃣ Add .env in backend
MONGO_URI=your_mongo_uri
PORT=5000
4️⃣ Run the app
Backend:
npm run dev
Frontend:
npm start
📌 API Routes
GET /api/habits → Get all habits
POST /api/habits → Add habit
PUT /api/habits/:id → Update habit
DELETE /api/habits/:id → Delete habit
📝 To-Do (Future)
Auth (JWT)
Streaks & analytics
Dark mode
