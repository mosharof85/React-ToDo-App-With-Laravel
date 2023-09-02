import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useRegistrationMutation } from "../Store/authApi";
import LoadingIcon from "../components/LoadingIcon";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setUserInfo } from "../Store/authSlice";
import SubmitButton from "../components/SubmitButton";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const formInutChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [func_register, { isLoading }] = useRegistrationMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSubmit = async (e) => {
    e.preventDefault();
    const res = await func_register(formData);

    if (res.error) {
      toast.error(res.error.data.message);
      if (res.error.status !== 401) {
        return;
      }
    }

    const { user, token } = res.data.data;
    dispatch(setUserInfo({ user, token }));
    navigate("/");
  };

  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && token) {
      navigate("/");
    }
  }, []);

  return (
    <FormContainer>
      <h4 className="text-center mb-3">Register New Account</h4>
      <Form onSubmit={formSubmit}>
        <Form.Group className="mb-3" controlId="formGroupName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={formInutChange}
            disabled={isLoading}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={formInutChange}
            disabled={isLoading}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={formInutChange}
            disabled={isLoading}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPasswordConfirm">
          <Form.Label>Retype Password</Form.Label>
          <Form.Control
            type="password"
            name="password_confirmation"
            value={formData.password_confirmed}
            onChange={formInutChange}
            disabled={isLoading}
            placeholder="Retype Password"
            required
          />
        </Form.Group>
        <SubmitButton isLoading={isLoading} />

        <Row className="mt-3">
          <Col>
            Already have an account? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
}

export default Register;
