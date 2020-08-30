import React, { useMemo } from 'react';
import { ParentCategory as Root, CategoryAmount } from './BudgetCategoryList.css';
import { formatCurrency } from '../../../../utils';

function ParentCategory({ name, onClick, categories, transactions }) {
    const categoryLeftValue = useMemo(() => {
        const budgeted = (() => {
            try {
                return categories.reduce((acc, category) => acc + category.budget, 0);
            } catch (error) {
                return null;
            }
        })();
        const parentCategoryTransactions = transactions.filter(transaction => {
            return categories.find(category => category.categoryId === transaction.categoryId);
        });
        const spentOnPatentCategoty = parentCategoryTransactions.reduce(
            (acc, parentCategoryTransaction) => acc + parentCategoryTransaction.amount,
            0
        );
        const totalLeft = budgeted ? budgeted - spentOnPatentCategoty : null;
        return totalLeft;
    }, [categories, transactions]);
    return (
        <Root onClick={onClick}>
            <span>{name}</span>
            <CategoryAmount negative={categoryLeftValue < 0}>{formatCurrency(categoryLeftValue)}</CategoryAmount>
        </Root>
    );
}
export default ParentCategory;
