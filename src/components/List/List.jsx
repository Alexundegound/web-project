import React, {useState, useMemo} from 'react';
import { EditForm } from "../EditForm/EditForm";
import { useSelector, useDispatch } from "react-redux";
import { removeCheck, updateCheck } from "../../store/checkSlice";
import {Button} from "../Button/Button";
import "./List.scss";
import DatePicker from "react-datepicker";
import {Input} from "../Input/Input";
import "react-datepicker/dist/react-datepicker.module.css";

export  const List = () => {
    const checks = useSelector((state) => state.checks.checks);
    const dispatch = useDispatch();
    const [editingId, setEditingId] = useState(null);

    const [sortConfig, setSortConfig] = useState({
        field: 'date',
        direction: 'desc'
    });

    const [filters, setFilters] = useState({
        search: '',
        startDate: null,
        endDate: null,
        category: ''
    });

    const handleSave = (updatedCheck) => {
        dispatch(updateCheck(updatedCheck));
        setEditingId(null);
    };

    const parseDate = (dateStr) => {
        const [month, day, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day);
    };

    const parseSum = (sumStr) => {
        const value = sumStr.split(' ')[0];
        return parseFloat(value) || 0;
    };

    const handleFilterChange = (name, value) => {
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSortChange = (field) => {
        setSortConfig(prev => {
            if (prev.field === field) {
                return {
                    field,
                    direction: prev.direction === 'asc' ? 'desc' : 'asc'
                };
            }
            return {
                field,
                direction: 'desc'
            };
        });
    };

    const filteredChecks = useMemo(() => {
        let result = [...checks];

        if (filters.search) {
            const query = filters.search.toLowerCase();
            result = result.filter(check =>
                check.name.toLowerCase().includes(query) ||
                check.category.toLowerCase().includes(query)
            );
        }

        if (filters.startDate || filters.endDate) {
            result = result.filter(check => {
                const checkDate = parseDate(check.date);
                return (
                    (!filters.startDate || checkDate >= filters.startDate) &&
                    (!filters.endDate || checkDate <= filters.endDate)
                );
            });
        }

        if (filters.category) {
            result = result.filter(check =>
                check.category === filters.category
            );
        }

        result.sort((a, b) => {
            let valueA, valueB;

            switch (sortConfig.field) {
                case 'date':
                    valueA = parseDate(a.date);
                    valueB = parseDate(b.date);
                    break;
                case 'sum':
                    valueA = parseSum(a.sum);
                    valueB = parseSum(b.sum);
                    break;
                case 'category':
                    valueA = a.category.toLowerCase();
                    valueB = b.category.toLowerCase();
                    break;
                case 'name':
                    valueA = a.name.toLowerCase();
                    valueB = b.name.toLowerCase();
                    break;
                default:
                    return 0;
            }

            if (sortConfig.field === 'date') {
                valueA = valueA.getTime();
                valueB = valueB.getTime();
            }

            if (valueA < valueB) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (valueA > valueB) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        return result;
    }, [checks, filters, sortConfig]);

    const resetFilters = () => {
        setFilters({
            search: '',
            startDate: null,
            endDate: null,
            category: ''
        });
        setSortConfig({
            field: 'date',
            direction: 'desc'
        });
    };

    const categories = useMemo(() => {
        const uniqueCategories = new Set();
        checks.forEach(check => uniqueCategories.add(check.category));
        return Array.from(uniqueCategories);
    }, [checks]);

    return (
    <>
        <div className="filter">
            <div className="filter-group">
                <Input
                    name="search"
                    label="Поиск"
                    placeholder="По названию или категории..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                />
            </div>

            <div className="filter-group">
                <Input
                    as="select"
                    name="category"
                    label="Категория"
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                    <option value="">Все категории</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </Input>
            </div>
            <div className="filter-group">
                <label className="input__label">Дата</label>
                <div className="date-range">
                    <DatePicker
                        selected={filters.startDate}
                        onChange={date => handleFilterChange('startDate', date)}
                        selectsStart
                        startDate={filters.startDate}
                        endDate={filters.endDate}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="От"
                        className="input__field"
                    />
                    <DatePicker
                        selected={filters.endDate}
                        onChange={date => handleFilterChange('endDate', date)}
                        selectsEnd
                        startDate={filters.startDate}
                        endDate={filters.endDate}
                        minDate={filters.startDate}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="До"
                        className="input__field"
                    />
                </div>
            </div>
            <div className="filter-group filter-group--flex">
                <label className="input__label">Сортировка</label>
                <div className="sort-controls">
                    <Input
                        as="select"
                        name="sortField"
                        value={sortConfig.field}
                        onChange={(e) => handleSortChange(e.target.value)}
                    >
                        <option value="date">Дата</option>
                        <option value="name">Название</option>
                        <option value="sum">Сумма</option>
                        <option value="category">Категория</option>
                    </Input>

                    <Button
                        type="secondary"
                        onClick={() => handleSortChange(sortConfig.field)}
                    >
                        {sortConfig.direction === 'asc' ? 'По возрастанию ↑' : 'По убыванию ↓'}
                    </Button>
                </div>
            </div>
            {(filters.search || filters.startDate || filters.endDate || filters.category || sortConfig.field !== 'date') && (
                <div className="filter-group">
                    <Button type="reset" onClick={resetFilters}>
                        Сбросить фильтры
                    </Button>
                </div>
            )}
        </div>
        <ul className="list">
            {filteredChecks.length === 0 ? (
                <div className="no-results">Чеков не найдено</div>
            ) : (
                filteredChecks.map((check) => (
                    <li key={check.id} className="list__item">
                        {editingId === check.id ? (
                            <EditForm
                                check={check}
                                onSave={handleSave}
                                onCancel={() => setEditingId(null)}
                            />
                        ) : (
                            <>
                                <header className="list__item-header">
                                    <h2>{check.name}</h2>
                                    <span className="list__item-sum">-{check.sum}</span>
                                </header>
                                <div className="list__item-block">
                    <span className="list__item-category">
                      Категория: {check.category}
                    </span>
                                    <span className="list__item-date">{check.date}</span>
                                </div>
                                <div className="list__item-actions">
                                    <Button
                                        type="edit"
                                        onClick={() => setEditingId(check.id)}
                                    >
                                        Редактировать
                                    </Button>
                                    <Button
                                        type="delete"
                                        onClick={() => dispatch(removeCheck(check.id))}
                                    >
                                        Удалить
                                    </Button>
                                </div>
                            </>
                        )}
                    </li>
                ))
            )}
        </ul>
    </>
    );
};
