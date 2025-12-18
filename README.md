# WiFi-Scheme-Management-Application

A high-performance Full-Stack SaaS application designed to automate the lifecycle of WiFi service subscriptions. This project demonstrates the ability to build scalable, secure, and maintainable systems using industry-standard Java and Frontend architectures. It solves the real-world complexity of managing multi-tier data plans, user subscriptions, and administrative oversight.

# Architectural Complexity & Technical Depth

1. Backend: Scalable & Stateless Architecture
The backend is built with Spring Boot 3.x, leveraging a stateless design to support horizontal scaling and high performance.

JWT-Based Authentication: Implemented JSON Web Tokens (JWT) for secure, stateless authentication. By moving away from session-based storage, the application reduces server-side overhead and is natively ready for distributed cloud environments.

Custom Security Filter Chain: Engineered a custom security filter that intercepts every request, validates the JWT signature, and populates the SecurityContextHolder, ensuring that every API call is authenticated without compromising speed.

Layered Design: Implements a strict Controller-Service-Repository pattern to ensure the business logic is decoupled from HTTP handling and data persistence.

2. Frontend: Reactive & State-Driven UI
Developed using TypeScript with Angular, the UI is designed for an optimal "Single Page Application" (SPA) experience.

State Management: Managed complex asynchronous flows (API calls, loading states, and error handling) using modern hooks and services.

Security Integration: Secured routes to prevent unauthorized access to Admin panels, ensuring that role-based navigation is enforced at the UI level.

Performance: Implemented component modularity to minimize re-renders and enhance perceived performance.

3. Security & Quality Assurance
   
Stateless Security Implementation: Configured Spring Security to disable CSRF and session management, relying entirely on JWT. This ensures the application can handle thousands of concurrent users across multiple server instances without session-affinity issues.

Role-Based Access Control (RBAC): Integrated logic to extract "Claims" from the JWT to distinguish between Admin (Plan Management) and User (Subscription) privileges at the controller level.

Bcrypt Password Hashing: Used industry-standard Bcrypt encoding for securing user credentials, ensuring that sensitive data is never stored in plain text.

# Successful in achieving

Solved Subscription Collision: Engineered logic to prevent users from purchasing conflicting WiFi plans.

Admin Automation: Reduced manual entry for plan updates by creating a dynamic CRUD engine with instant UI synchronization.

Production Readiness: Designed with a "Cloud-First" mindset, ready for containerization (Docker) and deployment to AWS/Azure.

# Future Scopes

Make this monolithic application into aa microservices applications using modern solutions as per System Designs.
		
		
		
		
