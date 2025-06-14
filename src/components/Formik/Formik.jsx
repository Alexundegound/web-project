import { useField } from 'Formik';
import { Input as BaseInput } from '../Input/Input';

export const FormikInput = ({ name, isNumber, ...props }) => {
    const [field, meta, helpers] = useField(name);

    return (
        <BaseInput
            {...props}
            name={name}
            value={field.value}
            onChange={(e) => {
                if (isNumber) {
                    const rawValue = e.target.value.replace(/[^0-9]/g, "");
                    const numericValue = Math.max(0, Number(rawValue || 0));
                    helpers.setValue(numericValue);
                } else {
                    helpers.setValue(e.target.value);
                }
            }}
            onBlur={field.onBlur}
            error={meta.touched && meta.error ? meta.error : undefined}
            isNumber={isNumber}
        />
    );
};