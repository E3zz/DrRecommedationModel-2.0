# 🩺 Doctor Recommendation System

A full-stack web application that recommends doctors based on patient history, allows users to book appointments, and give feedback. Built using **Flask (Python)** for the backend, **React.js** for the frontend, and **MongoDB** as the database.

---

## 🚀 Features

- 👨‍⚕️ Recommend doctors based on specialty and user preferences
- 📆 Book appointments with doctors
- 💬 Submit feedback and ratings after appointments
- 🔐 User login and signup
- 🌐 CORS and caching for smooth frontend-backend interaction

---

## 🛠️ Tech Stack

| Layer        | Technology              |
|--------------|--------------------------|
| Frontend     | React.js, Redux Toolkit  |
| Backend      | Flask, Flask-CORS, Flask-Caching |
| Database     | MongoDB (with pymongo)   |
| Others       | Git, REST API, JSON      |

---

## 📂 Project Structure

project-root/
├── backend/
│ ├── app.py # Flask app routes
│ ├── db.py # MongoDB operations (Users, Feedback, Appointments)
│ ├── recommend.py # Doctor recommendation logic
│ ├── config.py # DB connection string
│ └── requirements.txt # Python dependencies
├── frontend/
│ ├── src/
│ │ ├── components/ # React components (NavBar, Feedback, etc.)
│ │ ├── Store/ # Redux store setup
│ │ ├── App.tsx # Main app entry
│ │ └── index.tsx # React DOM rendering
├── README.md

Install dependencies:

bash
Copy
Edit
pip install -r requirements.txt
Run Flask server:

bash
Copy
Edit
python api.py
Make sure MongoDB is running locally or update the connection string in config.py.

⚛️ Frontend (React)
Navigate to frontend:

bash
Copy
Edit
cd frontend
Install dependencies:

bash
Copy
Edit
npm install
Run the React app:

bash
Copy
Edit
npm run dev
🌍 API Endpoints
Method	Route	Description
POST	/login	Login user
POST	/signUp	Signup user
POST	/book	Book an appointment
POST	/feedback	Submit feedback
POST	/getappt	Get booked appointments
GET	/feedback_Data	Get all submitted feedbacks
GET	/Orthopedic etc.	Get doctors by specialty

💡 Future Enhancements
Email notifications for appointments

Admin dashboard for managing doctors/feedback

Search by location and availability

📌 License
MIT License. Feel free to fork, clone, and contribute!

