import React from "react";
import "./RegisterCheck.scss";
import { FormCustom } from "../../components/FormCustom/FormCustom";

export const RegisterCheck = () => {
  return (
    <section className="registerCheck">
      <main className="registerCheck__main">
        <h1>Регистрация чека</h1>
        <FormCustom />
      </main>
    </section>
  );
};
