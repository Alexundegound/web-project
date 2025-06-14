import React, { useState } from "react";
import "./RegisterForm.scss";
import { Formik, Form } from "formik";
import { initialValues, schemas } from "./helper";
import { FormikInput } from "../FormikInput/FormikInput";
import { Select } from "../Select/Select";
import { Button } from "../Button/Button";
import { useDispatch } from "react-redux";
import { addCheck } from "../../store/checkSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [category, setCategory] = useState("Учеба");
  const [currency, setCurrency] = useState("RUB");
  const categories = [
    "Учеба",
    "Транспорт",
    "Продукты",
    "Медицина",
    "Красота и уход",
    "другое",
  ];
  const currencies = ["RUB", "USD", "EUR", "CNY"];

  const handleSubmit = (values, { resetForm }) => {
    const sumValue = parseFloat(values.sum);

    if (isNaN(sumValue)) {
      alert('Некорректная сумма');
      return;
    }

    const sumWithCurrency = `${sumValue} ${currency}`;
    const formatter = new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    const formattedDate = formatter.format(selectedDate);
    const newCheck = {
      id: Date.now(),
      name: values.nameCheck,
      category: category,
      sum: sumWithCurrency,
      date: formattedDate,
    };

    dispatch(addCheck(newCheck));
    resetForm();
    setSelectedDate(new Date());
  };

  return (
      <Formik
          initialValues={initialValues}
          validationSchema={schemas.custom}
          onSubmit={handleSubmit}
      >
        {({ handleSubmit, errors, touched }) => (
            <Form className="form" onSubmit={handleSubmit}>
              <FormikInput
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
                <FormikInput
                    name="sum"
                    id="sum"
                    label="Сумма"
                    placeholder="Введите сумму"
                    isNumber={true}
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
                    dateFormat="MM/dd/yyyy"
                    className="input__field date-picker"
                />
              </div>

              <Button type="submit">Сохранить чек</Button>
            </Form>
        )}
      </Formik>
  );
};