import React from 'react';
import "./ChartCheck.scss";
import {Dashboard} from "../../components/Dashboard/Dashboard";

export const ChartCheck = () => {
    return (
        <section className="section chartCheck">
            <main className="chartCheck__main">
                <h1>Графики расходов</h1>
                <Dashboard/>
            </main>
        </section>
    );
};
