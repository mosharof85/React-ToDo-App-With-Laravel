import React from "react";
import { Spinner } from "react-bootstrap";

function LoadingIcon() {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: "15px",
        height: "15px",
        color: "#fff",
        borderWidth: "2px",
      }}
    ></Spinner>
  );
}

export default LoadingIcon;
