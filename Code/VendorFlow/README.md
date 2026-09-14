# VendorFlow

A SaaS platform prototype for digitizing local grocery store and pharmacy operations. Built with **Spring Boot** backend and **React + Tailwind CSS** frontend.

---

## 📽️ Demo

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@vendorflow.com | password123 |
| Vendor | quickmart@vendorflow.com | password123 |
| Vendor | freshstore@vendorflow.com | password123 |
| Customer | customer@vendorflow.com | password123 |

---

## 🧠 Smart Vendor Routing Algorithm

The core feature of VendorFlow is its **weighted scoring algorithm** that automatically assigns orders to the best vendor:

```
Score = (0.4 × 1/(1 + distance_km))
      + (0.3 × stockAvailable)
      + (0.3 × reliabilityScore / 5)
```

Vendors are ranked by score — the highest scorer fulfills the order. This balances **proximity**, **stock availability**, and **store reliability**.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Java 17 + Spring Boot 3.2 + Spring Security |
| Auth | JWT (JJWT 0.12) + Role-Based Access Control |
| Database | PostgreSQL + Hibernate JPA |
| Frontend | React 18 + Vite + Tailwind CSS |
| HTTP Client | Axios |
| Routing | React Router v6 |

---

## 👥 Roles (RBAC)

| Role | Capabilities |
|------|-------------|
| **Customer** | Browse products, manage cart, place orders, view routing result |
| **Vendor** | Register store, manage inventory (add/edit products) |
| **Admin** | Approve/reject vendor registrations, view all vendors |

---

## 🗂️ Project Structure

```
VendorFlow/
├── backend/                     # Spring Boot API
│   ├── pom.xml
│   └── src/main/java/com/vendorflow/
│       ├── config/              # Spring Security config
│       ├── controller/          # REST endpoints
│       ├── dto/                 # Request/Response DTOs
│       ├── entity/              # JPA entities
│       ├── repository/          # Spring Data repositories
│       ├── security/            # JWT filter & utilities
│       ├── service/             # Business logic
│       └── util/                # Haversine distance, routing, security
└── frontend/                    # React app
    ├── src/
    │   ├── api/                 # Axios instance
    │   ├── components/          # Reusable UI components
    │   ├── context/             # Auth context
    │   └── pages/               # Page components
    └── package.json
```

---

## 🚀 Running Locally

### Prerequisites
- Java 17+
- Node.js 18+
- PostgreSQL 14+
- Maven 3.8+

### 1. Database Setup

```sql
CREATE DATABASE vendorflow;
```

### 2. Configure Database

Edit `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/vendorflow
spring.datasource.username=postgres
spring.datasource.password=YOUR_PASSWORD
```

### 3. Start Backend

```bash
cd backend
mvn spring-boot:run
```

Backend starts at `http://localhost:8080`  
> Schema auto-created + seed data loaded on every startup.

### 4. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend starts at `http://localhost:5173`

---

## 📡 REST API Endpoints

### Auth
| Method | URL | Access | Description |
|--------|-----|--------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login → returns JWT |

### Vendors
| Method | URL | Access | Description |
|--------|-----|--------|-------------|
| GET | `/api/vendors/approved` | Public | List approved vendors |
| GET | `/api/vendors` | Admin | List all vendors (filter by status) |
| POST | `/api/vendors` | Vendor | Submit store for approval |
| PATCH | `/api/vendors/{id}/approve` | Admin | Approve vendor |
| PATCH | `/api/vendors/{id}/reject` | Admin | Reject vendor |

### Products
| Method | URL | Access | Description |
|--------|-----|--------|-------------|
| GET | `/api/products` | Public | List all products |
| POST | `/api/products` | Vendor | Add product |
| PUT | `/api/products/{id}` | Vendor | Update product |

### Orders
| Method | URL | Access | Description |
|--------|-----|--------|-------------|
| POST | `/api/orders` | Customer | Place order |
| POST | `/api/orders/{id}/route` | Customer | Run smart routing |
| GET | `/api/orders/{id}` | Auth | Get order details |

---

## 🌱 Seed Data

The app seeds **4 users**, **2 vendors**, and **7 products** on every startup.

| Vendor | Distance from demo location | Reliability | Apple Stock |
|--------|-----------------------------|-------------|-------------|
| QuickMart | ~0.7 km | 3.0 / 5 | 2 units |
| FreshStore | ~20 km | 4.8 / 5 | 50 units |

---

## 📦 Out of Scope (Phase 1)

- Payment processing
- Real-time delivery tracking
- Push notifications
- Wallet / credits
- Reviews & ratings
- Prescription verification

---

## 👨‍💻 Built With

- [Spring Boot](https://spring.io/projects/spring-boot)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PostgreSQL](https://www.postgresql.org/)
