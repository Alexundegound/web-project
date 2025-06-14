import * as Yup from 'yup';

export const initialValues = {
    nameCheck: "",
    sum: "",
};

export const schemas = {
    custom: Yup.object().shape({
        nameCheck: Yup.string()
            .min(2, 'Слишком короткое название')
            .max(50, 'Слишком длинное название')
            .required('Обязательное поле'),
        sum: Yup.string()
            .required('Обязательное поле')
            .test('is-number', 'Должно быть числом', value => {
                return !isNaN(value) && !isNaN(parseFloat(value));
            })
    })
};