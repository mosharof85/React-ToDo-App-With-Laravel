import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useProfileUpdateMutation } from "../Store/authApi";
import { toast } from "react-toastify";
import LoadingIcon from "../components/LoadingIcon";
import SubmitButton from "../components/SubmitButton";
import { updateUserInfo } from "../Store/authSlice";

function Profile() {
  const { user, token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: user.name,
    password: "",
    password_confirmation: "",
  });

  const formInutChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [func_profileUpdate, { isLoading }] = useProfileUpdateMutation();

  const dispatch = useDispatch();

  const formSubmit = async (e) => {
    e.preventDefault();
    const res = await func_profileUpdate(formData);
    if (res.error) {
      toast.error(res.error.data.message);
      if (res.error.status !== 401) {
        return;
      }
    }

    dispatch(updateUserInfo(formData.name));

    toast.success("Profile updated successfully");
  };

  return (
    <FormContainer>
      <h4 className="text-center mb-3">Update Account Info</h4>
      <Form onSubmit={formSubmit}>
        <Form.Group className="mb-3" controlId="formGroupName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={formData.name}
            onChange={formInutChange}
            disabled={isLoading}
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
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPasswordConfirm">
          <Form.Label>Retype Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Retype Password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={formInutChange}
            disabled={isLoading}
          />
        </Form.Group>
        <SubmitButton isLoading={isLoading} />
      </Form>
    </FormContainer>
  );
}

export default Profile;
