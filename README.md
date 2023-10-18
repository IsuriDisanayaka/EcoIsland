# Eco Island Web Application

![Eco Island Logo](https://github.com/IsuriDisanayaka/EcoIsland/assets/73772718/83dfc4f0-18e8-4400-821f-2696f050c3c1)

Eco Island is a full-stack web application that combines a Spring Boot backend with a React.js frontend. This application focuses on the development of a sustainable community market web application tailored to the specific needs and challenges of local product and agricultural product distribution in Sri Lanka.

## Prerequisites

Before you begin, ensure you have met the following requirements:

### Backend:

- Java Development Kit (JDK) 1.8 or later
- Maven
- MySQL Server
- Git (optional)

### Frontend:

- Node.js and npm (Node Package Manager)
- Firebase:
  - Firebase account and project
- Docker (for containerization)

## Getting Started

To get started with Eco Island, follow these steps:

### Backend (Spring Boot):

1. Change directory to the project root:
        ```bash
        cd api

2.Build the backend project using Maven:

        mvn clean install
       

3.Configure the backend by updating the application.properties file located in the src/main/resources directory.
Set up the MySQL database for the backend

*After running the Spring Boot application locally, it will be accessible at http://localhost:8080 in your web browser.*

### Frontend:
1.Change to the frontend directory:

        cd client_app/client 

2.Install frontend dependencies:
       
        npm install

### Firebase Integration
1.Integrate Firebase by configuring Firebase credentials and settings in the appropriate files within your frontend.

### Dockerization

1.Change directory to the project root:

        cd client 

2.run application
Running the Application To run the Dockarized React application locally, use the following command:

        make up-f

*The application will be accessible at http://localhost:3000 in your web browser.*

Testing
1.Unit tests are an integral part of the project for both the backend and frontend. You can run the backend tests using the following command:

        cd api

        mvn test

Contributing

If you'd like to contribute to this project, please follow these guidelines:

- Fork the project.
- Create a new branch for your feature or bug fix.
- Make your changes and commit them.
- Submit a pull request to the master branch.

License


This project is licensed under the MIT License.
