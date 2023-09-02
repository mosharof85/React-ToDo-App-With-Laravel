import React, { useEffect, useRef, useState } from "react";
import FormContainer from "../../components/FormContainer";
import { Form } from "react-bootstrap";
import SubmitButton from "../../components/SubmitButton";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { updateSingleTask, updateTasks } from "../../Store/taskSlice";
import { toast } from "react-toastify";

function TaskEditPopup({ task, setIsPopup, setShowTraskEditPopup }) {
  const [formData, setFormData] = useState({
    name: task.attributes.name,
    description: task.attributes.description,
    image: task.attributes.image,
    priority: task.attributes.priority,
  });

  const formInutChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess } = useSelector((state) => state.task);

  const formSubmit = async (e) => {
    e.preventDefault();

    const { id } = task;
    dispatch(updateSingleTask({ id, formData }));

    if (isSuccess) {
      setTimeout(() => {
        setShowTraskEditPopup(false);
        toast.success("Task updated succesfully");
      }, 1000);
    }

    if (isError) {
      toast.error(isError);
    }
  };

  const refImage = useRef();

  return (
    <div className="position-fixed top-50 translate-middle-y w-100">
      <FormContainer className="position-relative">
        <h4 className="text-center mb-3">Update Task Info</h4>
        <Form onSubmit={formSubmit} className="position-relative">
          <AiOutlineClose
            role="button"
            className="position-absolute"
            style={{
              width: "25px",
              height: "25px",
              top: "-70px",
              right: "-20px",
            }}
            onClick={() => {
              setShowTraskEditPopup(false);
              setIsPopup(false);
            }}
          />

          <Form.Group
            controlId="formFile"
            className="mb-3 d-flex justify-content-between align-items-center"
          >
            <div style={{ width: "20%" }}>
              <img
                src={import.meta.env.VITE_IMG_URL + formData.image}
                alt=""
                ref={refImage}
                className="w-100"
              />
            </div>
            <Form.Control
              type="file"
              name="image"
              style={{ width: "75%" }}
              onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = () => {
                  formData.image = reader.result;
                  refImage.current.setAttribute("src", reader.result);
                };
                reader.readAsDataURL(file);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={formInutChange}
              disabled={isLoading}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={formData.description}
              onChange={formInutChange}
              disabled={isLoading}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupPasswordConfirm">
            <Form.Label>Priority</Form.Label>
            <Form.Control
              type="text"
              name="priority"
              value={formData.priority}
              onChange={formInutChange}
              disabled={isLoading}
            />
          </Form.Group>
          <SubmitButton isLoading={isLoading} />
        </Form>
      </FormContainer>
    </div>
  );
}

export default TaskEditPopup;
