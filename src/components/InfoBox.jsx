import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function InfoBox() {
  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h2 className="text-center mb-4">
            <img src="/logo.png" alt="" style={{ maxHeight: "40px" }} /> Laravel
            REST API-REACT TODO APP
          </h2>
          <p className="text-center mb-4">
            This app has been developed using React app integrated with a
            Laravel REST API. React handles app's frontend, allowing interactive
            components and state management. Laravel serves as the backend,
            providing RESTful API endpoints for data operations. User actions
            trigger API requests (GET, POST, PUT, DELETE) to communicate with
            the backend. This separation enables efficient real-time updates and
            dynamic content rendering. React's modular approach ensures code
            reusability and scalability. API responses update the UI with
            fetched or modified data, enhancing the user experience. This
            combination provides a responsive, interactive, and modern web
            application. Also, Redux Toolkit and RTK Query have been used to
            handle API requests.
          </p>
          <div className="d-flex gap-3">
            <Button variant="primary" to="/login" as={Link}>
              Sign In
            </Button>
            <Button variant="secondary" to="/register" as={Link}>
              Register
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
}

export default InfoBox;
