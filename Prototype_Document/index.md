---
layout: default
title: VendorFlow - Local Vendor E-Commerce Platform
---

# Thapar Institute of Engineering and Technology
## Department of Computer Science and Engineering (CSED)

# VendorFlow: Local Vendor E-Commerce Platform

**Author(s):**
* Pranjal Chitravanshi (Roll No: 1024240031)
* Kunal Thakur (Roll No: 1024240018)
* Mannat Saini (Roll No: 1024240017)

**Submitted to:** Dr. Jeelani  
**Date:** September 2026

---

## Project Overview
VendorFlow is a scalable, production-oriented localized e-commerce platform built with React and Java Spring Boot. It is designed to overcome the limitations local businesses face when competing against large quick-commerce platforms by providing an accessible, dedicated digital storefront. The platform separates customer browsing, vendor onboarding, product inventory management, and order processing into robust, independent modules, ensuring high performance, fault tolerance, and a seamless user experience.

## System Architecture
The system follows a modern, scalable client-server architecture:

* **Frontend Service (Customer & Vendor Portals):** Built using React, Vite, and Tailwind CSS. It provides highly dynamic and responsive user interfaces for shop discovery, cart management, and vendor operational dashboards.
* **Backend Application Framework:** Powered by Java Spring Boot (v3.2.3), securely handling business logic, API routing, and complex data validation.
* **Authentication & Authorization:** Utilizes Spring Security (v6.x) and JJWT for secure, token-based user sessions, backed by BCrypt for password hashing.
* **Database Abstraction & ORM:** Uses Spring Data JPA and Hibernate ORM (v6.4.4) for efficient object-relational mapping and database interaction.
* **Storage Layer (PostgreSQL):** A robust relational database (v17) paired with HikariCP connection pooling to persistently store user profiles, shop details, product inventories, and transactional order histories.

## Core Workflow
1. Local vendors are onboarded via a multi-step registration pipeline to establish their digital storefronts and configure their operations.
2. The frontend service renders category-based product listings mapped to specific local shops.
3. Customers discover nearby shops, browse products, and add items to a dynamic shopping cart.
4. User checkouts and orders are received by the Spring Boot backend coordinator, processed securely, and logged into the PostgreSQL database.
5. The vendor dashboard retrieves real-time order updates, allowing local business owners to manage inventory and update delivery statuses seamlessly.
6. Final order confirmations and status changes are reflected instantly on the customer's interface.

## Evaluation Criteria

**Primary metrics:**
* End-to-end checkout latency — order processing response time under concurrent user loads.
* Vendor onboarding success rate and interface usability/accessibility.

**Secondary metrics:**
* API request processing limits (queries processed per second by Spring Boot).
* Database query execution and retrieval time (PostgreSQL optimization).
* System availability and uptime.
* Resource utilization (CPU/memory under concurrent load during peak shopping hours).

## Installation

To run the project locally:

```bash
# Clone the repository
git clone https://github.com/Agambir-singh/VendorFlow.git

# --- FRONTEND SETUP ---
# Navigate to the frontend directory
cd VendorFlow/Code/frontend

# Install dependencies and run the development server
npm install
npm run dev

# --- BACKEND SETUP ---
# Open a new terminal, navigate to the backend directory (once initialized)
cd VendorFlow/Code/backend

# Run the Spring Boot application using Maven
mvn spring-boot:run
```
