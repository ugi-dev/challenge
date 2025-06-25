import type { ButtonType, ButtonVariant } from "@/types";
import React from "react";
import type { FunctionComponent, ReactNode } from "react";

import $ from "./Button.module.css";

interface ButtonProps {
  onClick?: () => void;
  type?: ButtonType;
  variant?: ButtonVariant;
  loading?: boolean;
  children: ReactNode;
}

const Button: FunctionComponent<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  loading = false,
}) => {
  return (
    <button
      // TODO: Add conditional classNames
      // - Must have a condition to set the '.primary' className
      // - Must have a condition to set the '.secondary' className
      // - Display loading spinner per demo video. NOTE: add data-testid="loading-spinner" for spinner element (used for grading)
      className={$.button}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
