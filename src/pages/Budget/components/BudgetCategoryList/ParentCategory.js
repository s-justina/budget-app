import React, { useMemo } from 'react';
import { ParentCategory as Root, CategoryAmount } from './BudgetCategoryList.css';
import { formatCurrency } from '../../../../utils';

function ParentCategory({ name, onClick, categories, transactions, amount }) {
    const categoryLeftValue = useMemo(() => {
        if(!!amount) return null;
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
    }, [categories, transactions, amount]);

    const amountValue = useMemo(()=>{
       return amount ||  categoryLeftValue
    }, [amount,categoryLeftValue]);

    return (
        <Root onClick={onClick}>
            <span>{name}</span>
            <CategoryAmount negative={amountValue < 0}>{formatCurrency(amountValue)}</CategoryAmount>
        </Root>
    );
}
export default ParentCategory;
