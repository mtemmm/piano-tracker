# Piano practice tracker

A full-stack web application designed for pianists to organize their repertoire, track practice sessions, and analyze performance progress. Built with a **Java 21 Spring Boot** backend and a **React (Vite)** frontend, integrating **PostgreSQL (Dockerized)**, **Cloudinary**, and the **Gemini API**.

---

## Key features

* **Repertoire and progress tracking:** Manage piano pieces by rating, composer and current mastery status (*wishlist*, *learning*, *finished*).
* **Media and sheet music storage:** Upload and store sheet music PDFs or practice recordings to **Cloudinary**.
* **AI-powered recommendations:** Integrated with the **Gemini API** (`gemini-3.8-flash`) to provide further piece recommendations based on the selected pieces and their ratings.
* **RESTful API architecture:** Layered design (Controller, Service, Repository, DTOs, Mappers).
* **Live practice stopwatch and session logging:** Real-time stopwatch component allowing users to track and log practice sessions as they learn, automatically recording durations and mapping them to specific pieces.
* **Practice statistics:** Metrics providing study session statistics including total time practiced, piece distribution, longest/shortest practiced pieces, and highest/lowest rated compositions.
* **Client-Side routing:** Single-page application navigation using **React Router DOM**.

---

## Tech stack

* **Backend:** Java 21, Spring Boot 4.x, Spring Data JPA, Hibernate, Project Lombok
* **Database:** PostgreSQL 16 (`postgres:16-alpine` via Docker Compose)
* **Frontend:** React 18, React Router DOM, Vite, HTML5, CSS3, JavaScript (ES6+)
* **External Services & APIs:** Gemini API (`gemini-3.8-flash`), Cloudinary HTTP5 Java SDK (`v2.0.0`)
* **DevOps & Tools:** Docker, Docker Compose, Git, GitHub, Maven

---

## Architecture and database design

The backend applies clean architecture and object-relational mapping principles:
* **Domain layer:** Relational mapping for pieces, practice sessions, and media using JPA/Hibernate.
* **DTO and mapping pattern:** Decouples internal database entities from API payloads using explicit DTOs and Mappers.
* **External integration layer:** Isolated service clients for handling calls to the Gemini API and Cloudinary uploads.

---

## Getting started

### Prerequisites
* JDK 21 or higher
* Node.js (v18+) & npm
* Docker & Docker Compose
* Cloudinary Account & Gemini API Key

### Installation and setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mtemmm/piano-tracker.git
   cd piano-tracker
2. **Start the database via docker-compose:**
   ```bash
   docker-compose up -d
   
3. **Backend setup:**
   * Export the required environment variables:
     ```bash
     export GEMINI_API_KEY="your_gemini_api_key"
     export CLOUDINARY_CLOUD_NAME="your_cloud_name"
     export CLOUDINARY_API_KEY="your_api_key"
     export CLOUDINARY_API_SECRET="your_api_secret"
     ```
   * Build and run the Spring Boot application:
     ```bash
     mvn spring-boot:run
     ```
4. **Frontend setup (`/frontend`):**
   * Install dependencies and run the Vite development server:
     ```bash
     cd frontend
     npm install
     npm run dev
     ```
