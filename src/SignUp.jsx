import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINT } from "./Api";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Signup() {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Replace with correct endpoint(the signup is not functioning yet need to change the backend )
      await axios.post("https://adet-m2.onrender.com/api/auth/signup", {
        fullname,
        username,
        password,
      });
      setSuccess("Sign-up successful! Redirecting to login...");
      setError("");
      setTimeout(() => navigate("/login"), 2000); // Redirect to Login after 2 seconds
    } catch (error) {
      setError("Sign-up failed. Please try again.");
      setSuccess("");
      console.error(error);
    }
  };
  

  return (
    <>
      {/* Upper Navigation Bar */}
      <Navbar className="navbar-custom">
        <Container>
          <Navbar.Brand href="#home">InstaCam</Navbar.Brand>
        </Container>
      </Navbar>

      {/* Sign-Up Form */}
      <Container className="login-container">
        <Row className="justify-content-md-center">
          <Col md={4}>
            <div className="login-form text-center">
              <h3 className="mb-4 text-light">Create an Account</h3>
              <Form onSubmit={handleSignup}>
                <Form.Group controlId="formFullname" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Full Name"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    required
                    className="rounded-pill"
                  />
                </Form.Group>
                <Form.Group controlId="formUsername" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="rounded-pill"
                  />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="rounded-pill"
                  />
                </Form.Group>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 rounded-pill custom-btn"
                >
                  Sign Up
                </Button>
              </Form>
              <p className="mt-3">
                Already have an account?{" "}
                <span
                  className="text-light"
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                  onClick={() => navigate("/login")}
                >
                  Log in
                </span>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Signup;
