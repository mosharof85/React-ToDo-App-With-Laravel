import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showTasks } from "../../Store/taskSlice";
import { Button, Table } from "react-bootstrap";
import TaskEditPopup from "./TaskEditPopup";
import LoadingIcon from "../../components/LoadingIcon";
import TaskCreatePopup from "./TaskCreatePopup";
import TaskDeletePopup from "./TaskDeletePopup";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { destroyUserInfo } from "../../Store/authSlice";

function Tasks() {
  const { tasks, isLoading, isError } = useSelector((state) => state.task);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(showTasks());

    if (isError == "unauthorized") {
      dispatch(destroyUserInfo());
      navigate("/login");
    }
  }, []);

  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskEditPopup, setShowTraskEditPopup] = useState(false);

  const [showTaskCreatePopup, setShowTaskCreatePopup] = useState(false);

  const [showTaskDeletePopup, setShowTaskDeletePopup] = useState(false);

  const [isPopup, setIsPopup] = useState(false);

  return (
    <div className="position-relative">
      {showTaskEditPopup && (
        <TaskEditPopup
          task={selectedTask}
          setIsPopup={setIsPopup}
          setShowTraskEditPopup={setShowTraskEditPopup}
        />
      )}

      {showTaskCreatePopup && (
        <TaskCreatePopup
          setIsPopup={setIsPopup}
          setShowTaskCreatePopup={setShowTaskCreatePopup}
        />
      )}

      {showTaskDeletePopup && (
        <TaskDeletePopup
          task={selectedTask}
          setIsPopup={setIsPopup}
          setShowTaskDeletePopup={setShowTaskDeletePopup}
        />
      )}

      <Button
        variant="info"
        className="mt-5 text-white"
        onClick={() => {
          setShowTaskCreatePopup(true);
          setIsPopup(true);
        }}
      >
        Create Task
      </Button>
      <Table striped bordered hover className="mt-5">
        <thead>
          <tr>
            <th>Image</th>
            <th>Task Name</th>
            <th>Description</th>
            <th>Prority</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && !isPopup && (
            <tr>
              <td>
                <LoadingIcon />
              </td>
            </tr>
          )}
          {tasks &&
            tasks.map((task) => (
              <tr key={task.id}>
                <td>
                  {task.attributes.image && (
                    <img
                      style={{ maxWidth: "100px" }}
                      src={import.meta.env.VITE_IMG_URL + task.attributes.image}
                      alt=""
                    />
                  )}
                </td>
                <td>{task.attributes.name}</td>
                <td>{task.attributes.description}</td>
                <td>{task.attributes.priority}</td>
                <td>
                  {moment(task.attributes.created_at).format(
                    "DD/MM/YYYY, h:mm:ss a"
                  )}
                </td>
                <td>
                  {moment(task.attributes.updated_at).format(
                    "DD/MM/YYYY, h:mm:ss a"
                  )}
                </td>
                <td>
                  <div className="d-flex gap-3">
                    <Button
                      variant="success"
                      onClick={() => {
                        setShowTraskEditPopup(true);
                        setSelectedTask(task);
                        setIsPopup(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        setShowTaskDeletePopup(true);
                        setSelectedTask(task);
                        setIsPopup(true);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Tasks;
