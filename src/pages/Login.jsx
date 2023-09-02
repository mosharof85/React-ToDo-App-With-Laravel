import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../Store/authApi";
import LoadingIcon from "../components/LoadingIcon";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../Store/authSlice";
import SubmitButton from "../components/SubmitButton";
import { toast } from "react-toastify";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const formInutChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [func_login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formSubmit = async (e) => {
    e.preventDefault();

    const res = await func_login(formData);

    if (res.data.data == "") {
      const { message } = res.data;
      alert(message);
    } else {
      const { user, token } = res.data.data;
      dispatch(setUserInfo({ user, token }));
      navigate("/");
    }
  };

  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && token) {
      navigate("/");
    }
  }, []);

  return (
    <FormContainer>
      <h4 className="text-center mb-3">Sign In</h4>
      <Form onSubmit={formSubmit}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
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
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={formInutChange}
            disabled={isLoading}
            required
          />
        </Form.Group>

        <SubmitButton isLoading={isLoading} />

        <Row className="mt-3">
          <Col>
            New Customer? <Link to="/register">Register</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
}

export default Login;
