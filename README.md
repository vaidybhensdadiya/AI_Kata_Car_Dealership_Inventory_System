# Car Dealership Inventory System (TDD Kata)

A full-stack Car Dealership Inventory System built following strict **Test-Driven Development (TDD)** (RED $\rightarrow$ GREEN $\rightarrow$ REFACTOR) principles with Django REST Framework, JWT Token Authentication, SQLite database, and a React + Tailwind CSS interactive single-page application (SPA).

---

## Technical Stack & Architecture

### Backend
- **Framework**: Django 5.2 & Django REST Framework (DRF)
- **Authentication**: SimpleJWT Token-Based Authentication (`/api/auth/register/`, `/api/auth/login/`, `/api/auth/me/`)
- **Database**: SQLite
- **Testing Framework**: Pytest (`pytest-django`) with 40 unit and API integration tests (100% pass rate)

### Frontend
- **Framework**: React (Vite)
- **Styling**: Vanilla CSS & Tailwind CSS (Dark Glassmorphism Luxury UI)
- **Icons**: Lucide React
- **HTTP Client**: Axios with JWT Authorization Header Interceptors
- **State & Router**: React Context (`AuthContext`) & React Router v6

---

## Completed TDD Features

| # | Feature | Endpoint / Component | Status |
|---|---|---|---|
| 1 | Project Setup | Skeleton & Repository Configuration | Completed |
| 2 | User Registration | `POST /api/auth/register/` | Completed |
| 3 | User Login | `POST /api/auth/login/` | Completed |
| 4 | Protected User Profile | `GET /api/auth/me/` | Completed |
| 5 | Add Vehicle (Admin) | `POST /api/vehicles/` | Completed |
| 6 | List All Vehicles | `GET /api/vehicles/` | Completed |
| 7 | Search & Multi-Filter | `GET /api/vehicles/search/` | Completed |
| 8 | Update Vehicle (Admin) | `PUT /api/vehicles/:id/` | Completed |
| 9 | Delete Vehicle (Admin) | `DELETE /api/vehicles/:id/` | Completed |
| 10 | Purchase Vehicle | `POST /api/vehicles/:id/purchase/` | Completed |
| 11 | Restock Vehicle (Admin) | `POST /api/vehicles/:id/restock/` | Completed |
| 12 | Auth Context & Axios Interceptor | `AuthContext.jsx` & `axiosClient.js` | Completed |
| 13 | Auth Pages | `LoginPage.jsx` & `RegisterPage.jsx` | Completed |
| 14 | Navigation & Header Layout | `Navbar.jsx` | Completed |
| 15 | Vehicle Cards & Grid | `VehicleCard.jsx` & `VehicleGrid.jsx` | Completed |
| 16 | Multi-Filter Toolbar | `SearchToolbar.jsx` | Completed |
| 17 | Purchase Workflow | `PurchaseModal.jsx` | Completed |
| 18 | Admin KPI Dashboard Banner | `AdminStats.jsx` | Completed |
| 19 | Add Vehicle Modal | `AddVehicleModal.jsx` | Completed |
| 20 | Edit Vehicle Modal | `EditVehicleModal.jsx` | Completed |
| 21 | Restock & Delete Modals | `RestockModal.jsx` & `DeleteConfirmModal.jsx` | Completed |

---

## Running the Project Locally

### 1. Backend Setup & Server

```bash
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

The backend REST API server will run at `http://127.0.0.1:8000/api/`.

### 2. Running Backend Tests

```bash
cd backend
.\venv\Scripts\pytest
```

---

## Development Prompts Log

All RED $\rightarrow$ GREEN $\rightarrow$ REFACTOR prompts and results are documented in [PROMPTS.md](file:///c:/Users/User/OneDrive/Desktop/AI_Kata_Car_Dealership_Inventory_System/PROMPTS.md).
