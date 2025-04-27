# 📚 EduConnect

EduConnect is a full-stack education management platform built with **Next.js**, **Node.js**, **Express**, **MongoDB**, and **Socket.io**.  
It enables seamless communication and management between **Admins**, **Teachers**, and **Students** — including user authentication, placements, notice boards, real-time chat, assignments, notes sharing, and more.

🌐 **Live Website**: [https://edu-connect-lovat-rho.vercel.app](https://edu-connect-lovat-rho.vercel.app)

---

## 🚀 Tech Stack

- **Frontend:** Next.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Tokens)
- **Real-Time Communication:** Socket.io
- **File Uploads:** Cloudinary
- **Other Tools:** Multer, Bcryptjs, CORS, dotenv

---

## 📂 Project Structure (Backend)

```
/backend
 ├── /routes
 │    ├── adminRoutes.js
 │    ├── studentRoutes.js
 │    └── teacherRoutes.js
 ├── /controllers
 ├── /models
 ├── /middlewares
 ├── /utils
 ├── server.js
```

---

## 📌 Key Features

### 🔒 Authentication
- Separate login/registration for Admins, Students, and Teachers.
- Role-based JWT authorization.

### 👨‍💻 Admin Portal
- Add / Update / Delete Students and Teachers.
- Manage Placements: Add, Update, Delete, View Applicants.
- Post and Manage Notices.

### 👩‍🎓 Student Portal
- View Profile (Read-only).
- Apply for Placement opportunities.
- Submit Assignments, Download Notes.
- Real-time Chat with Teachers.
- Access Notice Board and Study Materials.

### 👨‍🏫 Teacher Portal
- Upload Notes and Assignments.
- View Student Assignment Submissions.
- Chat with Students in real-time.
- View Student Profiles.

### 💬 Real-Time Chat
- Instant messaging between Students and Teachers using Socket.io.

---

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/educonnect.git
cd educonnect
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 4. Create `.env` File in `/backend`
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 5. Run the Application

#### Backend
```bash
npm run dev
```

#### Frontend
```bash
npm run dev
```

> App will be available on:
> - Frontend: `http://localhost:3000`
> - Backend: `http://localhost:5000`

---

## 📑 API Endpoints Overview

### 🔹 Admin APIs
| Method | Route | Description |
|:------|:------|:------------|
| POST | `/api/admin/register` | Admin Registration |
| POST | `/api/admin/login` | Admin Login |
| GET | `/api/admin/verify-token` | Verify Admin Token |
| POST | `/api/admin/add/student` | Add Student |
| POST | `/api/admin/add/studentsbulk` | Bulk Upload Students |
| PUT | `/api/admin/students/update/:id` | Update Student |
| DELETE | `/api/admin/students/delete/:id` | Delete Student |
| GET | `/api/admin/students` | Get All Students |
| POST | `/api/admin/add/placement` | Add Placement |
| GET | `/api/admin/placements` | Get All Placements |

### 🔹 Student APIs
| Method | Route | Description |
|:------|:------|:------------|
| POST | `/api/student/register` | Student Registration |
| POST | `/api/student/login` | Student Login |
| GET | `/api/student/verify-token` | Verify Student Token |
| GET | `/api/student/notes` | Get Notes |
| POST | `/api/student/submit-assignment/:assignmentId` | Submit Assignment |
| POST | `/api/student/placements/apply/:id` | Apply for Placement |
| GET | `/api/student/profile` | Get Student Profile |

### 🔹 Teacher APIs
| Method | Route | Description |
|:------|:------|:------------|
| POST | `/api/teacher/register` | Teacher Registration |
| POST | `/api/teacher/login` | Teacher Login |
| GET | `/api/teacher/verify-token` | Verify Teacher Token |
| POST | `/api/teacher/notes/upload` | Upload Notes |
| POST | `/api/teacher/assignments/upload` | Upload Assignment |
| GET | `/api/teacher/students` | View Students |
| GET | `/api/teacher/assignments` | Get Assignments |

---

## 📸 Screenshots

> (Add project screenshots here if available.)

---

## 🧠 Future Enhancements
- Admin Dashboard with Analytics.
- Online Test and Quiz functionality for Students.
- Push Notifications for Assignments and Notices.
- Mobile App for EduConnect (React Native / Flutter).
- Group Chats for Classroom discussions.

---



