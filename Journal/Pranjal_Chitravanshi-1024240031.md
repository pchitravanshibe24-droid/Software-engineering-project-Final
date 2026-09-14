# Frontend Lead - 6-Week Development Journal

**Role:** Frontend Lead  
**Responsibilities:** All React screens (Login/Register, Browse, Cart, Order Confirmation, Vendor Dashboard, Admin Dashboard) and Frontend architecture (`frontend/src/pages/`, `frontend/src/components/`, `AuthContext.jsx`).

---

## Week 1: Project Initialization & UI Architecture
**Dates:** Week 1  
**Objective:** Establish the foundational frontend environment and design system.
* **What I did:** 
  * Initialized the frontend repository using React and Vite.
  * Configured Tailwind CSS for utility-first styling to ensure rapid and consistent UI development.
  * Set up the core directory structure mapping to our architecture (`frontend/src/pages/`, `frontend/src/components/`).
  * Created the foundational layout wrappers and navigation headers for both Customer and Vendor flows.

## Week 2: Authentication UI & Global State Management
**Dates:** Week 2  
**Objective:** Secure the app by building the authentication flow and managing user state.
* **What I did:** 
  * Developed `AuthContext.jsx` using React Context API to manage global user sessions securely.
  * Built the **Login** and **Register** screens with robust form validation and error handling.
  * Implemented role-based routing (Customer vs. Vendor) so users are redirected to the correct dashboards upon successful login.
  * Integrated Framer Motion to add smooth transitions between the authentication steps.

## Week 3: Customer Experience - Browse & Cart Features
**Dates:** Week 3  
**Objective:** Build the core shopping experience for customers.
* **What I did:** 
  * Developed the **Browse** page, featuring category horizontal scrolling and a grid of "Nearby Shops".
  * Built the individual Shop Profile pages, rendering product listings dynamically.
  * Engineered the persistent **Cart** component. I wrote the logic to add items, remove items, update quantities, and calculate subtotal/delivery fees dynamically.

## Week 4: Checkout Flow & Order Confirmation
**Dates:** Week 4  
**Objective:** Finalize the customer purchasing journey.
* **What I did:** 
  * Designed and built the Checkout screen, capturing delivery addresses and phone numbers.
  * Wired the checkout form to the global state to trigger order generation.
  * Created the **Order Confirmation** screen, implementing a visually appealing success animation to give the app a polished, startup-quality feel.
  * Built the Customer Order History page, allowing users to track their past purchases.

## Week 5: Vendor Dashboard & Operations
**Dates:** Week 5  
**Objective:** Provide local vendors with the tools to manage their digital storefront.
* **What I did:** 
  * Built the interactive **Vendor Dashboard**, displaying simulated statistical cards (Total Revenue, Orders Today, etc.) using CSS-based bar charts.
  * Developed the Product Management table, enabling vendors to view and track stock statuses.
  * Created the Order Management interface, empowering vendors to update the status of incoming customer orders (e.g., Pending -> Preparing -> Out for Delivery).

## Week 6: Admin Dashboard, Polish & Final Testing
**Dates:** Week 6  
**Objective:** Complete the Admin interfaces and ensure UI responsiveness across all devices.
* **What I did:** 
  * Developed the **Admin Dashboard** screen for platform-wide oversight.
  * Conducted extensive UI/UX testing, fixing layout shifts and ensuring mobile responsiveness for all React screens.
  * Refactored and cleaned up reusable components inside `frontend/src/components/`.
  * Prepared the frontend architecture for seamless demonstration during the final prototype presentation.
