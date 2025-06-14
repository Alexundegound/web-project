import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";
import { Button } from "../Button/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import "./EditForm.scss";

export const EditForm = ({ check, onSave, onCancel }) => {
    const [sumValue, currencyValue] = check.sum.split(" ");

    const [selectedDate, setSelectedDate] = useState(() => {
        const [month, day, year] = check.date.split('/');
        return new Date(year, month - 1, day);
    });

    const [category, setCategory] = useState(check.category);
    const [currency, setCurrency] = useState(currencyValue);

    const categories = [
        "Учеба",
        "Транспорт",
        "Продукты",
        "Медицина",
        "Красота и уход",
        "другое",
    ];

    const currencies = ["RUB", "USD", "EUR", "CNY"];

    const handleSubmit = (values) => {
        const sumWithCurrency = `${values.sum} ${currency}`;
        const formatter = new Intl.DateTimeFormat('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        const formattedDate = formatter.format(selectedDate);

        onSave({
            ...check,
            name: values.nameCheck,
            category: category,
            sum: sumWithCurrency,
            date: formattedDate,
        });
    };

    return (
        <Formik
            initialValues={{
                nameCheck: check.name,
                sum: sumValue,
            }}
            onSubmit={handleSubmit}
        >
            {({ handleSubmit }) => (
                <Form className="form" onSubmit={handleSubmit}>
                    <Input
                        name="nameCheck"
                        id="nameCheck"
                        label="Название чека"
                        placeholder="Введите название чека"
                    />
                    <Select
                        id="categoryCheck"
                        label="Категория"
                        name="categoryCheck"
                        value={category}
                        options={categories}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <div className="form__input-sum">
                        <Input
                            name="sum"
                            id="sum"
                            label="Сумма"
                            placeholder="Введите сумму"
                            isNumber
                        />
                        <Select
                            name="currency"
                            value={currency}
                            options={currencies}
                            onChange={(e) => setCurrency(e.target.value)}
                        />
                    </div>
                    <div className="form__datepicker">
                        <label className="input__label">Дата</label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            maxDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                            className="input__field date-picker"
                        />
                    </div>
                    <div className="form-buttons">
                        <Button type="submit">Сохранить</Button>
                        <Button type="close" onClick={onCancel}>Отмена</Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};