# 🎓 Academic Pathway Recommendation Engine

An AI-powered web application that helps users identify the most suitable academic pathway based on their qualifications, professional experience, current profession, and career goals.

The system leverages Google's Gemini AI model to generate personalized academic recommendations and stores valid submissions in Supabase for future reference.

as backend is deployed on render , it takes about 2 min to start the backend because of free service , so please dont judge the speed of backend based on that

---

## 🚀 Features

### Academic Recommendations

* Personalized academic pathway suggestions
* AI-powered decision making using Gemini 2.5 Flash
* Career-goal based analysis
* Experience-aware recommendations

### Supported Recommendations

* PhD
* DBA (Doctor of Business Administration)
* Certification Program
* Honorary Doctorate

### Input Validation

* Email validation
* Experience cannot be negative
* Detection of meaningless or invalid input
* Prevention of invalid submissions being stored

### Submission Management

* Stores valid recommendations in Supabase
* View previous submissions
* Search submissions by:

  * Name
  * Email
  * Career Goal

### Responsive Design

* Mobile-friendly UI
* Tablet support
* Desktop support
* Modern Tailwind CSS interface

---

# 🛠 Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router DOM

## Backend

* Node.js
* Express.js

## Database

* Supabase

## AI Integration

* Google Gemini 2.5 Flash

## Deployment

* Frontend: Vercel
* Backend: Render

---

# 📁 Project Structure

```text
AcdyOn/
│
├── backend/
│   ├── config/
│   │   └── supabase.js
│   │
│   ├── routes/
│   │   └── recommendationRoutes.js
│   │
│   ├── services/
│   │   └── gemini.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── RecommendationForm.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── Submissions.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/1NFINITYY/AcdyOn

cd acdyon
```

---

# Backend Setup

```bash
cd backend

npm install
```

### Create .env

```env
PORT=5000

GEMINI_API_KEY=YOUR_GEMINI_API_KEY

SUPABASE_URL=YOUR_SUPABASE_URL

SUPABASE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
```

### Run Backend

```bash
npm start
```

Backend runs on:

```text
http://localhost:5000
```

---

# Frontend Setup

```bash
cd frontend

npm install
```

### Create .env

```env
VITE_API_URL=http://localhost:5000/api
```

### Run Frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# API Endpoints

## Generate Recommendation

### POST

```http
/api/recommend
```

### Request Body

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "qualification": "B.Tech Computer Science",
  "experience": 5,
  "profession": "Software Engineer",
  "careerGoal": "Become an AI researcher"
}
```

### Response

```json
{
  "success": true,
  "recommendation": "PhD",
  "reason": "A PhD is recommended because your career goals align with research and academic advancement."
}
```

---

## Get Previous Submissions

### GET

```http
/api/submissions
```

---

# Database Schema

## submissions

| Column         | Type      |
| -------------- | --------- |
| id             | bigint    |
| full_name      | text      |
| email          | text      |
| qualification  | text      |
| experience     | integer   |
| profession     | text      |
| career_goal    | text      |
| recommendation | text      |
| created_at     | timestamp |

---

# Validation Rules

The system rejects:

* Invalid email addresses
* Negative experience values
* Random characters
* Gibberish input
* Meaningless academic information

Examples:

```text
asdfgh
qwerty
xyzxyz
123123
```

Invalid submissions are not stored in the database.

---

# Deployment

## Backend (Render)

Environment Variables:

```env
GEMINI_API_KEY=YOUR_KEY

SUPABASE_URL=YOUR_URL

SUPABASE_KEY=YOUR_KEY
```

---

## Frontend (Vercel)

Environment Variable:

```env
VITE_API_URL=https://acdy-on-two.vercel.app/
```

---

# Future Improvements

* University recommendations
* Scholarship suggestions
* Career roadmap generation
* User authentication
* PDF report generation
* Recommendation history dashboard
* AI chat assistant

---

# Author

ANANT JAIN

Computer Science & Engineering Student

