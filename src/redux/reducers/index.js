import { combineReducers } from 'redux';

import news from './fetchReducer'
import error from './errorReducer'
import moreInfo from './moreInfoReducer'
import page from './pageReduser'

const rootReducer = combineReducers({
    news,
    error,
    moreInfo,
    page,
})

export default rootReducer;
