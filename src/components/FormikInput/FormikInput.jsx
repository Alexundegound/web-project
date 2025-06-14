import { useField } from 'formik';
import { Input as BaseInput } from '../Input/Input';

export const FormikInput = ({ name, isNumber, ...props }) => {
    const [field, meta, helpers] = useField(name);

    const handleChange = (e) => {
        if (isNumber) {
            helpers.setValue(Number(e.target.value));
        } else {
            helpers.setValue(e.target.value);
        }
    };

    const inputValue = isNumber && typeof field.value === 'number'
        ? field.value.toString()
        : field.value;

    return (
        <BaseInput
            {...props}
            name={name}
            value={inputValue}
            onChange={handleChange}
            onBlur={field.onBlur}
            error={meta.touched && meta.error ? meta.error : undefined}
            isNumber={isNumber}
        />
    );
};