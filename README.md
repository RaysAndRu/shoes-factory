 # Shoes Factory Management System

**Project Version:** 1.0.0

## Project Description
Shoes Factory Management System is a comprehensive management solution designed for the employees of a shoe factory. This system helps in managing production processes, tracking inventory (both raw materials and finished goods), planning employee schedules, and generating detailed reports and analytics to optimize factory operations.

## Technology Stack
- **Frontend:** React with Vite
- **Backend:** Spring Boot (using Maven)
- **Database:** MySQL

## Prerequisites
Ensure that the following tools are installed on your machine:
- [Node.js](https://nodejs.org/) (v18 or higher) and npm
- Latest [Java JDK](https://www.oracle.com/java/technologies/downloads/) (e.g., JDK 17 or newer)
- [Maven](https://maven.apache.org/)
- [MySQL](https://www.mysql.com/)

## Installation and Running the Project

### 1. Clone the Repository
```bash
git clone https://github.com/RaysAndRu/shoes-factory.git
cd shoes-factory
```

### 2. Database Setup
Create a MySQL database named shoes_factory.
Execute the SQL script main.sql to initialize the database schema and seed the initial data:

```bash
mysql -u [username] -p shoes_factory < main.sql
```
### 3. Build and Run the Backend (Spring Boot)
Navigate to the backend directory:

```bash
cd backend
```

Build the project using Maven:

```bash
mvn clean install
```
Run the Spring Boot application:

```bash
mvn spring-boot:run
```

Alternatively, you can run the generated jar file:

```bash
java -jar target/shoes-factory-backend.jar
```

### 4. Build and Run the Frontend (React with Vite)
Open a new terminal and navigate to the frontend directory:

``` bash
cd frontend
```
Install the dependencies:

```bash
npm install
```
Start the development server:

```bash
npm run dev
```
The application will be available at: http://localhost:3000 (or the port specified by Vite)

### 5. Production Build
Backend:
Package the application:

```bash
mvn clean package
```
Deploy the resulting jar file on your server.

Frontend:
Create an optimized production build:

```bash
npm run build
```
To preview the production build locally:

```bash
npm run preview
```
Deploy the generated build on a static server or integrate it with your backend application.

Additional Materials
Architecture Diagram: The draw.io file in the repository contains the project's architecture diagram. You can open it using draw.io.
Contributing
If you would like to contribute, please fork the repository and create a pull request with your improvements or fixes.

License
This project is licensed under the MIT License.

Contact
For any questions or suggestions, please contact: [@RaysRU](https://t.me/RaysRU/) Telergam
