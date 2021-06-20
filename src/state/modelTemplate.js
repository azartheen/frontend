import request from './request'

const initialState = {};

// model template reducer. returns new state based on previous state and an action
export default (state = initialState, action) => {
    switch (action.type) {
        case "modelTemplate/posted":
            state[action.modelTemplate._id] = action.modelTemplate;
            return {...state};
        case "modelTemplate/patched":
            state[action.modelTemplate._id] = action.modelTemplate;
            return {...state};
        case "modelTemplate/fetched":
            state = {};
            for(const modelTemplate of action.modelTemplates) state[modelTemplate._id] = modelTemplate;
            return state;
        case 'modelTemplate/deleted':
            delete state[action.modelTemplateID];
            return {...state};
        default:
            return state;
    }
}

// fetches all model templates
export const fetch = (dispatch) => {
    request("GET", "/modelTemplates").then((res) => {
        dispatch({
            type : "modelTemplate/fetched",
            modelTemplates : res.modelTemplates
        });
    });
}

// creates new model template
export const post = (dispatch, data) => {
    request("POST", "/modelTemplates", {modelTemplate : data}).then((res) => {
        dispatch({
            type : "modelTemplate/posted",
            modelTemplate : res.modelTemplate
        });
    });
}

// modifies a model template by id
export const patch = (dispatch, id, data) => {
    request("PATCH", `/modelTemplates/${id}`, {data}).then(res => {
        dispatch({
            type : "modelTemplate/patched",
            modelTemplate : res.modelTemplate
        });
    });
}

// deletes a model template by id
export const deleteModelTemplate = (dispatch, id) => {
    request("DELETE", `/modelTemplates/${id}`).then(() => {
        dispatch({
            type : "modelTemplate/deleted",
            modelTemplateID : id
        });
    });
}