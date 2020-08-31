import API from '../fetch/index';
import {ALL_CATEGORIES_GET} from '../constants/index';

export const fetchAllCategories = id => {
    const promise = API.common.fetchAllCategories();

    return {
        type: ALL_CATEGORIES_GET,
        promise,
    };
};