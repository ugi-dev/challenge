import type React from "react";
import type { ButtonProps } from "./Button.types";

import $ from "./Button.module.css";

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  loading = false,
}) => {
  const buttonClasses = [
    $.button,
    variant === 'primary' ? $.primary : $.secondary
  ].join(' ');

  return (
    <button
      // TODO: Add conditional classNames
      // - Must have a condition to set the '.primary' className
      // - Must have a condition to set the '.secondary' className
      // - Display loading spinner per demo video. NOTE: add data-testid="loading-spinner" for spinner element (used for grading)
      className={buttonClasses}
      type={type}
      onClick={onClick}
      disabled={loading}
    >
      {loading && (
        <span className="loading-spinner" data-testid="loading-spinner" />
      )}
      {children}
    </button>
  );
};

export default Button;
