import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { fetchBudget, fetchBudgetedCategories } from '../../data/actions/budget.actions';
import { fetchAllCategories } from '../../data/actions/common.actions';
import { Grid } from './Budget.css';
import { LoadingIndicator } from '../../components';
import BudgetCategoryList from '../../pages/Budget/components/BudgetCategoryList/index';

function Budget({ budgetState, commonState, fetchBudget, fetchBudgetedCategories, fetchAllCategories }) {
    useEffect(() => {
        fetchBudget(1);
        fetchBudgetedCategories(1);
        fetchAllCategories();
    }, [fetchBudget, fetchBudgetedCategories, fetchAllCategories]);
    const isLoaded = useMemo(
        () =>
            !!budgetState &&
            Object.keys(budgetState).length === 0 &&
            !!commonState &&
            Object.keys(commonState).length === 0,
        [budgetState, commonState]
    );
    return (
        <Grid>
            <section>{isLoaded ? <BudgetCategoryList/> : <LoadingIndicator />}</section>
            <section>{isLoaded ? 'Transaction list' : <LoadingIndicator />}</section>
        </Grid>
    );
}
export default connect(
    state => {
        return {
            budget: state.budget.budget,
            budgetState: state.budget.loadingState,
            commonState: state.common.loadingState,
        };
    },
    {
        fetchBudget,
        fetchBudgetedCategories,
        fetchAllCategories,
    }
)(Budget);
