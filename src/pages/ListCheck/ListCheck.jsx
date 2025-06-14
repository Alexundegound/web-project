import React, { useState } from "react";
import {List} from "../../components/List/List";
import "./ListCheck.scss";

export const ListCheck = () => {

  return (
      <section className="section listCheck">
        <main className="listCheck__main">
          <h1>Лист чеков</h1>
          <List/>
        </main>
      </section>
  );
};