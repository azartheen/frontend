import request from './request'

const initialState = {};

// ATE reducer. returns new state based on previous state and an action
export default (state = initialState, action) => {
    switch (action.type) {
        case "ATE/posted":
            state[action.ATE._id] = action.ATE;
            return {...state};
        case "ATE/patched":
            state[action.ATE._id] = action.ATE;
            return {...state};
        case "ATE/fetched":
            state = {};
            for(const ATE of action.ATEs) state[ATE._id] = ATE;
            return state;
        case 'ATE/deleted':
            delete state[action.ATEID];
            return {...state};
        default:
            return state;
    }
}

// fetches all ATEs
export const fetch = (dispatch) => {
    request("GET", "/ates").then((res) => {
        dispatch({
            type : "ATE/fetched",
            ATEs : res.ATEs
        });
    });
}

// creates new ATE
export const post = (dispatch, data) => {
    return request("POST", "/ates", {data}).then((res) => {
        dispatch({
            type : "ATE/posted",
            ATE : res.ATE
        });
    });
}

// modifies existing ATE by id
export const patch = (dispatch, id, data) => {
    return request("PATCH", `/ATEs/${id}`, {data}).then((res) => {
        dispatch({
            type : "ATE/patched",
            ATE : res.ATE
        });
    });
}

// deletes ATE by id
export const deleteATE = (dispatch, id) => {
    return request("DELETE", `/ATE/${id}`).then(() => {
        dispatch({
            type : "ATE/deleted",
            ATEID : id
        });
    });
}
