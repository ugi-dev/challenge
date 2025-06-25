import type React from 'react';
import type { RadioProps } from './Radio.types';
import $ from './Radio.module.css';

const Radio: React.FC<RadioProps> = ({
  children,
  id,
  name,
  value,
  checked,
  onChange
}) => {
  return (
    <div className={$.radio}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value || id}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{children}</label>
    </div>
  );
};

export default Radio;
