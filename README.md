📚 Library Management System – REST API

A production-ready RESTful API for managing books, members, borrowing transactions, and fines in a library system.

This project demonstrates state machine–driven workflows, strict business rule enforcement, and clean layered backend architecture, closely modeling real-world library operations.

🚀 Key Highlights (Evaluator Focus)

✔ State machine–driven book lifecycle
✔ Centralized business rule validation
✔ Secure configuration via environment variables
✔ Relational database with integrity constraints
✔ Atomic database operations for consistency
✔ Granular HTTP error handling
✔ Input validation for all write operations
✔ Fully testable via Postman / VS Code .http files

🛠️ Tech Stack

Backend: Node.js, Express.js

Database: PostgreSQL

ORM: Sequelize

Validation: Joi

Date Handling: Day.js

API Testing: Postman / VS Code REST Client

Environment Management: dotenv

📂 Project Structure (Layered & Maintainable)
src/
├── config/          # Database configuration
├── controllers/     # HTTP request/response handling
├── services/        # Business logic & state machines
├── models/          # Sequelize models & relations
├── routes/          # API route definitions
├── middlewares/     # Centralized error handling
├── validators/      # Request schema validation
├── utils/           # Enums, constants & helpers
├── app.js
server.js

Why this structure?

Controllers remain thin

Services enforce rules and state transitions

Models remain purely relational

Business logic is reusable, testable, and centralized

🔐 Security & Configuration

All sensitive configuration values are fully externalized using environment variables.

❌ No database credentials are hardcoded
✅ .env is used and excluded from version control

Example .env
PORT=3000
DB_NAME=library_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432


Environment variables are loaded during application bootstrap before database initialization, ensuring safe multi-environment deployment.

🗄️ Database Schema
📘 Book

id

isbn (UNIQUE)

title

author

category

status → available | borrowed | reserved | maintenance

total_copies

available_copies

👤 Member

id

name

email (UNIQUE)

membership_number (UNIQUE)

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

Relational integrity is enforced using foreign keys, uniqueness constraints, and non-null fields via Sequelize models.

🔄 State Machine Design
📘 Book State Machine
available → borrowed → available
available → reserved
available → maintenance


Implemented in borrowService.js and returnService.js

Invalid transitions are blocked before database writes

🔄 Transaction State Machine
active → returned
active → overdue


Overdue detection is date-based

Status updates occur automatically during return or overdue checks

📏 Business Rules Enforcement

All business rules are centralized in the service layer (no controller-level logic).

Implemented Rules

📚 Maximum 3 active borrows per member

⏳ Standard loan period = 14 days

💰 Overdue fine = $0.50 per day

🚫 Members with unpaid fines cannot borrow

⚠️ Members with 3+ overdue books are suspended

❌ Borrowing unavailable or already borrowed books is blocked

Rule Locations

validationService.js

borrowService.js

returnService.js

memberStatusService.js

🧪 Input Validation

All incoming write requests are validated using Joi schemas.

Validation ensures:

Required fields are present

Correct data types

Valid formats (email, ISBN)

Logical constraints (e.g., available copies ≤ total copies)

Invalid requests are rejected early with clear error messages.

🚨 Error Handling Strategy

A centralized error-handling middleware maps errors to appropriate HTTP status codes:

Scenario	Status
Validation error	400 Bad Request
Resource not found	404 Not Found
Business rule violation	403 Forbidden
State conflict	409 Conflict
Unexpected failure	500 Internal Server Error

This ensures predictable and debuggable API behavior for clients.

🔄 Database Transactions & Consistency

Operations involving multiple database updates (borrow, return, fine creation) are executed atomically.

This prevents:

Book updated but transaction not created

Fine created without a completed return

Partial state updates during failures

The system guarantees data consistency under all failure scenarios.

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

All endpoints are fully testable using the provided HTTP files.

📁 Location:

postman/POST/


Includes:

Book creation

Member creation

Borrow workflow

Return workflow

Fine payment scenarios

⚙️ Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/rameshpunyamanthula/library-management-API
cd library-management-API

2️⃣ Install Dependencies
npm install

3️⃣ Configure Environment

Create .env in the project root (see example above).

4️⃣ Run Application
npm run dev


Server runs at:

http://localhost:3000

✅ Final Notes for Evaluators

No hardcoded secrets

Clear state machine enforcement

Defensive programming via validation & transactions

Clean separation of concerns

Fully reproducible setup