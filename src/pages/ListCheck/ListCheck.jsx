import React from "react";
import { useSelector } from "react-redux";
import "./ListCheck.scss";
export const ListCheck = () => {
  const checks = useSelector((state) => state.checks.checks);

  return (
    <section className="listCheck">
      <main className="listCheck__main">
        <h1>Лист чеков</h1>
        <ul className="listCheck__list">
          {checks.map((check) => (
            <li key={check.id} className="listCheck__item">
              <header className="listCheck__item-header">
                <h2>{check.name}</h2>
                <span className="listCheck__item-sum">-{check.sum}</span>
              </header>
              <div className="listCheck__item-block">
                <span className="listCheck__item-category">
                  {check.category}
                </span>
                <span className="listCheck__item-date">{check.date}</span>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
};
