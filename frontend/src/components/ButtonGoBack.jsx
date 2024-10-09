import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const ButtonGoBack = ({ history }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleClick}
      className="btn btn-outline-primary btn mb-3 d-flex align-items-center"
    >
      <FaArrowLeft className="mr-2" />
      <span>Go Back</span>
    </button>
  );
};

export default ButtonGoBack;
