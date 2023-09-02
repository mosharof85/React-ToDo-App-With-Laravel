import React from "react";
import { Button } from "react-bootstrap";
import LoadingIcon from "./LoadingIcon";

function SubmitButton({ isLoading, text = "Submit" }) {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className="d-flex align-items-center gap-2"
    >
      <span>{text}</span>
      {isLoading && <LoadingIcon />}
    </Button>
  );
}

export default SubmitButton;
