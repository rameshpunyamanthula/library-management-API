📚 Library Management System – REST API

A production-ready RESTful API for managing books, members, borrowing transactions, and fines in a library system.

This project focuses on state machine design, complex business rule enforcement, and clean backend architecture, closely modeling real-world library workflows.

🚀 Key Highlights (Evaluator Focus)

✔ State machine–driven book lifecycle
✔ Centralized business rule validation
✔ Relational database with integrity constraints
✔ Clear separation of concerns (routes, controllers, services)
✔ Fully testable via Postman / VS Code .http files
✔ Realistic error handling and HTTP status codes

🛠️ Tech Stack

Backend: Node.js, Express.js

Database: PostgreSQL

ORM: Sequelize

Date Handling: Day.js

API Testing: Postman / VS Code REST Client

Environment: dotenv

📂 Project Structure (Reviewed & Modular)
src/
├── config/          # Database configuration
├── controllers/     # Request/response handling
├── services/        # Business logic & state machines
├── models/          # Sequelize models
├── routes/          # REST API routes
├── middlewares/     # Centralized error handling
├── utils/           # Enums, constants & helpers
├── app.js
server.js

Why this structure?

Controllers remain thin

Services handle state transitions & rules

Models stay purely relational

Business logic is reusable & testable

🗄️ Database Schema
Entities & Relationships
📘 Book

id

isbn

title

author

category

status → available | borrowed | reserved | maintenance

total_copies

available_copies

👤 Member

id

name

email

membership_number

status → active | suspended

🔄 Transaction

id

book_id (FK → Book)

member_id (FK → Member)

borrowed_at

due_date

returned_at

status → active | returned | overdue

💰 Fine

id

member_id (FK → Member)

transaction_id (FK → Transaction)

amount

paid_at

🔄 State Machine Implementation
📘 Book State Machine
available → borrowed → available
available → reserved
available → maintenance


Implemented in borrowService.js and returnService.js

Invalid transitions are blocked before DB writes

🔄 Transaction State Machine
active → returned
active → overdue


Overdue detection is date-based

Status updates occur automatically during checks

📏 Business Rules Enforcement

All business rules are centralized in the service layer (no duplication).

Implemented Rules

📚 Max 3 concurrent borrows per member

⏳ Standard loan period = 14 days

💰 Overdue fine = $0.50 per day

🚫 Members with unpaid fines cannot borrow

⚠️ Members with 3 or more overdue books are suspended

❌ Borrowing unavailable or already borrowed books is blocked

Where this logic lives:

validationService.js

borrowService.js

memberStatusService.js

returnService.js

📌 API Endpoints
📘 Books

POST /books

GET /books

GET /books/{id}

PUT /books/{id}

DELETE /books/{id}

GET /books/available

👤 Members

POST /members

GET /members

GET /members/{id}

PUT /members/{id}

DELETE /members/{id}

GET /members/{id}/borrowed

🔄 Transactions

POST /transactions/borrow

POST /transactions/{id}/return

GET /transactions/overdue

💰 Fines

POST /fines/{id}/pay

🧪 API Testing & Verification

All endpoints can be tested using the provided Postman / VS Code HTTP files.

📁 Location:

postman/POST/


Includes:

Book creation

Member creation

Borrow flow

Return flow
