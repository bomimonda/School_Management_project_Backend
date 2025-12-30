# School Management System - Backend

This is a backend project for a School Management System built using Node.js and Express.js.

The system supports three user roles: **Admin, Teacher, and Student**, each with a unique ID format and specific functionalities.

---

## User Roles & ID Format
- **Student ID:** ST1929292  
- **Teacher ID:** TE17277272772  
- **Admin ID:** AD272772727 (hardcoded for demo/testing)

---

## Role Responsibilities

### Admin
- Create Students, Teachers, and Classes  
- Manage overall system data  

### Teacher
- Mark student attendance  
- Send attendance messages to parents via WhatsApp  
- Create student results  

### Student
- View attendance  
- View results  
- Pay school fees using Stripe payment gateway  

> **Note:** Admin data is hardcoded for demonstration purposes. In real-world applications, it should be stored securely in a database or environment variables.

---

## Features
- Role-based authentication & authorization  
- Attendance management  
- Result management  
- Fee management via Stripe  
- WhatsApp notifications for parents  
- RESTful APIs  
- Development-friendly workflow using **nodemon**  

---

## Tech Stack
- Node.js  
- Express.js  
- MongoDB  
- JavaScript  
- Stripe Payment Gateway  
- WhatsApp API  
- Nodemon (for development)

---

## Project Structure
- **Controller:** Business logic  
- **Routes:** API endpoints  
- **Model:** Database schemas  
- **index.js:** Entry point of the server  

---

## Database Collections
- **Student:** Stores student details and IDs  
- **Teacher:** Stores teacher details and IDs  
- **Result:** Stores exam results per student  
- **Attendance:** Tracks student attendance  
- **Fee:** Tracks fee payments via Stripe  

---

## API Endpoints (Examples)
- POST `/api/students` → Add new student  
- GET `/api/students` → Get all students  
- POST `/api/teachers` → Add new teacher  
- POST `/api/attendance` → Mark attendance  
- GET `/api/results/:studentId` → Get student results  
- POST `/api/fees` → Pay student fees  

---

## How to Run
1. Clone the repository  
2. Install dependencies:
   ```bash
   npm install
