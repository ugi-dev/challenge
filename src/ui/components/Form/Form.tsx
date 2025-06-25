import type React from 'react';

import Button from '../Button/Button';
import InputText from '../InputText/InputText';
import $ from './Form.module.css';
import type { FormProps } from './Form.types';

const Form: React.FC<FormProps> = ({
  label,
  loading,
  formEntries,
  onFormSubmit,
  submitText
}) => {
  return (
    <form onSubmit={onFormSubmit}>
      <fieldset>
        <legend>{label}</legend>
        {formEntries.map(({ name, placeholder, value, onChange }) => (
          <div key={name} className={$.formRow}>
            <InputText
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
            />
          </div>
        ))}

        <Button loading={loading} type="submit">
          {submitText}
        </Button>
      </fieldset>
    </form>
  );
};

export default Form;
