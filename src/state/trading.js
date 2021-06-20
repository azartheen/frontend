import request from './request'

const initialState = {};

// reducer. returns the new trading state based on the previous and an action
export default (state = initialState, action) => {
    switch (action.type) {
        case "trading/gotModelInputs":
            return {
                ...state,
                modelInputs : action.inputs
            }
        case "trading/gotModelOutputs":
            return {
                ...state,
                modelOutputs : action.outputs
            }
        default:
            return state;
    }
}

// fetches all inputs for models and model templates
export const fetchModelInputs = (dispatch) => {
    request("GET", "/trading-api/inputs").then((res) => {
        dispatch({
            type : "trading/gotModelInputs",
            inputs : res.inputs
        });
    });
}

// fetches all outputs for models and model templates
export const fetchModelOutputs = (dispatch) => {
    request("GET", "/trading-api/outputs").then((res) => {
        dispatch({
            type : "trading/gotModelOutputs",
            outputs : res.outputs
        });
    });
}