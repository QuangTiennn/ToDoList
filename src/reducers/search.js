import * as types from '.././constants/ActionTypes';

var inititalState = '';

var myReducer = (state = inititalState, action) => {
    switch(action.type){
        case types.SEARCH :{
            return action.keyword;            //tai day tren store co keyword
        }
        default : return state
    }
};

export default myReducer;