import { BUDGET_GET_REQUEST, BUDGET_GET_SUCCESS, BUDGET_GET_FAILURE } from '../constants/index';

export const fetchBudget = id => async dispatch => {
    //dispatchujemy akcję BUDGET_GET_REQUEST
    dispatch({
        type: BUDGET_GET_REQUEST,
    });
    try {
        //wykonanie requestuA do API
        const response = await fetchBudget(id);
        const data = response.json();
        //dispatch akcji BUDGET_GET_SUCCESS + przekazanie danych z requestu
        dispatch({
            type: BUDGET_GET_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: BUDGET_GET_FAILURE,
        });
    }
};

const fetchBudgetedCategories = () => {};
