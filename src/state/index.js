import model from './model'
import modelTemplate from './modelTemplate'
import trading from './trading'
import ATE from './ATE'
import {combineReducers} from 'redux'
// combines the four reducers into one global state
export default combineReducers({
    model,
    modelTemplate,
    trading,
    ATE
});