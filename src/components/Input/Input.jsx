import "./Input.scss";
import { Field, ErrorMessage as Error, useFormikContext } from "formik";
import { useState, useEffect } from "react";

export const Input = ({ id, label, name, type, placeholder, isNumber }) => {
  const { setFieldValue, values } = useFormikContext();
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    const value = values[name] !== undefined ? values[name] : "";

    if (isNumber) {
      const safeValue = Math.max(0, value || 0);
      setDisplayValue(safeValue === 0 ? "" : safeValue.toLocaleString());
    } else {
      setDisplayValue(value);
    }
  }, [values[name], isNumber, name]);

  const handleChange = (e) => {
    if (isNumber) {
      const rawValue = e.target.value.replace(/[^0-9]/g, "");
      const numericValue = Math.max(0, Number(rawValue || 0));
      setFieldValue(name, numericValue);
    } else {
      setFieldValue(name, e.target.value);
    }
  };

  return (
    <div className="input">
      {label && <label className="input__label" htmlFor={id}>{label}</label>}
      <Field
        as="input"
        name={name}
        id={id}
        placeholder={placeholder}
        value={displayValue}
        onChange={handleChange}
        className="input__field"
        autoComplete="off"
      />
      <Error name={name}>
        {(error) => <div className="error">{error}</div>}
      </Error>
    </div>
  );
};
