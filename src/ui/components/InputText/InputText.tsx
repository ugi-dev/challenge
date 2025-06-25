import type React from "react";
import type { InputTextProps } from "./InputText.types";

import $ from "./InputText.module.css";


const InputText: React.FC<InputTextProps> = ({
  name,
  onChange,
  placeholder,
  value,
}) => {
  return (
    <input
      aria-label={name}
      className={$.inputText}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      type="text"
      value={value}
    />
  );
};

export default InputText;
