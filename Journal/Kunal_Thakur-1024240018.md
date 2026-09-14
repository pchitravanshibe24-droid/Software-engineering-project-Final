
### Role: Backend & Database Lead — VendorFlow

---

## Week 1
**Worked on:** Learned Java fundamentals and Spring Boot basics (dependency injection, annotations, layered architecture). Set up the initial Spring Boot project and dependencies. Helped draft system architecture and the first database schema.
**Blockers:** Spring Boot's auto-configuration was confusing at first coming from a manual-setup background.
**Learnings:** Core Java/OOP, Spring Boot's auto-configuration model.

## Week 2
**Worked on:** Finalized database schema. Set up PostgreSQL + pgAdmin. Learned JPA basics and wrote first entity classes (`User`, `Vendor`, `Product`).
**Blockers:** Got a relationship mapping wrong (`@OneToOne` vs `@OneToMany`), had to fix the generated schema.
**Learnings:** How JPA maps Java classes to SQL tables; importance of schema design before coding entities.

## Week 3
**Worked on:** Implemented JWT authentication (`JwtUtil`, `JwtFilter`), `/api/auth/register` and `/login`, BCrypt password hashing, and role-based access control (RBAC). Built vendor onboarding endpoint.
**Blockers:** Spring Security filter chain rejected valid tokens due to incorrect filter ordering.
**Learnings:** How Spring Security's filter chain works; stateless JWT auth; enforcing RBAC at the framework level.

## Week 4
**Worked on:** Built admin vendor approval endpoints and inventory management APIs (`POST/PUT /api/products`). Introduced DTOs instead of exposing entities directly. Added public browse endpoints.
**Blockers:** A vendor could edit another vendor's product via URL manipulation — missing ownership check.
**Learnings:** Why DTOs matter; resource-level (not just role-level) authorization.

## Week 5
**Worked on:** Implemented `Order`/`OrderItem` entities and order placement endpoint. Built the **Smart Vendor Routing** algorithm — `HaversineUtil` for distance, `RoutingUtil` for weighted scoring (distance/stock/reliability), and the `/api/orders/:id/route` endpoint returning ranked candidates.
**Blockers:** Initial Haversine formula had a degrees/radians unit bug, giving wrong distances.
**Learnings:** Geospatial distance calculation; designing a weighted scoring algorithm; returning full computation transparency in API responses.

## Week 6
**Worked on:** Wired the full order → routing → confirmation flow end-to-end. Wrote `data.sql` seed data (4 users, 2 vendors, 7 products). Set up the actual `vendorflow` database and config. Debugged and fixed a database naming typo and a malformed BCrypt hash blocking all seeded logins. Verified the full demo flow and a clean build with 0 errors.
**Blockers:** Login failures traced back to a duplicated `$2a$10$` prefix in a manually pasted hash — found by comparing DB values directly rather than trusting the generic "invalid credentials" error.
**Learnings:** Systematic full-stack debugging (DB → backend → API → frontend); BCrypt hash format pitfalls; how `ddl-auto=create-drop` + `sql.init.mode=always` affect seed data reloads.

---

## Summary
Started with no prior Java/Spring Boot experience. By Week 6, independently built the authentication system, database schema, vendor/inventory APIs, and the Smart Vendor Routing algorithm from scratch — plus debugged several real setup issues along the way. Matches our proposal's Weeks 1–6 milestone: a fully working core ordering and routing workflow.
