# Car Dealership Inventory System

A full-stack, production-grade Car Dealership Inventory System built following strict **Test-Driven Development (TDD)**, clean coding standards, and AI transparent co-authorship guidelines.

## Features

- **JWT Authentication & Authorization**: Registration, Login, Protected Endpoints, Role-Based Access Control (Admin vs Customer).
- **Vehicle Catalog**: Browse, live multi-filter search (make, model, category, price range), stock tracking.
- **Inventory Actions**: Purchase vehicles (decreases quantity with 0-quantity safeguards), Admin restocking (increases quantity).
- **Admin Dashboard**: Comprehensive CRUD operations (Add, Edit, Delete, Restock) for dealership managers.
- **Responsive UI**: SPA powered by React, Tailwind CSS, and Lucide Icons.

## Tech Stack

- **Backend**: Python 3.x, Django 5, Django REST Framework (DRF), SimpleJWT, Pytest
- **Database**: SQLite (Persistent DB stored at `backend/db.sqlite3`)
- **Frontend**: React 18, Vite, Tailwind CSS v3, Axios, React Router v6

---

## Setup & Local Execution Instructions

### Prerequisites
- Python 3.10+
- Node.js 18+ and npm

### Backend Setup
1. Navigate to `backend/`:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run database migrations:
   ```bash
   python manage.py migrate
   ```
5. Run unit tests using pytest:
   ```bash
   pytest
   ```
6. Start Django development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to `frontend/`:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start frontend dev server:
   ```bash
   npm run dev
   ```

---

## My AI Usage

### AI Tools Used
- **Antigravity AI (Google DeepMind)**: Served as pair programmer, test architect, and co-author following TDD workflows.

### Workflow & Impact
- AI assistance was leveraged to construct robust test cases first (RED), generate minimal passing implementations (GREEN), and refactor for clean architectural design (REFACTOR).
- Every commit generated in this repository explicitly attributes co-authorship via git commit trailers.
- All prompts written and responses generated are recorded in [PROMPTS.md](PROMPTS.md).

---

## License
MIT License
