import React from "react";
import "./RegisterCheck.scss";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";

export const RegisterCheck = () => {
  return (
    <section className="section registerCheck">
      <main className="registerCheck__main">
        <h1>Регистрация чека</h1>
        <RegisterForm />
      </main>
    </section>
  );
};
