# Lab 5 - Spring Boot REST API Application

A Spring Boot REST API application for managing subjects and results with MySQL database integration and Spring Security.

## 📋 Table of Contents
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Database Setup](#database-setup)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Data Models](#data-models)
- [Security Configuration](#security-configuration)

## 🛠️ Technologies Used

- **Java**: 17
- **Spring Boot**: 4.0.0
- **Spring Data JPA**: For database operations
- **Spring Security**: For security configuration
- **Spring Web MVC**: For REST API
- **MySQL**: Database
- **Lombok**: To reduce boilerplate code
- **Maven**: Build tool

## ✅ Prerequisites

Before running this application, ensure you have:

- Java 17 or higher installed
- Maven installed (or use the included Maven wrapper)
- MySQL Server installed and running
- Git (optional, for cloning)

## 🗄️ Database Setup

1. **Start MySQL Server**

2. **Create Database**
   ```sql
   CREATE DATABASE lab5_db;
   ```

3. **Update Database Configuration**
   
   Edit `src/main/resources/application.yaml` and add your database credentials:
   ```yaml
   spring:
     application:
       name: lab5
     datasource:
       url: jdbc:mysql://localhost:3306/lab5_db
       username: your_mysql_username
       password: your_mysql_password
       driver-class-name: com.mysql.cj.jdbc.Driver
     jpa:
       hibernate:
         ddl-auto: update
       show-sql: true
       properties:
         hibernate:
           dialect: org.hibernate.dialect.MySQLDialect
   ```

## 📦 Installation & Setup

### Using Maven Wrapper (Recommended)

**Windows:**
```bash
./mvnw.cmd clean install
```

**Linux/Mac:**
```bash
./mvnw clean install
```

### Using System Maven

```bash
mvn clean install
```

## 🚀 Running the Application

### Using Maven Wrapper

**Windows:**
```bash
./mvnw.cmd spring-boot:run
```

**Linux/Mac:**
```bash
./mvnw spring-boot:run
```

### Using System Maven

```bash
mvn spring-boot:run
```

### Using Java

```bash
java -jar target/lab5-0.0.1-SNAPSHOT.jar
```

The application will start on **http://localhost:8080**

## 📡 API Endpoints

### Health Check

#### Get Service Status
- **URL**: `/`
- **Method**: `GET`
- **Description**: Check if the service is running
- **Response**:
  ```json
  {
    "status": 200,
    "message": "Service is running successfully.",
    "timestamp": "2025-11-30T12:00:00.000+00:00",
    "data": null
  }
  ```

### Subject Management

#### Create a New Subject
- **URL**: `/subjects`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Request Body**:
  ```json
  {
    "name": "Computer Networks",
    "marks": 85
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "name": "Computer Networks",
    "marks": 85
  }
  ```

#### Get All Subjects
- **URL**: `/subjects`
- **Method**: `GET`
- **Response**:
  ```json
  [
    {
      "id": 1,
      "name": "Computer Networks",
      "marks": 85
    },
    {
      "id": 2,
      "name": "Database Management",
      "marks": 90
    }
  ]
  ```

#### Get Subject by ID
- **URL**: `/subjects/{id}`
- **Method**: `GET`
- **Parameters**: `id` (Integer) - Subject ID
- **Example**: `/subjects/1`
- **Response**:
  ```json
  {
    "id": 1,
    "name": "Computer Networks",
    "marks": 85
  }
  ```

#### Update Subject
- **URL**: `/subjects/{id}`
- **Method**: `PUT`
- **Parameters**: `id` (Integer) - Subject ID
- **Content-Type**: `application/json`
- **Request Body**:
  ```json
  {
    "name": "Computer Networks",
    "marks": 92
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "name": "Computer Networks",
    "marks": 92
  }
  ```

#### Delete Subject
- **URL**: `/subjects/{id}`
- **Method**: `DELETE`
- **Parameters**: `id` (Integer) - Subject ID
- **Example**: `/subjects/1`
- **Response**: `204 No Content`

### Result Management

#### Compute and Save Result
- **URL**: `/results`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Description**: Computes percentage and CGPA based on subject IDs and saves the result
- **Request Body**: Array of subject IDs
  ```json
  [1, 2, 3]
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "percent": 87.67,
    "cgpa": 9.23,
    "subjects": [
      {
        "id": 1,
        "name": "Computer Networks",
        "marks": 85
      },
      {
        "id": 2,
        "name": "Database Management",
        "marks": 90
      },
      {
        "id": 3,
        "name": "Software Engineering",
        "marks": 88
      }
    ]
  }
  ```
- **Calculation Formula**:
  - Total Marks = Sum of all subject marks
  - Max Marks = Number of subjects × 100
  - Percentage = (Total Marks / Max Marks) × 100
  - CGPA = Percentage / 9.5

#### Get All Results
- **URL**: `/results`
- **Method**: `GET`
- **Response**:
  ```json
  [
    {
      "id": 1,
      "percent": 87.67,
      "cgpa": 9.23,
      "subjects": [...]
    },
    {
      "id": 2,
      "percent": 82.33,
      "cgpa": 8.67,
      "subjects": [...]
    }
  ]
  ```

#### Get Result by ID
- **URL**: `/results/{id}`
- **Method**: `GET`
- **Parameters**: `id` (Integer) - Result ID
- **Example**: `/results/1`
- **Response**:
  ```json
  {
    "id": 1,
    "percent": 87.67,
    "cgpa": 9.23,
    "subjects": [
      {
        "id": 1,
        "name": "Computer Networks",
        "marks": 85
      },
      {
        "id": 2,
        "name": "Database Management",
        "marks": 90
      }
    ]
  }
  ```

## 📊 Data Models

### Subject
```java
{
  "id": Integer,        // Auto-generated
  "name": String,       // Subject name
  "marks": Integer      // Marks obtained
}
```

### Result
```java
{
  "id": Integer,              // Auto-generated
  "percent": Double,          // Percentage
  "CGPA": Double,             // CGPA
  "subjects": List<Subject>   // List of associated subjects
}
```

### ApiResponse
```java
{
  "status": Integer,    // HTTP status code
  "message": String,    // Response message
  "timestamp": Date,    // Response timestamp
  "data": Object        // Response data (optional)
}
```

## 🔒 Security Configuration

The application uses Spring Security with the following configuration:
- **CSRF**: Disabled (for API testing convenience)
- **Authorization**: All endpoints are publicly accessible (`.permitAll()`)

> **Note**: For production environments, consider implementing proper authentication and authorization mechanisms.

## 📝 Testing the API

### Using cURL

**Create a Subject:**
```bash
curl -X POST http://localhost:8080/subjects \
  -H "Content-Type: application/json" \
  -d '{"name":"Computer Networks","marks":85}'
```

**Get All Subjects:**
```bash
curl http://localhost:8080/subjects
```

**Get Subject by ID:**
```bash
curl http://localhost:8080/subjects/1
```

**Update Subject:**
```bash
curl -X PUT http://localhost:8080/subjects/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Computer Networks","marks":92}'
```

**Delete Subject:**
```bash
curl -X DELETE http://localhost:8080/subjects/1
```

**Compute and Save Result:**
```bash
curl -X POST http://localhost:8080/results \
  -H "Content-Type: application/json" \
  -d '[1, 2, 3]'
```

**Get All Results:**
```bash
curl http://localhost:8080/results
```

**Get Result by ID:**
```bash
curl http://localhost:8080/results/1
```

### Using Postman

1. Import the endpoints into Postman
2. Set the base URL to `http://localhost:8080`
3. Use the appropriate HTTP methods and request bodies as documented above

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify MySQL is running
   - Check database credentials in `application.yaml`
   - Ensure the database `lab5_db` exists

2. **Port 8080 Already in Use**
   - Change the port in `application.yaml`:
     ```yaml
     server:
       port: 8081
     ```

3. **Build Failures**
   - Run `./mvnw clean` (Windows: `./mvnw.cmd clean`) to clean the project
   - Ensure Java 17 is installed and set as JAVA_HOME

## 📄 Project Structure

```
lab5/
├── src/
│   ├── main/
│   │   ├── java/com/cnt/lab5/
│   │   │   ├── Lab5Application.java
│   │   │   ├── config/
│   │   │   │   └── SecurityConfig.java
│   │   │   ├── controller/
│   │   │   │   ├── HealthController.java
│   │   │   │   ├── ResultController.java
│   │   │   │   └── SubjectController.java
│   │   │   ├── models/
│   │   │   │   ├── ApiResponse.java
│   │   │   │   ├── Result.java
│   │   │   │   └── Subject.java
│   │   │   ├── repository/
│   │   │   │   ├── ResultRepository.java
│   │   │   │   └── SubjectRepository.java
│   │   │   └── service/
│   │   │       ├── ResultService.java
│   │   │       └── SubjectService.java
│   │   └── resources/
│   │       └── application.yaml
│   └── test/
├── pom.xml
└── README.md
```

## 👥 Authors

- Developer: CNT Lab Assignment

## 📅 Last Updated

November 30, 2025
