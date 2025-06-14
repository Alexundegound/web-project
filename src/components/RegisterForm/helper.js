import * as Yup from 'yup';

const regx = {
    nameCheck: /^^[a-zA-Zа-я А-Я0-9]{6,20}$/,
    sum: null,
}

const nameCheck = Yup.string().matches(regx.nameCheck, "От 6 до 20 символов").required("Введите название")
const sum = Yup.number().typeError("Должно быть числом").required("Обязательное поле").min(1, "Не может равен нулю");

export const schemas = {
    custom: Yup.object().shape({
        nameCheck,
        sum
    })
}
export const initialValues = {
    nameCheck: "",
    sum: "",
    date: ""
}