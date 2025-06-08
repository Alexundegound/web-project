import "./Select.scss";
export const Select = ({ id, label, name, value, options, onChange}) => {
  return (
    <select
      name={name}
      id={id}
      label={label}
      value={value}
      onChange={onChange}
      className="select"
    >
      {options.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};
