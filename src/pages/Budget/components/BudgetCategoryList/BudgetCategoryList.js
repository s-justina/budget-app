import React, { useMemo, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import { useTranslation } from 'react-i18next';
import 'styled-components/macro';

import { ToggleableList } from '../../../../components/index';
import ParentCategory from './ParentCategory';
import CategoryItem from './CategoryItem';
import { selectParentCategory } from '../../../../data/actions/budget.actions';

function BudgetCategoryList({ budgetedCategories, allCategories, budget, selectParentCategory }) {
    const { t } = useTranslation();

    const handleClickParentCategoryRef = useRef(null);

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

    const budgetedCategoriesByParent = useMemo(
        () =>
            groupBy(
                budgetedCategories,
                item => allCategories.find(category => category.id === item.categoryId).parentCategory.name
            ),
        [budgetedCategories, allCategories]
    );

    const listItems = useMemo(
        () =>
            Object.entries(budgetedCategoriesByParent).map(([parentName, categories]) => ({
                id: parentName,
                Trigger: ({ onClick }) => (
                    <ParentCategory
                        name={parentName}
                        onClick={() => {
                            onClick(parentName);
                            selectParentCategory(parentName);
                        }}
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
            })),
        [allCategories, budget.transactions, budgetedCategoriesByParent, selectParentCategory]
    );

    const totalSpent = useMemo(() => budget.transactions.reduce((acc, transaction) => acc + transaction.amount, 0), [
        budget.transactions,
    ]);

    const restToSpent = useMemo(() => budget.totalAmount - totalSpent, [budget.totalAmount, totalSpent]);

    const amountTaken = useMemo(
        () =>
            budgetedCategories.reduce((acc, budgetedCategory) => {
                const categoryTransactions = budget.transactions.filter(transaction => {
                    return transaction.categoryId === budgetedCategory.categoryId;
                });
                const categoryExpenses = categoryTransactions.reduce((acc, categoryTransaction) => {
                    return acc + categoryTransaction.amount;
                }, 0);

                return acc + Math.max(budgetedCategory.budget, categoryExpenses);
            }, 0),
        [budgetedCategories, budget.transactions]
    );

    const notBudgetedTransactions = useMemo(
        () =>
            budget.transactions.filter(transaction => {
                return !budgetedCategories.find(
                    budgetedCategory => budgetedCategory.categoryId === transaction.categoryId
                );
            }),
        [budget.transactions, budgetedCategories]
    );

    const notBudgetedExpenses = useMemo(
        () =>
            notBudgetedTransactions.reduce((acc, notBudgetedTransaction) => {
                return acc + notBudgetedTransaction.amount;
            }, 0),
        [notBudgetedTransactions]
    );

    const avaiableForRestCategories = useMemo(() => budget.totalAmount - amountTaken - notBudgetedExpenses, [
        budget.totalAmount,
        amountTaken,
        notBudgetedTransactions,
    ]);

    const handleClearParentCategorySelect = useCallback(() => {
        selectParentCategory();
        handleClickParentCategoryRef.current();
    }, [selectParentCategory, handleClickParentCategoryRef]);

    const handleRestParentCategorySelect = useCallback(() => {
        selectParentCategory(null);
        handleClickParentCategoryRef.current();
    }, [selectParentCategory, handleClickParentCategoryRef]);

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

    return (
        <div>
            <div
                css={`
                    border-bottom: 5px solid ${({ theme }) => theme.colors.gray.light};
                `}
            >
                <ParentCategory name={budget.name} amount={restToSpent} onClick={handleClearParentCategorySelect} />
            </div>
            <ToggleableList items={listItems} clickRef={handleClickParentCategoryRef} />
            <div
                css={`
                    border-top: 5px solid ${({ theme }) => theme.colors.gray.light};
                `}
            >
                <ParentCategory
                    name={t('Other categories')}
                    amount={avaiableForRestCategories}
                    onClick={handleRestParentCategorySelect}
                />
            </div>
        </div>
    );
}

export default connect(
    state => ({
        budgetedCategories: state.budget.budgetedCategories,
        allCategories: state.common.allCategories,
        budget: state.budget.budget,
    }),
    {
        selectParentCategory,
    }
)(BudgetCategoryList);
