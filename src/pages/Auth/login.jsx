import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import AuthService from "../../services/Auth/auth.services";
import { useNavigate } from "react-router-dom";
const DEFAULT_DATA = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const [formData, setFormData] = useState(DEFAULT_DATA);
  const [errors, setErrors] = useState(DEFAULT_DATA);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function onSubmit(event) {
    event.preventDefault();

    
    try {
      setErrors(DEFAULT_DATA);
      const response = await AuthService.login(formData);
      if (response) {
        setFormData(DEFAULT_DATA);
        setMessage("Successfully logged in");
        navigate('/galleries')
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
    } catch (error) {
      const _errors = error?.response?.data?.errors;

      if (_errors) {
        const keys = Object.keys(_errors);
        setErrors({
          email: _errors?.email?.join(" ") || "",
          password: _errors?.password?.join(" ") || "",
        });
      }else{
        setMessage("Invalid credentials. Please try again.");

      }
      //   if (errors) {} Object.keys(errors);
      //   if(keys)
      //   console.log(error);
    }
  }
  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && (
            <Alert
              style={{ background: "transparent", border: 0 }}
              variant="danger"
            >
              {errors.email}
            </Alert>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter name"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password && (
            <Alert
              style={{ background: "transparent", border: 0 }}
              variant="danger"
            >
              {errors.password}
            </Alert>
          )}
        </Form.Group>

        {message && (
          <Alert
            style={{ background: "transparent", border: 0 }}
            variant="success"
          >
            {message}
          </Alert>
        )}
        <Button variant="primary" type="submit" onClick={onSubmit}>
          Login
        </Button>
      </Form>
    </Container>
  );
}
