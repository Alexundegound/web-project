import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BarChart } from '../Charts/BarChart';
import { LineChart } from '../Charts/LineChart';
import { PieChart } from '../Charts/PieChart';
import { parse, format, subYears, startOfYear, eachMonthOfInterval, isWithinInterval } from 'date-fns';
import { ru } from 'date-fns/locale';
import './Dashboard.scss';

export const Dashboard = () => {
    const checks = useSelector((state) => state.checks.checks);


    const parseSum = (sumStr) => {
        const value = sumStr.split(' ')[0];
        return parseFloat(value) || 0;
    };


    const parseDate = (dateStr) => {
        return parse(dateStr, 'MM/dd/yyyy', new Date());
    };


    const chartData = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const previousYear = currentYear - 1;

        const months = eachMonthOfInterval({
            start: startOfYear(new Date(currentYear, 0, 1)),
            end: new Date(currentYear, 11, 31)
        }).map(date => format(date, 'MMMM', { locale: ru }));


        const currentYearData = new Array(12).fill(0);
        const previousYearData = new Array(12).fill(0);

        const categoryData = {};

        checks.forEach(check => {
            const amount = parseSum(check.sum);
            const date = parseDate(check.date);
            const month = date.getMonth();
            const year = date.getFullYear();
            const category = check.category;

            if (year === currentYear) {
                currentYearData[month] += amount;
            } else if (year === previousYear) {
                previousYearData[month] += amount;
            }

            if (year === currentYear) {
                if (!categoryData[category]) {
                    categoryData[category] = 0;
                }
                categoryData[category] += amount;
            }
        });

        const pieChartData = {
            labels: Object.keys(categoryData),
            datasets: [
                {
                    data: Object.values(categoryData),
                    backgroundColor: [
                        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                        '#9966FF', '#FF9F40', '#8AC926', '#1982C4',
                        '#6A4C93', '#F15BB5', '#00BBF9', '#00F5D4'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                        '#9966FF', '#FF9F40', '#8AC926', '#1982C4',
                        '#6A4C93', '#F15BB5', '#00BBF9', '#00F5D4'
                    ]
                }
            ]
        };

        const barChartData = {
            labels: months,
            datasets: [
                {
                    label: `Текущий год (${currentYear})`,
                    data: currentYearData,
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
                {
                    label: `Прошлый год (${previousYear})`,
                    data: previousYearData,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
            ],
        };

        const lineChartData = {
            labels: months,
            datasets: [
                {
                    label: `Текущий год (${currentYear})`,
                    data: currentYearData,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    tension: 0.3,
                },
                {
                    label: `Прошлый год (${previousYear})`,
                    data: previousYearData,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    tension: 0.3,
                },
            ],
        };

        return {
            barChartData,
            lineChartData,
            pieChartData
        };
    }, [checks]);

    return (
        <div className="dashboard">
            <div className="charts-grid">
                <div className="chart-container">
                    <BarChart data={chartData.barChartData} />
                </div>

                <div className="chart-container">
                    <LineChart data={chartData.lineChartData} />
                </div>

                <div className="chart-container">
                    <PieChart data={chartData.pieChartData} />
                </div>
            </div>
        </div>
    );
};