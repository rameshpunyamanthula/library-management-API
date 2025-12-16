# 📚 Library Management System – REST API

A robust RESTful API for managing books, members, borrowing transactions, and fines in a library system.  
This project demonstrates **state machine implementation**, **business rule enforcement**, and **clean backend architecture**.

---

## 🚀 Features

- Full CRUD operations for Books and Members
- Borrow & Return lifecycle management
- State machine for book availability
- Borrowing limits and fine enforcement
- Automatic overdue detection
- Member suspension based on overdue behavior
- Fine calculation and payment handling

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Utilities:** Day.js
- **Testing:** Postman
- **Environment:** dotenv

---

## 📂 Project Structure

src/
├── config/ # Database configuration
├── controllers/ # Request handling
├── services/ # Business logic & state machines
├── models/ # Sequelize models
├── routes/ # API routes
├── middlewares/ # Error handling
├── utils/ # Enums & helpers
├── app.js
server.js

markdown
Copy code

---

## 🗄️ Database Schema

### Entities

#### Book
- id
- isbn
- title
- author
- category
- status (`available`, `borrowed`, `reserved`, `maintenance`)
- total_copies
- available_copies

#### Member
- id
- name
- email
- membership_number
- status (`active`, `suspended`)

#### Transaction
- id
- book_id (FK)
- member_id (FK)
- borrowed_at
- due_date
- returned_at
- status (`active`, `returned`, `overdue`)

#### Fine
- id
- member_id (FK)
- transaction_id (FK)
- amount
- paid_at

---

## 🔄 State Machine Design

### Book State Transitions
available → borrowed → available
available → reserved
available → maintenance

shell
Copy code

### Transaction State Transitions
active → returned
active → overdue

markdown
Copy code

State transitions are validated inside the **service layer** to prevent invalid operations.

---

## 📏 Business Rules Implemented

- A member can borrow **maximum 3 books**
- Loan period is **14 days**
- Overdue fine: **$0.50 per day**
- Members with **unpaid fines cannot borrow**
- Members with **3+ overdue books are suspended**
- Borrowing unavailable or already borrowed books is prevented

All rules are centralized in the service layer for maintainability.

---

## 📌 API Endpoints

### Books
- `POST /books`
- `GET /books`
- `GET /books/{id}`
- `PUT /books/{id}`
- `DELETE /books/{id}`
- `GET /books/available`

### Members
- `POST /members`
- `GET /members`
- `GET /members/{id}`
- `PUT /members/{id}`
- `DELETE /members/{id}`
- `GET /members/{id}/borrowed`

### Transactions
- `POST /transactions/borrow`
- `POST /transactions/{id}/return`
- `GET /transactions/overdue`

### Fines
- `POST /fines/{id}/pay`

---

## 🧪 API Testing

A **Postman collection** is included in the `/postman` folder for easy testing of all endpoints.

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone <your-repo-url>
cd library-management-api
2️⃣ Install dependencies
bash
Copy code
npm install
3️⃣ Configure environment variables
Create a .env file:

env
Copy code
PORT=3000
DB_NAME=library_db
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=localhost
4️⃣ Run the application
bash
Copy code
npm run dev
Server runs at:

arduino
Copy code
http://localhost:3000







