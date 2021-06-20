import request from './request'

const initialState = {};

// model reducer. returns new state based on previous state and an action
export default (state = initialState, action) => {
    switch (action.type) {
        case "model/posted":
            state[action.model._id] = action.model;
            return {...state};
        case "model/patched":
            state[action.model._id] = action.model;
            return {...state};
        case "model/fetched":
            state = {};
            for(const model of action.models) state[model._id] = model;
            return state;
        case 'model/deleted':
            delete state[action.modelID];
            return {...state};
        case 'model/trained':
            state[action.model._id] = action.model;
            return {...state};
        default:
            return state;
    }
}

// fetches all models
export const fetch = (dispatch) => {
    request("GET", "/models").then((res) => {
        dispatch({
            type : "model/fetched",
            models : res.models
        });
    });
}

// creates new model
export const post = (dispatch, data) => {
    request("POST", "/models", {data}).then((res) => {
        dispatch({
            type : "model/posted",
            model : res.model
        });
    });
}

// modifies model by id
export const patch = (dispatch, id, data) => {
    request("PATCH", `/models/${id}`, {data}).then((res) => {
        dispatch({
            type : "model/patched",
            model : res.model
        });
    });
}

// deletes model by id
export const deleteModel = (dispatch, id) => {
    request("DELETE", `/models/${id}`).then(() => {
        dispatch({
            type : "model/deleted",
            modelID : id
        });
    });
}

export const train = (dispatch, id) => {
    request("POST", `/models/${id}/train`).then(res => {
        dispatch({
            type : "model/trained",
            model : res.model
        })
    })
}