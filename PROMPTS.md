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
