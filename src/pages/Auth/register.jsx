import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import AuthService from "../../services/Auth/auth.services";
import { useNavigate } from "react-router-dom";

const DEFAULT_DATA = {
  firstName: "",
  email: "",
  password: "",
  password_confirmation: "",
  lastName: ""
};

export default function RegisterPage() {
  const [formData, setFormData] = useState(DEFAULT_DATA);
  const [errors, setErrors] = useState(DEFAULT_DATA);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  async function onSubmit(event) {
    event.preventDefault();

    try {
      setErrors(DEFAULT_DATA);
      const response = await AuthService.register(formData);
      navigate('/login')

      console.log(response);
      if (response) {
        setFormData(DEFAULT_DATA);
        setMessage("Registred successfully");
      }
    } catch (error) {
      const _errors = error?.response?.data?.errors;

      if (_errors) {
        const keys = Object.keys(_errors);
        setErrors({
          name: _errors?.firstName?.join(" ") || "",
          email: _errors?.email?.join(" ") || "",
          password: _errors?.password?.join(" ") || "",
          password_confirmation:
            _errors?.password_confirmation?.join(" ") || "",
        });
      }
      //   if (errors) {} Object.keys(errors);
      //   if(keys)
      //   console.log(error);
    }
  }
  return (
    <Container>
      <Form onSubmit={onSubmit} >
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
          {errors.firstName && (
            <Alert
              style={{ background: "transparent", border: 0 }}
              variant="danger"
            >
              {errors.firstName}
            </Alert>
          )}
        </Form.Group>
        <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
          {errors.lastName && (
            <Alert
              style={{ background: "transparent", border: 0 }}
              variant="danger"
            >
              {errors.lastName}
            </Alert>
          )}
      
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
            placeholder="Enter password"
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
        <Form.Group className="mb-3">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="confirm password"
            value={formData.password_confirmation}
            onChange={(e) =>
              setFormData({
                ...formData,
                password_confirmation: e.target.value,
              })
            }
          />
          {errors.password_confirmation && (
            <Alert
              style={{ background: "transparent", border: 0 }}
              variant="danger"
            >
              {errors.password_confirmation}
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
          Register
        </Button>
      </Form>
    </Container>
  );
}
