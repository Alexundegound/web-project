import "./Input.scss";
import { useState, useEffect } from "react";

export const Input = ({
                          id,
                          label,
                          name,
                          placeholder,
                          isNumber,
                          value: propValue = "",
                          onChange,
                          as = 'input',
                          children,
                          error
                      }) => {
    const [displayValue, setDisplayValue] = useState(propValue);

    useEffect(() => {
        setDisplayValue(propValue);
    }, [propValue]);

    const handleChange = (e) => {
        let newValue = e.target.value;

        if (isNumber) {
            newValue = newValue.replace(/[^0-9]/g, "");
        }

        setDisplayValue(newValue);

        if (onChange) {
            onChange(e);
        }
    };

    if (as === 'select') {
        return (
            <div className="input">
                {label && <label className="input__label" htmlFor={id}>{label}</label>}
                <select
                    name={name}
                    id={id}
                    value={propValue}
                    onChange={onChange}
                    className="input__field"
                >
                    {children}
                </select>
                {error && <div className="error">{error}</div>}
            </div>
        );
    }
    const formatNumber = (numStr) => {
        return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleBlur = () => {
        if (isNumber && displayValue) {
            setDisplayValue(formatNumber(displayValue));
        }
    };
    return (
        <div className="input">
            {label && <label className="input__label" htmlFor={id}>{label}</label>}
            <input
                type="text"
                name={name}
                id={id}
                placeholder={placeholder}
                value={displayValue}
                onChange={handleChange}
                className="input__field"
                autoComplete="off"
                onBlur={handleBlur}
                onFocus={() => {
                    if (isNumber && displayValue) {
                        setDisplayValue(displayValue.replace(/,/g, ''));
                    }
                }}
            />
            {error && <div className="error">{error}</div>}
        </div>
    );
};