# AI Tooling Chat History (PROMPTS.md)

This file contains the prompt history and workflow interactions used during the development of the Car Dealership Inventory System following strict Test-Driven Development (TDD) principles.

---

## Phase 1: Setup

### Feature 1: Project Repository & Skeleton Setup
**Prompt (Setup):**
> Initialize project skeleton for Car Dealership Inventory System with Django REST Framework backend, React + Vite + Tailwind CSS frontend, pytest suite setup, git tracking, PROMPTS.md, and README.md.

---

## Feature 2: User Registration (POST /api/auth/register)

### RED
**Prompt:**
> Follow strict TDD. Do not implement production code yet. Write failing pytest cases for User Registration in Django REST Framework covering successful registration, missing username, missing password, duplicate username, and duplicate email validation.

**Result:**
5 pytest test cases written in `backend/inventory/tests/test_auth.py`. Ran test suite with status: **5 Failed (RED)**.

### GREEN
**Prompt:**
> Implement the minimum Django REST Framework code required to make all User Registration tests pass. Do not refactor.

**Result:**
Implemented `RegisterSerializer`, `RegisterView`, and URL routing. Ran test suite with status: **5 Passed (GREEN)**.

### REFACTOR
**Prompt:**
> Refactor the registration implementation to improve code structure, add comprehensive docstrings and type annotations, and ensure email uniqueness validation is case-insensitive. Keep behavior unchanged and ensure all existing tests pass.

**Result:**
Refactored `RegisterSerializer` with docstrings and type annotations. Ran test suite with status: **5 Passed (REFACTOR)**.

---

## Feature 3: User Login (POST /api/auth/login)

### RED
**Prompt:**
> Follow strict TDD. Write failing pytest cases for User Login in Django REST Framework covering successful authentication (returning JWT access/refresh tokens and user details), invalid password, non-existent username, and missing credentials.

**Result:**
4 new pytest cases added to `backend/inventory/tests/test_auth.py`. Ran test suite: **4 Failed, 5 Passed (RED)**.

### GREEN
**Prompt:**
> Implement the minimum Django REST Framework code required to make all User Login tests pass. Do not refactor.

**Result:**
Implemented `LoginView` using `RefreshToken.for_user` and URL routing. Ran test suite: **9 Passed (GREEN)**.

### REFACTOR
**Prompt:**
> Refactor the user login view implementation to improve code structure and add docstrings while keeping exact functionality. Ensure all existing tests pass.

**Result:**
Refactored `LoginView` with clean docstrings and formatted response structures. Ran test suite: **9 Passed (REFACTOR)**.

---

## Feature 4: Protected Routes & JWT Authentication Middleware

### RED
**Prompt:**
> Follow strict TDD. Write failing pytest cases for Protected Endpoints (/api/auth/me/) in Django REST Framework verifying that requests without tokens return 401, invalid tokens return 401, and valid JWT Bearer tokens grant 200 OK access with user details.

**Result:**
3 new pytest cases added to `backend/inventory/tests/test_auth.py`. Ran test suite: **3 Failed, 9 Passed (RED)**.

### GREEN
**Prompt:**
> Implement the minimum Django REST Framework code required to make all Protected Endpoint tests pass. Do not refactor.

**Result:**
Implemented `UserProfileView` with `IsAuthenticated` permission and URL routing. Ran test suite: **12 Passed (GREEN)**.

### REFACTOR
**Prompt:**
> Refactor User Profile view and Login view to utilize a centralized UserSerializer for formatting user data representations across endpoints. Ensure all existing tests pass.

**Result:**
Created `UserSerializer` and simplified `LoginView` and `UserProfileView`. Ran test suite: **12 Passed (REFACTOR)**.

---

## Feature 5: Add Vehicle (POST /api/vehicles)

### RED
**Prompt:**
> Follow strict TDD. Write failing pytest cases for Add Vehicle endpoint in Django REST Framework testing admin creation permission (201), non-admin forbidden (403), unauthenticated rejection (401), negative price validation (400), negative quantity validation (400), and missing required fields (400).

**Result:**
6 new pytest cases added to `backend/inventory/tests/test_vehicles.py`. Ran test suite: **6 Failed, 12 Passed (RED)**.

### GREEN
**Prompt:**
> Implement the minimum Django REST Framework code (Vehicle model, VehicleSerializer, IsAdminUserOnly permission, VehicleListCreateView) required to make all Add Vehicle tests pass. Do not refactor.

**Result:**
Implemented Vehicle model, serializers, permissions, views, and initial migrations. Ran test suite: **18 Passed (GREEN)**.



