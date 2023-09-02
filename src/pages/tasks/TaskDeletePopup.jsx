import React from "react";
import FormContainer from "../../components/FormContainer";
import { Form } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import SubmitButton from "../../components/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { deleteSingleTask } from "../../Store/taskSlice";
import { toast } from "react-toastify";

function TaskDeletePopup({ task, setIsPopup, setShowTaskDeletePopup }) {
  const { isLoading, isError, isSuccess } = useSelector((state) => state.task);

  const dispatch = useDispatch();

  const formSubmit = async (e) => {
    e.preventDefault();

    dispatch(deleteSingleTask(task.id));

    if (isSuccess) {
      setTimeout(() => {
        setShowTaskDeletePopup(false);
        setIsPopup(false);
        toast.success("Task deleted succesfully");
      }, 1000);
    }

    if (isError) {
      toast.error(isError);
    }
  };
  return (
    <div className="position-fixed top-50 translate-middle-y w-100">
      <FormContainer className="position-relative">
        <h4 className="text-center mb-3">Do you want to delete the task?</h4>
        <Form
          onSubmit={formSubmit}
          className="position-relative d-flex justify-content-end"
        >
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
              setShowTaskDeletePopup(false);
              setIsPopup(false);
            }}
          />
          <SubmitButton isLoading={isLoading} text="Confirm" />
        </Form>
      </FormContainer>
    </div>
  );
}

export default TaskDeletePopup;
