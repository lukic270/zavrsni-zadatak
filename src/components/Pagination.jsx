import React from "react";
import Button from "react-bootstrap/Button";

const LoadMoreButton = ({ onClick }) => {
  return (
    <div className="text-center mt-3">
      <Button onClick={onClick} variant="primary">
        Load more
      </Button>
    </div>
  );
};

export default LoadMoreButton;
