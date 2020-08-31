import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import { useTranslation } from 'react-i18next';
import 'styled-components/macro';

import { ToggleableList } from '../../../../components/index';
import ParentCategory from './ParentCategory';
import CategoryItem from './CategoryItem';

function BudgetCategoryList({ budgetedCategories, allCategories, budget }) {
    const { t } = useTranslation();

    const serverError = useMemo(
        () =>
            !!budget &&
            Object.keys(budget).length === 0 &&
            !!allCategories &&
            Object.keys(allCategories).length === 0 &&
            !!budgetedCategories &&
            Object.keys(budgetedCategories).length === 0,
        [budget, allCategories, budgetedCategories]
    );

    if (serverError) {
        return (
            <div
                css={`
                    margin-top: ${({ theme }) => theme.spacing.sm}px;
                    text-align: center;
                    font-weight: bold;
                    text-transform: underline;
                    font-size: 2em;
                `}
            >
                {t('Server is not responding. Please try later.')}
            </div>
        );
    }

    const budgetedCategoriesByParent = groupBy(
        budgetedCategories,
        item => allCategories.find(category => category.id === item.categoryId).parentCategory.name
    );

    const listItems = Object.entries(budgetedCategoriesByParent).map(([parentName, categories]) => ({
        id: parentName,
        Trigger: ({ onClick }) => (
            <ParentCategory
                name={parentName}
                onClick={() => onClick(parentName)}
                categories={categories}
                transactions={budget.transactions}
            />
        ),
        children: categories.map(budgetedCategory => {
            const { name } = allCategories.find(category => category.id === budgetedCategory.categoryId);
            return (
                <CategoryItem
                    key={budgetedCategory.id}
                    name={name}
                    item={budgetedCategory}
                    transactions={budget.transactions}
                />
            );
        }),
    }));
    const totalSpent = budget && budget.transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    const restToSpent = budget.totalAmount - totalSpent;

    const amountTaken = budgetedCategories.reduce((acc, budgetedCategory) => {
        const categoryTransactions = budget.transactions.filter(transaction => {
            return transaction.categoryId === budgetedCategory.categoryId;
        });
        const categoryExpenses = categoryTransactions.reduce((acc, categoryTransaction) => {
            return acc + categoryTransaction.amount;
        }, 0);

        return acc + Math.max(budgetedCategory.budget, categoryExpenses);
    }, 0);

    const notBudgetedTransactions = budget.transactions.filter(transaction => {
        return !budgetedCategories.find(budgetedCategory => budgetedCategory.categoryId === transaction.categoryId);
    });
    const notBudgetedExpenses = notBudgetedTransactions.reduce((acc, notBudgetedTransaction) => {
        return acc + notBudgetedTransaction.amount;
    }, 0);
    const avaiableForRestCategories = budget.totalAmount - amountTaken - notBudgetedExpenses;

    return (
        <div>
            <div
                css={`
                    border-bottom: 5px solid ${({ theme }) => theme.colors.gray.light};
                `}
            >
                <ParentCategory name={budget.name} amount={restToSpent} />
            </div>
            <ToggleableList items={listItems} />
            <div
                css={`
                    border-top: 5px solid ${({ theme }) => theme.colors.gray.light};
                `}
            >
                <ParentCategory name={t('Other categories')} amount={avaiableForRestCategories} />
            </div>
        </div>
    );
}

export default connect(state => ({
    budgetedCategories: state.budget.budgetedCategories,
    allCategories: state.common.allCategories,
    budget: state.budget.budget,
}))(BudgetCategoryList);
